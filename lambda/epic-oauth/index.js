/**
 * Epic OAuth Lambda Handler
 * 
 * Handles Epic FHIR OAuth 2.0 callback:
 * 1. Exchanges authorization code for access token
 * 2. Stores tokens in DynamoDB
 * 3. Fetches Patient resource from Epic
 * 4. Stores patient data in DynamoDB
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import fetch from 'node-fetch';

// Initialize DynamoDB client
const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({ region: process.env.AWS_REGION || 'us-west-2' }));

// Epic configuration from environment variables
const EPIC_CONFIG = {
  clientId: process.env.EPIC_CLIENT_ID || 'fca52c91-c927-4a4e-a048-66a825d7259f',
  tokenUrl: process.env.EPIC_TOKEN_URL || 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token',
  fhirBaseUrl: process.env.EPIC_FHIR_BASE_URL || 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4',
  redirectUri: process.env.EPIC_REDIRECT_URI || 'http://localhost:3000/auth/epic/callback',
  tokensTable: process.env.EPIC_TOKENS_TABLE || 'epic_tokens',
  patientsTable: process.env.HEALTH_PATIENTS_TABLE || 'health_patients'
};

/**
 * Main Lambda handler
 */
export const handler = async (event) => {
  console.log('📥 Received event:', JSON.stringify(event, null, 2));

  try {
    // Parse request body
    const body = JSON.parse(event.body || '{}');
    const { code, codeVerifier } = body;

    if (!code || !codeVerifier) {
      return errorResponse(400, 'Missing required parameters: code and codeVerifier');
    }

    // Extract user ID from Cognito JWT (via API Gateway authorizer)
    const userId = event.requestContext?.authorizer?.claims?.sub;
    if (!userId) {
      return errorResponse(401, 'No user ID found in request. User must be authenticated.');
    }

    console.log(`✅ User ID: ${userId}`);
    console.log(`🔐 Exchanging authorization code...`);

    // 1. Exchange authorization code for access token
    const tokenResponse = await exchangeCodeForToken(code, codeVerifier);
    console.log(`✅ Token exchange successful. Patient ID: ${tokenResponse.patient}`);

    // 2. Store tokens in DynamoDB
    await storeTokens(userId, tokenResponse);
    console.log(`✅ Tokens stored in DynamoDB`);

    // 3. Fetch Patient resource from Epic FHIR API
    const patientData = await fetchPatientResource(tokenResponse.access_token, tokenResponse.patient);
    console.log(`✅ Patient data fetched from Epic`);

    // 4. Store patient data in DynamoDB
    await storePatientData(userId, tokenResponse.patient, patientData);
    console.log(`✅ Patient data stored in DynamoDB`);

    return successResponse({
      success: true,
      message: 'Successfully connected to Epic',
      patientId: tokenResponse.patient
    });

  } catch (error) {
    console.error('❌ Error in Epic OAuth handler:', error);
    return errorResponse(500, error.message || 'Internal server error', error);
  }
};

/**
 * Exchange authorization code for access token
 */
async function exchangeCodeForToken(code, codeVerifier) {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: EPIC_CONFIG.redirectUri,
    client_id: EPIC_CONFIG.clientId,
    code_verifier: codeVerifier
  });

  console.log(`📡 Calling Epic token endpoint: ${EPIC_CONFIG.tokenUrl}`);

  const response = await fetch(EPIC_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString()
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ Token exchange failed: ${response.status} - ${errorText}`);
    throw new Error(`Token exchange failed: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Store OAuth tokens in DynamoDB
 */
async function storeTokens(userId, tokenResponse) {
  const now = Date.now();
  const expiresAt = now + (tokenResponse.expires_in * 1000);

  const item = {
    userId,
    epicPatientId: tokenResponse.patient,
    accessToken: tokenResponse.access_token, // TODO: Encrypt in production
    refreshToken: tokenResponse.refresh_token || '',
    tokenType: tokenResponse.token_type,
    expiresAt,
    scope: tokenResponse.scope,
    lastSync: now,
    createdAt: now,
    updatedAt: now
  };

  console.log(`💾 Storing tokens in table: ${EPIC_CONFIG.tokensTable}`);

  await dynamoDb.send(new PutCommand({
    TableName: EPIC_CONFIG.tokensTable,
    Item: item
  }));
}

/**
 * Fetch Patient resource from Epic FHIR API
 */
async function fetchPatientResource(accessToken, patientId) {
  const url = `${EPIC_CONFIG.fhirBaseUrl}/Patient/${patientId}`;

  console.log(`📡 Fetching patient from Epic FHIR: ${url}`);

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/fhir+json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ Failed to fetch patient: ${response.status} - ${errorText}`);
    throw new Error(`Failed to fetch patient resource: ${response.status}`);
  }

  const data = await response.json();
  console.log(`✅ Patient resource received:`, JSON.stringify(data, null, 2));
  return data;
}

/**
 * Store patient data in DynamoDB
 */
async function storePatientData(userId, epicPatientId, fhirData) {
  const now = Date.now();

  // Normalize FHIR data for easier access
  const normalizedData = {
    firstName: fhirData.name?.[0]?.given?.[0] || '',
    lastName: fhirData.name?.[0]?.family || '',
    fullName: `${fhirData.name?.[0]?.given?.[0] || ''} ${fhirData.name?.[0]?.family || ''}`.trim(),
    dateOfBirth: fhirData.birthDate || '',
    gender: fhirData.gender || '',
    phone: fhirData.telecom?.find(t => t.system === 'phone')?.value || '',
    email: fhirData.telecom?.find(t => t.system === 'email')?.value || '',
    address: fhirData.address?.[0] ? {
      street: fhirData.address[0].line?.join(', ') || '',
      city: fhirData.address[0].city || '',
      state: fhirData.address[0].state || '',
      zip: fhirData.address[0].postalCode || ''
    } : undefined,
    mrn: fhirData.identifier?.find(id => id.type?.coding?.[0]?.code === 'MR')?.value || ''
  };

  const item = {
    userId,
    epicPatientId,
    fhirData,
    normalizedData,
    createdAt: now,
    updatedAt: now
  };

  console.log(`💾 Storing patient data in table: ${EPIC_CONFIG.patientsTable}`);
  console.log(`📊 Normalized data:`, JSON.stringify(normalizedData, null, 2));

  await dynamoDb.send(new PutCommand({
    TableName: EPIC_CONFIG.patientsTable,
    Item: item
  }));
}

/**
 * Success response helper
 */
function successResponse(data) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    },
    body: JSON.stringify(data)
  };
}

/**
 * Error response helper
 */
function errorResponse(statusCode, message, error = null) {
  console.error(`❌ Returning error response: ${statusCode} - ${message}`);
  if (error) {
    console.error('Error details:', error);
  }

  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    },
    body: JSON.stringify({
      success: false,
      error: message,
      message: `Failed to complete Epic OAuth flow: ${message}`
    })
  };
}
