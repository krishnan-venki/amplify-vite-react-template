# Phase 1: Epic OAuth Implementation Plan

## Project: Sagaa Healthcare - Epic FHIR Integration
**Timeline:** Days 1-7 (Week 1)
**Goal:** Complete OAuth 2.0 flow with PKCE + Fetch Patient resource

---

## 📋 Configuration Details

### Epic Sandbox Credentials
- **Non-Production Client ID:** `fca52c91-c927-4a4e-a048-66a825d7259f`
- **FHIR Base URL:** `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4`
- **Authorization Endpoint:** `https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize`
- **Token Endpoint:** `https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token`

### Redirect URIs
- **Local Development:** `http://localhost:3000/auth/epic/callback`
- **Staging/Production:** (Will be added when deploying to Amplify)

### Test Patient Mapping
- **Epic Test Patient:** Derrick Lin
- **Epic Patient ID:** `Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB`
- **Sagaa Demo User:** (Your existing demo user)

### FHIR Scopes (Phase 1 - Minimal)
```
patient/Patient.read
openid
fhirUser
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         PHASE 1 FLOW                             │
└─────────────────────────────────────────────────────────────────┘

Frontend (React)                Backend (AWS Lambda)           External
─────────────────              ──────────────────────         ─────────

┌──────────────┐
│ User clicks  │
│ "Connect     │
│  Epic"       │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Generate     │
│ PKCE codes   │
│ - verifier   │
│ - challenge  │
└──────┬───────┘
       │
       ▼
┌──────────────┐                                              ┌─────────┐
│ Build Auth   │──────────────────────────────────────────────▶│  Epic   │
│ URL & Store  │                                              │  OAuth  │
│ state/       │                                              │  Page   │
│ verifier     │                                              └────┬────┘
└──────┬───────┘                                                   │
       │                                                            │
       │                                              User logs in │
       │◀───────────────────────────────────────────────────────┘
       │                        Redirect with code
       ▼
┌──────────────┐
│ /auth/epic/  │
│ callback     │
│ (React page) │
└──────┬───────┘
       │
       ▼
┌──────────────┐              ┌──────────────┐
│ Call Lambda  │─────────────▶│ handleEpic   │
│ with code &  │              │ Callback     │
│ verifier     │              │ Lambda       │
└──────────────┘              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐              ┌─────────┐
                              │ Exchange     │─────────────▶│  Epic   │
                              │ code for     │              │  Token  │
                              │ token        │◀─────────────│  API    │
                              └──────┬───────┘              └─────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ Store tokens │
                              │ in DynamoDB  │
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐              ┌─────────┐
                              │ Fetch Patient│─────────────▶│  Epic   │
                              │ Resource     │              │  FHIR   │
                              │              │◀─────────────│  API    │
                              └──────┬───────┘              └─────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ Store in     │
                              │ DynamoDB     │
                              └──────┬───────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ Return       │
                              │ success      │
                              └──────────────┘
```

---

## 📁 File Structure to Create

```
amplify/
├── backend.ts (UPDATE - add epic config)
├── data/
│   └── resource.ts (UPDATE - add DynamoDB tables)
└── functions/
    └── epic-oauth/
        ├── handler.ts (NEW)
        ├── types.ts (NEW)
        └── package.json (NEW)

src/
├── components/
│   └── healthcare/
│       ├── ConnectEpicButton.tsx (NEW)
│       └── EpicOAuthCallback.tsx (NEW)
├── utils/
│   └── pkce-helpers.ts (NEW)
└── config/
    └── epic-config.ts (NEW)
```

---

## 🔐 Security Implementation

### 1. PKCE (Proof Key for Code Exchange)
**Purpose:** Prevents authorization code interception attacks

**Implementation:**
```typescript
// Generate random code_verifier (43-128 characters)
const code_verifier = base64URLEncode(crypto.getRandomValues(new Uint8Array(32)))

// Generate code_challenge using SHA-256
const code_challenge = base64URLEncode(await sha256(code_verifier))
const code_challenge_method = 'S256'
```

**Storage:**
- Store `code_verifier` and `state` in `sessionStorage` (temporary)
- Clear after successful OAuth completion
- Never send verifier to Epic in authorization request

### 2. State Parameter (CSRF Protection)
**Purpose:** Prevents Cross-Site Request Forgery

