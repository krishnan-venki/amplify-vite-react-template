import { useState, FormEvent, useEffect } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import sagaa48 from '../assets/sagaa_48x48.png';

export default function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuthenticator(context => [context.user]);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (searchParams.get('verified') === 'true') {
      setSuccessMessage('Email verified successfully! Please sign in.');
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      const from = searchParams.get('from');
      if (from) {
        try {
          const dest = decodeURIComponent(from);
          navigate(dest, { replace: true });
          return;
        } catch {
          // ignore malformed
        }
      }
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate, searchParams]);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await signIn({
        username: formData.email,
        password: formData.password
      });
      // Use window.location to force a full page reload with auth state
      const from = searchParams.get('from');
      if (from) {
        try {
          const dest = decodeURIComponent(from);
          window.location.href = dest;
          return;
        } catch {
          // ignore malformed
        }
      }
      window.location.href = '/dashboard';
    } catch (err: any) {
      if (err.name === 'UserNotConfirmedException') {
        setError('Please verify your email before signing in. Check your inbox for the verification code.');
      } else if (err.name === 'NotAuthorizedException') {
        setError('Incorrect email or password');
      } else {
        setError(err.message || 'Failed to sign in');
      }
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '32px 32px 24px',
          textAlign: 'center',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <img src={sagaa48} alt="Sagaa Logo" width={40} height={40} />
            <span style={{ fontSize: '28px', fontWeight: '700' }}>Sagaa</span>
          </div>
          <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '600', color: '#111827' }}>
            Welcome back
          </h2>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            Sign in to continue to your personal ecosystem
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: '32px' }}>
          {successMessage && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#f0fdf4',
              color: '#166534',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px',
              border: '1px solid #bbf7d0'
            }}>
              {successMessage}
            </div>
          )}

          {error && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#fef2f2',
              color: '#991b1b',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                autoComplete="email"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0284c7'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0284c7'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <div style={{ textAlign: 'right' }}>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ fontSize: '14px', color: '#0284c7', textDecoration: 'none', fontWeight: '500' }}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'opacity 0.2s'
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 32px',
          backgroundColor: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '500' }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
