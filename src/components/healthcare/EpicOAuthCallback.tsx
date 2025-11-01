import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { EPIC_STORAGE_KEYS } from '../../config/epic-config';
import { validateState } from '../../utils/pkce-helpers';
import API_ENDPOINTS from '../../config/api';

type Status = 'processing' | 'success' | 'error';

/**
 * Epic OAuth Callback Handler
 * 
 * Handles the redirect from Epic after user authentication.
 * Validates state, exchanges code for token via backend Lambda,
 * and redirects to healthcare dashboard.
 */
export const EpicOAuthCallback = () => {
  const [status, setStatus] = useState<Status>('processing');
  const [message, setMessage] = useState('Connecting to Epic MyChart...');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasRun = useRef(false);  // Prevent double execution in React Strict Mode

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      handleCallback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCallback = async () => {
    try {
      // 1. Extract parameters from URL
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      // 2. Check for errors from Epic
      if (error) {
        throw new Error(
          `Epic authorization failed: ${error}${errorDescription ? ` - ${errorDescription}` : ''}`
        );
      }

      if (!code || !state) {
        throw new Error('Missing authorization code or state parameter. This page should only be accessed via Epic redirect.');
      }

      console.log('✅ Received authorization code from Epic');

      // 3. Retrieve stored values from sessionStorage
      const storedState = sessionStorage.getItem(EPIC_STORAGE_KEYS.STATE);
      const codeVerifier = sessionStorage.getItem(EPIC_STORAGE_KEYS.CODE_VERIFIER);

      console.log('📦 Retrieved from sessionStorage:', {
        storedState: storedState ? `${storedState.substring(0, 10)}...` : 'null',
        codeVerifier: codeVerifier || 'null',
        codeVerifierLength: codeVerifier?.length || 0
      });

      if (!storedState || !codeVerifier) {
        throw new Error('Session expired. Please try connecting again.');
      }

      // 4. Validate state parameter (CSRF protection)
      if (!validateState(state, storedState)) {
        throw new Error('Invalid state parameter - possible security issue');
      }

      console.log('✅ State validation passed');

      setMessage('Exchanging authorization code...');

      // 5. Get Cognito authentication token
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      if (!token) {
        throw new Error('No authentication token available. Please sign in.');
      }

      // 6. Call backend Lambda to exchange code for access token
      console.log('📡 Calling backend to exchange code for token...');

      const response = await fetch(API_ENDPOINTS.EPIC_CALLBACK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          code,
          codeVerifier,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to exchange authorization code: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log('✅ Token exchange successful:', result);

      setMessage('Fetching your health records...');

      // Wait a moment for visual feedback
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 7. Success!
      setStatus('success');
      setMessage('Successfully connected to Epic MyChart!');

      // 8. Clean up session storage
      sessionStorage.removeItem(EPIC_STORAGE_KEYS.STATE);
      sessionStorage.removeItem(EPIC_STORAGE_KEYS.CODE_VERIFIER);
      sessionStorage.setItem(EPIC_STORAGE_KEYS.CONNECTION_STATUS, 'connected');

      console.log('✅ OAuth flow completed successfully');

      // 9. Redirect to healthcare dashboard after 2 seconds
      setTimeout(() => {
        navigate('/healthcare/dashboard');
      }, 2000);

    } catch (error) {
      console.error('❌ OAuth callback error:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Connection failed');

      // Clean up on error
      sessionStorage.removeItem(EPIC_STORAGE_KEYS.STATE);
      sessionStorage.removeItem(EPIC_STORAGE_KEYS.CODE_VERIFIER);

      // Redirect back to dashboard after 4 seconds
      setTimeout(() => {
        navigate('/healthcare/dashboard');
      }, 4000);
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
        width: '100%',
        textAlign: 'center'
      }}>
        {status === 'processing' && (
          <>
            <Loader2 
              size={64} 
              color="#3b82f6" 
              style={{ 
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }} 
            />
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 600, 
              color: '#1e293b', 
              marginTop: '24px',
              marginBottom: '12px'
            }}>
              Connecting to Epic
            </h2>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto' }} />
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 600, 
              color: '#10b981', 
              marginTop: '24px',
              marginBottom: '12px'
            }}>
              Connection Successful!
            </h2>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle size={64} color="#ef4444" style={{ margin: '0 auto' }} />
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 600, 
              color: '#ef4444', 
              marginTop: '24px',
              marginBottom: '12px'
            }}>
              Connection Failed
            </h2>
          </>
        )}

        <p style={{ 
          fontSize: '1rem', 
          color: '#64748b', 
          marginTop: '16px',
          lineHeight: '1.5'
        }}>
          {message}
        </p>

        {status === 'success' && (
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#94a3b8', 
            marginTop: '12px'
          }}>
            Redirecting to your dashboard...
          </p>
        )}

        {status === 'error' && (
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#94a3b8', 
            marginTop: '12px'
          }}>
            Redirecting back to healthcare dashboard...
          </p>
        )}
      </div>

      {/* Inline CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EpicOAuthCallback;