**Implementation:**
```typescript
// Generate random state (32+ characters)
const state = base64URLEncode(crypto.getRandomValues(new Uint8Array(32)))

// Store in sessionStorage
sessionStorage.setItem('epic_oauth_state', state)

// Validate on callback
if (receivedState !== storedState) {
  throw new Error('Invalid state - possible CSRF attack')
}
```

### 3. Token Storage (Backend Only)
**Purpose:** Keep access tokens secure

**Implementation:**
- ✅ Tokens stored in DynamoDB backend
- ✅ Encrypted at rest (DynamoDB encryption)
- ❌ Never send tokens to frontend
- ✅ Frontend gets success/failure only
- ✅ Future: Add KMS encryption for extra security

---

## 📊 DynamoDB Table Schemas

### Table 1: epic_tokens
**Purpose:** Store OAuth tokens per user

```typescript
{
  tableName: 'epic_tokens',
  partitionKey: 'userId',    // Cognito user ID
  attributes: {
    userId: string,           // PK - Cognito user ID
    epicPatientId: string,    // Epic FHIR patient ID
    accessToken: string,      // Current access token (will encrypt later)
    refreshToken: string,     // Refresh token (will encrypt later)
    tokenType: string,        // 'Bearer'
    expiresAt: number,        // Unix timestamp
    scope: string,            // Granted scopes
    lastSync: number,         // Last FHIR data sync timestamp
    createdAt: number,        // Record creation
    updatedAt: number         // Last update
  }
}
```

### Table 2: health_patients
**Purpose:** Store Patient FHIR resource data

```typescript
{
  tableName: 'health_patients',
  partitionKey: 'userId',
  attributes: {
    userId: string,           // PK - Cognito user ID
    epicPatientId: string,    // Epic FHIR patient ID
    fhirData: object,         // Complete FHIR Patient resource JSON
    normalizedData: {
      firstName: string,
      lastName: string,
      dateOfBirth: string,
      gender: string,
      phone: string,
      email: string,
      address: object
    },
    createdAt: number,
    updatedAt: number
  }
}
```

---

## 🔧 Implementation Tasks - Day by Day

### **Day 1-2: Infrastructure Setup**

#### Task 1.1: Create Epic Configuration File
**File:** `src/config/epic-config.ts`

```typescript
export const EPIC_CONFIG = {
  clientId: 'fca52c91-c927-4a4e-a048-66a825d7259f',
  redirectUri: process.env.NODE_ENV === 'production' 
    ? 'https://YOUR_AMPLIFY_URL/auth/epic/callback'  // Add when deploying
    : 'http://localhost:3000/auth/epic/callback',
  
  fhirBaseUrl: 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4',
  authorizationUrl: 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize',
  tokenUrl: 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token',
  
  scopes: [
    'patient/Patient.read',
    'openid',
    'fhirUser'
  ],
  
  // Epic sandbox test patient
  testPatient: {
    name: 'Derrick Lin',
    fhirId: 'Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB'
  }
};
```

#### Task 1.2: Create DynamoDB Tables
**File:** `amplify/data/resource.ts` (UPDATE)

Add to existing data resource:

```typescript
// Add these table definitions
const epicTokens = defineTable({
  userId: a.string().primaryKey(),
  epicPatientId: a.string(),
  accessToken: a.string(),
  refreshToken: a.string(),
  tokenType: a.string(),
  expiresAt: a.integer(),
  scope: a.string(),
  lastSync: a.integer(),
  createdAt: a.integer(),
  updatedAt: a.integer()
});

const healthPatients = defineTable({
  userId: a.string().primaryKey(),
  epicPatientId: a.string(),
  fhirData: a.json(),
  normalizedData: a.json(),
  createdAt: a.integer(),
  updatedAt: a.integer()
});
```

#### Task 1.3: Create Lambda Function Structure
**File:** `amplify/functions/epic-oauth/package.json`

```json
{
  "name": "epic-oauth",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "node-fetch": "^3.3.2"
  }
}
```

**File:** `amplify/functions/epic-oauth/types.ts`

```typescript
export interface EpicTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  patient: string;
  refresh_token?: string;
}

export interface EpicCallbackRequest {
  code: string;
  state: string;
  codeVerifier: string;
  userId: string;
}
```

---

### **Day 3-4: Frontend OAuth Implementation**

#### Task 3.1: Create PKCE Helper Utilities
**File:** `src/utils/pkce-helpers.ts`

