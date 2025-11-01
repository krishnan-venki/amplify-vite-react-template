/**
 * PKCE (Proof Key for Code Exchange) Helper Utilities
 * 
 * Implements RFC 7636 for OAuth 2.0 authorization code flow security.
 * PKCE prevents authorization code interception attacks in public clients.
 * 
 * @see https://tools.ietf.org/html/rfc7636
 */

/**
 * Generate a cryptographically secure random string
 * @param length - Length of the random byte array
 * @returns Base64 URL-encoded random string
 */
function generateRandomString(length: number): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

/**
 * Base64 URL encoding (without padding)
 * Converts binary data to base64url format as per RFC 4648
 * @param buffer - Byte array to encode
 * @returns Base64 URL-encoded string (without padding)
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
 * @param plain - Plain text string to hash
 * @returns Promise resolving to hash buffer
 */
async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest('SHA-256', data);
}

/**
 * Generate PKCE code verifier
 * Creates a cryptographically random string between 43-128 characters
 * @returns Code verifier string
 */
export function generateCodeVerifier(): string {
  // 32 bytes = 43 base64url characters (meets minimum requirement)
  return generateRandomString(32);
}

/**
 * Generate PKCE code challenge from verifier
 * Creates SHA-256 hash of the code verifier
 * @param verifier - Code verifier string
 * @returns Promise resolving to code challenge string
 */
export async function generateCodeChallenge(verifier: string): Promise<string> {
  const hashed = await sha256(verifier);
  const array = new Uint8Array(hashed);
  return base64URLEncode(array);
}

/**
 * Generate random state parameter for CSRF protection
 * @returns Random state string (32 bytes = 43 characters)
 */
export function generateState(): string {
  return generateRandomString(32);
}

/**
 * Validate state parameter matches stored value
 * @param receivedState - State parameter from OAuth callback
 * @param storedState - State value stored before redirect
 * @returns True if states match
 */
export function validateState(receivedState: string, storedState: string | null): boolean {
  if (!storedState) {
    console.error('No stored state found - possible session timeout');
    return false;
  }
  
  if (receivedState !== storedState) {
    console.error('State mismatch - possible CSRF attack');
    return false;
  }
  
  return true;
}

/**
 * Generate complete PKCE pair (verifier + challenge)
 * Convenience function that generates both values at once
 * @returns Promise resolving to { verifier, challenge }
 */
export async function generatePKCEPair(): Promise<{
  codeVerifier: string;
  codeChallenge: string;
}> {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  
  return {
    codeVerifier,
    codeChallenge
  };
}
