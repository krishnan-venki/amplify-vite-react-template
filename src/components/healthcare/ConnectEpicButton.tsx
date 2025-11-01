import { useState } from 'react';
import { Activity } from 'lucide-react';
import { buildAuthorizationUrl, EPIC_STORAGE_KEYS } from '../../config/epic-config';
import { generatePKCEPair, generateState } from '../../utils/pkce-helpers';

/**
 * Connect Epic MyChart Button
 * 
 * Initiates the OAuth 2.0 authorization flow with Epic FHIR sandbox.
 * Generates PKCE codes, stores them securely, and redirects to Epic login.
 */
export const ConnectEpicButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setIsLoading(true);

      // 1. Generate PKCE codes for security
      const { codeVerifier, codeChallenge } = await generatePKCEPair();
      const state = generateState();

      // 2. Store code verifier and state in sessionStorage (temporary, cleared after OAuth)
      sessionStorage.setItem(EPIC_STORAGE_KEYS.CODE_VERIFIER, codeVerifier);
      sessionStorage.setItem(EPIC_STORAGE_KEYS.STATE, state);

      console.log('🔐 PKCE codes generated:', {
        verifierLength: codeVerifier.length,
        verifier: codeVerifier,  // Log the FULL verifier for debugging
        challengeLength: codeChallenge.length,
        challenge: codeChallenge,  // Log the FULL challenge for debugging
        stateLength: state.length
      });

      // 3. Build authorization URL with all required parameters
      const authUrl = buildAuthorizationUrl(state, codeChallenge);

      console.log('🚀 Redirecting to Epic authorization:', authUrl);

      // 4. Redirect to Epic MyChart login
      window.location.href = authUrl;

    } catch (error) {
      console.error('❌ Error initiating Epic OAuth:', error);
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
        background: isLoading 
          ? 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)'
          : 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #f87171 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.1rem',
        fontWeight: 600,
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.7 : 1,
        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
        transition: 'all 0.3s ease',
        width: '100%',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        if (!isLoading) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isLoading) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
        }
      }}
    >
      {isLoading ? (
        <>
          <div style={{
            width: '20px',
            height: '20px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Activity size={24} />
          <span>Connect Epic MyChart</span>
        </>
      )}
    </button>
  );
};