```typescript
/**
 * Generate a cryptographically secure random string for PKCE
 */
export function generateRandomString(length: number): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

/**
 * Base64 URL encoding (without padding)
 */
function base64URLEncode(buffer: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...buffer));
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Generate SHA-256 hash
 */
async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest('SHA-256', data);
}

/**
 * Generate PKCE code verifier (43-128 characters)
 */
export function generateCodeVerifier(): string {
  return generateRandomString(32); // 32 bytes = 43 base64url characters
}

/**
 * Generate PKCE code challenge from verifier
 */
export async function generateCodeChallenge(verifier: string): Promise<string> {
  const hashed = await sha256(verifier);
  const array = new Uint8Array(hashed);
  return base64URLEncode(array);
}

/**
 * Generate random state for CSRF protection
 */
export function generateState(): string {
  return generateRandomString(32);
}
```

#### Task 3.2: Create Connect Epic Button Component
**File:** `src/components/healthcare/ConnectEpicButton.tsx`

```typescript
import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { EPIC_CONFIG } from '../../config/epic-config';
import { generateCodeVerifier, generateCodeChallenge, generateState } from '../../utils/pkce-helpers';

export const ConnectEpicButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setIsLoading(true);

      // 1. Generate PKCE codes
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      const state = generateState();

      // 2. Store in sessionStorage (temporary, not localStorage)
      sessionStorage.setItem('epic_code_verifier', codeVerifier);
      sessionStorage.setItem('epic_state', state);

      // 3. Build authorization URL
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: EPIC_CONFIG.clientId,
        redirect_uri: EPIC_CONFIG.redirectUri,
        scope: EPIC_CONFIG.scopes.join(' '),
        state: state,
        aud: EPIC_CONFIG.fhirBaseUrl,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256'
      });

      const authUrl = `${EPIC_CONFIG.authorizationUrl}?${params.toString()}`;

      // 4. Redirect to Epic
      window.location.href = authUrl;

    } catch (error) {
      console.error('Error initiating Epic OAuth:', error);
      setIsLoading(false);
      alert('Failed to connect to Epic. Please try again.');
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px 32px',
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #f87171 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.1rem',
        fontWeight: 600,
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.7 : 1,
        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        if (!isLoading) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
      }}
    >
      <Activity size={24} />
      <span>{isLoading ? 'Connecting...' : 'Connect Epic MyChart'}</span>
    </button>
  );
};
```

#### Task 3.3: Create OAuth Callback Handler Page
**File:** `src/components/healthcare/EpicOAuthCallback.tsx`

```typescript
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

type Status = 'processing' | 'success' | 'error';

export const EpicOAuthCallback: React.FC = () => {
  const [status, setStatus] = useState<Status>('processing');
  const [message, setMessage] = useState('Connecting to Epic MyChart...');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      // 1. Get parameters from URL
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      // 2. Check for errors
      if (error) {
        throw new Error(`Epic authorization failed: ${error}`);
      }

      if (!code || !state) {
        throw new Error('Missing authorization code or state');
      }

      // 3. Retrieve stored values
      const storedState = sessionStorage.getItem('epic_state');
      const codeVerifier = sessionStorage.getItem('epic_code_verifier');

      if (!storedState || !codeVerifier) {
        throw new Error('Session expired. Please try connecting again.');
      }

      // 4. Validate state (CSRF protection)
      if (state !== storedState) {
        throw new Error('Invalid state parameter - possible security issue');
      }

      setMessage('Exchanging authorization code...');

      // 5. Call backend Lambda to exchange code for token
      // TODO: Replace with actual API Gateway endpoint
      const response = await fetch('/api/epic/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          codeVerifier,
          // userId will be extracted from Cognito JWT in Lambda
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange authorization code');
      }

      const result = await response.json();

      setMessage('Fetching your health records...');
      
      // Wait a moment for data to sync
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 6. Success!
      setStatus('success');
      setMessage('Successfully connected to Epic MyChart!');

      // 7. Clean up session storage
      sessionStorage.removeItem('epic_state');
      sessionStorage.removeItem('epic_code_verifier');

      // 8. Redirect to health dashboard after 2 seconds
      setTimeout(() => {
        navigate('/health-dashboard');
      }, 2000);

    } catch (error) {
      console.error('OAuth callback error:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Connection failed');

      // Clean up on error
      sessionStorage.removeItem('epic_state');
      sessionStorage.removeItem('epic_code_verifier');

      // Redirect back after 3 seconds
      setTimeout(() => {
        navigate('/healthcare');
      }, 3000);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #f1f5f9 100%)',
      padding: '24px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '48px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        {status === 'processing' && (
          <>
            <Loader2 size={64} color="#3b82f6" style={{ animation: 'spin 1s linear infinite' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1e293b', marginTop: '24px' }}>
              Connecting to Epic
            </h2>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle size={64} color="#10b981" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#10b981', marginTop: '24px' }}>
              Connection Successful!
            </h2>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle size={64} color="#ef4444" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#ef4444', marginTop: '24px' }}>
              Connection Failed
            </h2>
          </>
        )}

        <p style={{ fontSize: '1rem', color: '#64748b', marginTop: '16px' }}>
          {message}
        </p>
      </div>
    </div>
  );
};
```

