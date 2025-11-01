/**
 * TypeScript Type Definitions for Epic FHIR Integration
 * 
 * Defines interfaces for Epic OAuth tokens, FHIR resources,
 * and API request/response structures.
 */

/**
 * Epic OAuth Token Response
 * Returned by Epic's token endpoint after successful authorization code exchange
 */
export interface EpicTokenResponse {
  access_token: string;
  token_type: string;          // Usually "Bearer"
  expires_in: number;           // Seconds until expiration
  scope: string;                // Space-separated list of granted scopes
  patient: string;              // FHIR patient ID
  refresh_token?: string;       // Optional refresh token
  id_token?: string;            // OpenID Connect ID token
}

/**
 * Request body for Epic OAuth callback
 */
export interface EpicCallbackRequest {
  code: string;                 // Authorization code from Epic
  codeVerifier: string;         // PKCE code verifier
}

/**
 * Response from Epic OAuth callback handler
 */
export interface EpicCallbackResponse {
  success: boolean;
  message: string;
  patientId?: string;
  error?: string;
}

/**
 * Epic Connection Status
 */
export interface EpicConnectionStatus {
  connected: boolean;
  epicPatientId?: string;
  lastSync?: string;            // ISO timestamp
  expiresAt?: string;           // ISO timestamp
}

/**
 * FHIR Patient Resource (simplified)
 * Based on FHIR R4 Patient resource
 */
export interface FHIRPatient {
  resourceType: 'Patient';
  id: string;
  identifier?: Array<{
    system?: string;
    value?: string;
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;
  name?: Array<{
    use?: string;
    family?: string;
    given?: string[];
    prefix?: string[];
    suffix?: string[];
  }>;
  telecom?: Array<{
    system?: string;
    value?: string;
    use?: string;
  }>;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  birthDate?: string;           // YYYY-MM-DD
  address?: Array<{
    use?: string;
    type?: string;
    line?: string[];
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }>;
}

/**
 * Normalized Patient Data (simplified for UI consumption)
 */
export interface NormalizedPatientData {
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  mrn?: string;                 // Medical Record Number
}

/**
 * DynamoDB Epic Tokens Table Schema
 */
export interface EpicTokensRecord {
  userId: string;               // Cognito user ID (partition key)
  epicPatientId: string;        // Epic FHIR patient ID
  accessToken: string;          // Encrypted access token
  refreshToken?: string;        // Encrypted refresh token
  tokenType: string;
  expiresAt: number;            // Unix timestamp
  scope: string;
  lastSync: number;             // Unix timestamp
  createdAt: number;
  updatedAt: number;
}

/**
 * DynamoDB Health Patients Table Schema
 */
export interface HealthPatientsRecord {
  userId: string;               // Cognito user ID (partition key)
  epicPatientId: string;
  fhirData: FHIRPatient;        // Complete FHIR JSON
  normalizedData: NormalizedPatientData;
  createdAt: number;
  updatedAt: number;
}

/**
 * Lambda Event for Epic Callback
 */
export interface EpicCallbackEvent {
  body: string;                 // JSON stringified EpicCallbackRequest
  headers: {
    Authorization?: string;
    'Content-Type'?: string;
  };
  requestContext: {
    authorizer?: {
      claims?: {
        sub: string;            // Cognito user ID
        email?: string;
      };
    };
  };
}

/**
 * Lambda Response
 */
export interface LambdaResponse {
  statusCode: number;
  headers: {
    'Content-Type': string;
    'Access-Control-Allow-Origin': string;
    'Access-Control-Allow-Headers': string;
  };
  body: string;                 // JSON stringified response
}
