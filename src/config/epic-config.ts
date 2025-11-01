/**
 * Epic FHIR Integration Configuration
 * 
 * Configuration for Epic MyChart OAuth 2.0 integration using SMART on FHIR.
 * This includes sandbox credentials, endpoints, and test patient information.
 */

// Determine environment-specific redirect URI
const getRedirectUri = (): string => {
  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;
    // Use current origin for redirect (works for localhost and deployed environments)
    return `${protocol}//${hostname}${port ? `:${port}` : ''}/auth/epic/callback`;
  }
  // Fallback for SSR or build time
  return 'http://localhost:3000/auth/epic/callback';
};

/**
 * Epic FHIR Sandbox Configuration
 */
export const EPIC_CONFIG = {
  // OAuth 2.0 Credentials
  // Epic App - Non-Production Client ID (for sandbox testing)
  clientId: '5791a93f-7f54-41b9-828a-0f3581d4f6cb',
  
  // Redirect URI (dynamically determined based on environment)
  redirectUri: getRedirectUri(),
  
  // Epic FHIR Endpoints (Sandbox)
  fhirBaseUrl: 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4',
  authorizationUrl: 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize',
  tokenUrl: 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token',
  
  // FHIR Scopes (Patient-level access)
  scopes: [
    'openid',                           // OpenID Connect
    'fhirUser',                         // FHIR user identity
    'patient/Patient.read',             // Patient demographics
    'patient/Observation.read',         // Vitals, lab results, measurements
    'patient/Condition.read',           // Diagnoses and health conditions
    'patient/MedicationRequest.read',   // Prescriptions and medications
    'patient/AllergyIntolerance.read',  // Drug and food allergies
    'patient/Immunization.read',        // Vaccine history
    'patient/Appointment.read'          // Past and upcoming appointments
  ],
  
  // Test Patient Information (Epic Sandbox)
  testPatient: {
    name: 'Derrick Lin',
    fhirId: 'eq081-VQEgP8drUUqCWzHfw3',
    externalId: 'Z6127',
    mrn: '203711',
    // Test credentials for Epic MyChart Sandbox
    myChartUsername: 'fhirderrick',
    myChartPassword: 'epicepic1'
  }
} as const;

/**
 * Epic Connection Status
 */
export type EpicConnectionStatus = 'not-connected' | 'connecting' | 'connected' | 'error';

/**
 * Helper function to get the full authorization URL with parameters
 * @param state - Random state for CSRF protection
 * @param codeChallenge - PKCE code challenge
 * @returns Complete authorization URL
 */
export function buildAuthorizationUrl(state: string, codeChallenge: string): string {
  const scopeString = EPIC_CONFIG.scopes.join(' ');
  
  // Log the scopes we're requesting
  console.log('📋 Requesting OAuth Scopes:', {
    count: EPIC_CONFIG.scopes.length,
    scopes: EPIC_CONFIG.scopes,
    scopeString: scopeString
  });
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: EPIC_CONFIG.clientId,
    redirect_uri: EPIC_CONFIG.redirectUri,
    scope: scopeString,
    state: state,
    // aud: EPIC_CONFIG.fhirBaseUrl,  // Removing aud - might be causing invalid_grant with Non-Production Client ID
    code_challenge: codeChallenge,
    code_challenge_method: 'S256'
  });

  return `${EPIC_CONFIG.authorizationUrl}?${params.toString()}`;
}

/**
 * Storage keys for OAuth flow
 */
export const EPIC_STORAGE_KEYS = {
  CODE_VERIFIER: 'epic_code_verifier',
  STATE: 'epic_state',
  CONNECTION_STATUS: 'epic_connection_status'
} as const;