---

### **Day 5-7: Backend Lambda Implementation**

#### Task 5.1: Create Lambda Handler
**File:** `amplify/functions/epic-oauth/handler.ts`

```typescript
import type { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import fetch from 'node-fetch';
import type { EpicTokenResponse, EpicCallbackRequest } from './types';

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const EPIC_CONFIG = {
  clientId: 'fca52c91-c927-4a4e-a048-66a825d7259f',
  tokenUrl: 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token',
  fhirBaseUrl: 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4',
  redirectUri: process.env.EPIC_REDIRECT_URI || 'http://localhost:3000/auth/epic/callback'
};

/**
 * Handle Epic OAuth callback
 * Exchanges authorization code for access token
 */
export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    // Parse request body
    const body: EpicCallbackRequest = JSON.parse(event.body || '{}');
    const { code, codeVerifier, userId } = body;

    if (!code || !codeVerifier || !userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' })
      };
    }

    // Exchange authorization code for access token
    const tokenResponse = await exchangeCodeForToken(code, codeVerifier);

    // Store tokens in DynamoDB
    await storeTokens(userId, tokenResponse);

    // Fetch Patient resource
    const patientData = await fetchPatientResource(tokenResponse.access_token, tokenResponse.patient);

    // Store patient data
    await storePatientData(userId, tokenResponse.patient, patientData);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        success: true,
        message: 'Successfully connected to Epic',
        patientId: tokenResponse.patient
      })
    };

  } catch (error) {
    console.error('Epic OAuth error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

/**
 * Exchange authorization code for access token
 */
async function exchangeCodeForToken(code: string, codeVerifier: string): Promise<EpicTokenResponse> {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: EPIC_CONFIG.redirectUri,
    client_id: EPIC_CONFIG.clientId,
    code_verifier: codeVerifier
  });

  const response = await fetch(EPIC_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString()
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Token exchange failed: ${response.status} - ${errorText}`);
  }

  const data = await response.json() as EpicTokenResponse;
  return data;
}

/**
 * Store OAuth tokens in DynamoDB
 */
async function storeTokens(userId: string, tokenResponse: EpicTokenResponse): Promise<void> {
  const now = Date.now();
  const expiresAt = now + (tokenResponse.expires_in * 1000);

  await dynamoDb.send(new PutCommand({
    TableName: process.env.EPIC_TOKENS_TABLE,
    Item: {
      userId,
      epicPatientId: tokenResponse.patient,
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token || '',
      tokenType: tokenResponse.token_type,
      expiresAt,
      scope: tokenResponse.scope,
      lastSync: now,
      createdAt: now,
      updatedAt: now
    }
  }));
}

/**
 * Fetch Patient resource from Epic FHIR API
 */
async function fetchPatientResource(accessToken: string, patientId: string): Promise<any> {
  const url = `${EPIC_CONFIG.fhirBaseUrl}/Patient/${patientId}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/fhir+json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch patient resource: ${response.status}`);
  }

  return await response.json();
}

/**
 * Store patient data in DynamoDB
 */
