import { useEffect } from 'react';
import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import sagaa48 from '../assets/sagaa_48x48.png';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const { user } = useAuthenticator(context => [context.user]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const params = new URLSearchParams(location.search);
      const from = params.get('from');
      if (from) {
        try {
          const dest = decodeURIComponent(from);
          navigate(dest, { replace: true });
          return;
        } catch {
          // ignore malformed
        }
      }
      navigate('/home', { replace: true });
    }
  }, [user, navigate, location]);

  return (
    <Authenticator
      signUpAttributes={["given_name", "family_name"]}
      components={{
        Header: () => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px' }}>
            <img src={sagaa48} alt="" aria-hidden="true" width={28} height={28} />
            <strong style={{ fontSize: 18 }}>Sagaa</strong>
          </div>
        ),
        Footer: () => (
          <div style={{ fontSize: 12, color: '#6b7280', textAlign: 'center', padding: '12px 8px' }}>
            By continuing, you agree to our <a href="#" target="_blank" rel="noreferrer">Terms</a> and <a href="#" target="_blank" rel="noreferrer">Privacy</a>.
          </div>
        ),
        SignIn: {
          Header: () => (
            <div style={{ padding: '8px 12px' }}>
              <h2 style={{ margin: 0 }}>Welcome back</h2>
              <p style={{ margin: '4px 0 0', color: '#6b7280' }}>Sign in to continue to Sagaa</p>
            </div>
          ),
          Footer: () => (
            <div style={{ padding: '8px 12px', fontSize: 12, color: '#6b7280' }}>
              Trouble signing in? <a href="#" onClick={(e) => e.preventDefault()}>Contact support</a>
            </div>
          )
        },
        SignUp: {
          Header: () => (
            <div style={{ padding: '8px 12px' }}>
              <h2 style={{ margin: 0 }}>Create your account</h2>
              <p style={{ margin: '4px 0 0', color: '#6b7280' }}>Join Sagaa to get started</p>
            </div>
          ),
          Footer: () => (
            <div style={{ padding: '8px 12px', fontSize: 12, color: '#6b7280' }}>
              Already have an account? Switch to <strong>Sign in</strong> above.
            </div>
          )
        },
      }}
      formFields={{
        signIn: {
          username: {
            label: 'Email',
            placeholder: 'you@example.com',
            autocomplete: 'username'
          }
        },
        signUp: {
          given_name: {
            label: 'First name',
            placeholder: 'Ada',
            order: 1,
            isRequired: true,
            autocomplete: 'given-name'
          },
          family_name: {
            label: 'Last name',
            placeholder: 'Lovelace',
            order: 2,
            isRequired: true,
            autocomplete: 'family-name'
          },
          email: {
            label: 'Email',
            placeholder: 'you@example.com',
            order: 3,
            autocomplete: 'email'
          },
          password: {
            label: 'Password',
            placeholder: 'At least 8 characters',
            order: 4,
            autocomplete: 'new-password'
          },
          confirm_password: {
            label: 'Confirm password',
            order: 5,
            autocomplete: 'new-password'
          }
        }
      }}
    />
  );
}