async function storePatientData(userId: string, epicPatientId: string, fhirData: any): Promise<void> {
  const now = Date.now();

  // Normalize FHIR data for easier access
  const normalizedData = {
    firstName: fhirData.name?.[0]?.given?.[0] || '',
    lastName: fhirData.name?.[0]?.family || '',
    dateOfBirth: fhirData.birthDate || '',
    gender: fhirData.gender || '',
    phone: fhirData.telecom?.find((t: any) => t.system === 'phone')?.value || '',
    email: fhirData.telecom?.find((t: any) => t.system === 'email')?.value || '',
    address: fhirData.address?.[0] || {}
  };

  await dynamoDb.send(new PutCommand({
    TableName: process.env.HEALTH_PATIENTS_TABLE,
    Item: {
      userId,
      epicPatientId,
      fhirData,
      normalizedData,
      createdAt: now,
      updatedAt: now
    }
  }));
}
```

#### Task 5.2: Register Lambda in Amplify Backend
**File:** `amplify/backend.ts` (UPDATE)

Add Lambda function definition:

```typescript
import { defineBackend } from '@aws-amplify/backend';
import { defineFunction } from '@aws-amplify/backend-function';

// Define Epic OAuth function
const epicOAuthFunction = defineFunction({
  name: 'epic-oauth',
  entry: './functions/epic-oauth/handler.ts',
  environment: {
    EPIC_TOKENS_TABLE: 'epic_tokens',
    HEALTH_PATIENTS_TABLE: 'health_patients',
    EPIC_REDIRECT_URI: 'http://localhost:3000/auth/epic/callback'
  }
});

// Add to backend
defineBackend({
  // ... existing backend resources
  epicOAuthFunction
});
```

---

## 🧪 Testing Plan

### Local Testing Checklist

#### Test 1: PKCE Generation
- [ ] Code verifier is 43+ characters
- [ ] Code challenge is properly SHA-256 hashed
- [ ] Values stored in sessionStorage
- [ ] Base64 URL encoding is correct (no +, /, =)

#### Test 2: Authorization Request
- [ ] Click "Connect Epic" button
- [ ] Redirect to Epic authorization page
- [ ] URL contains all required parameters
- [ ] State and verifier stored in sessionStorage

#### Test 3: Epic Login (Sandbox)
Use Epic test credentials:
- [ ] Enter test patient credentials
- [ ] Approve data sharing permissions
- [ ] Redirect back to callback URL with code

#### Test 4: Token Exchange
- [ ] Callback receives code and state
- [ ] State validation passes
- [ ] Lambda exchanges code for token
- [ ] Tokens stored in DynamoDB
- [ ] Patient resource fetched successfully

#### Test 5: Data Storage
- [ ] Check `epic_tokens` table has entry
- [ ] Check `health_patients` table has entry
- [ ] Verify data structure matches schema
- [ ] Confirm timestamps are correct

#### Test 6: Error Handling
- [ ] User denies permission → friendly error
- [ ] Invalid state → security error
- [ ] Network timeout → retry message
- [ ] Token exchange failure → error display

---

## 🚀 Deployment Steps

### Step 1: Local Testing
```bash
# Install dependencies
npm install

# Run Amplify sandbox
npx ampx sandbox

# Start dev server
npm run dev

# Test OAuth flow
```

### Step 2: Deploy to Amplify
```bash
# Deploy backend
npx ampx pipeline-deploy --branch main --app-id YOUR_APP_ID

# Update redirect URI in Epic sandbox to staging URL
# Update EPIC_REDIRECT_URI environment variable
```

### Step 3: Update Epic Sandbox Settings
1. Go to Epic FHIR Sandbox
2. Update redirect URI to production URL
3. Test with production environment

---

## ✅ Success Criteria

Phase 1 is complete when:

- [x] User can click "Connect Epic MyChart"
- [x] OAuth flow completes successfully
- [x] Tokens stored securely in DynamoDB
- [x] Patient resource fetched from Epic
- [x] Patient data stored in `health_patients` table
- [x] No errors in CloudWatch logs
- [x] User sees success confirmation

---

## 🔄 Next Steps (Phase 2)

After Phase 1 completion:
1. Add remaining FHIR resources (Appointments, Medications, Labs, etc.)
2. Implement token refresh logic
3. Build health dashboard UI
4. Add cross-vertical context integration

---

## 📞 Support Resources

- **Epic FHIR Documentation:** https://fhir.epic.com/Documentation
- **SMART on FHIR Spec:** http://hl7.org/fhir/smart-app-launch/
- **AWS Amplify Gen 2 Docs:** https://docs.amplify.aws/

---

**Document Created:** October 30, 2025  
**Status:** Ready for Implementation  
**Estimated Completion:** 7 days
