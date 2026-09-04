import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/api';
import { useAuth } from "../context/AuthContext";
export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const onSignup = () => navigate('/signup');
  const onBack = () => navigate('/');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState(null);
  const inputStyle = field => ({
    width: '100%',
    background: '#111111',
    border: `1px solid ${focused === field ? 'rgba(79,70,229,0.6)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '8px',
    padding: '12px 16px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '15px',
    color: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused === field ? '0 0 0 3px rgba(79,70,229,0.15)' : 'none',
    boxSizing: 'border-box'
  });
  return <div style={{
    minHeight: '100vh',
    backgroundColor: '#0D0D0D',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    position: 'relative'
  }}>
      {/* Background glow */}
      <div aria-hidden style={{
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      height: '400px',
      background: 'radial-gradient(ellipse at center, rgba(79,70,229,0.08) 0%, transparent 70%)',
      pointerEvents: 'none',
      zIndex: 0
    }} />

      {/* Back button */}
      <button onClick={onBack} style={{
      position: 'absolute',
      top: '24px',
      left: '24px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#777',
      fontFamily: "'Inter', sans-serif",
      fontSize: '14px',
      transition: 'color 0.2s',
      padding: 0,
      zIndex: 1
    }} onMouseEnter={e => {
      e.currentTarget.style.color = '#ffffff';
    }} onMouseLeave={e => {
      e.currentTarget.style.color = '#777';
    }}>
        ← Back
      </button>

      <div style={{
      position: 'relative',
      zIndex: 1,
      width: '100%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
        {/* Logo */}
        <button onClick={onBack} style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        marginBottom: '36px',
        padding: 0
      }}>
          <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '24px',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.02em'
        }}>
            {'<'}
            <span style={{
            color: '#4F46E5'
          }}>DevBlog</span>
            {' />'}
          </span>
        </button>

        {/* Card */}
        <div style={{
        width: '100%',
        background: '#141414',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 32px 64px rgba(0,0,0,0.5)'
      }}>
          <h1 style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '22px',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '6px',
          letterSpacing: '-0.02em'
        }}>
            Welcome back
          </h1>
          <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: '#777',
          marginBottom: '32px'
        }}>
            Login to your DevBlog account
          </p>

          {error && <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px',
            padding: '10px 14px',
            color: '#F87171',
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            marginBottom: '16px'
          }}>{error}</div>}

          <form onSubmit={async e => {
            e.preventDefault();
            setError('');
            try {
              const res = await loginApi(email, password);
              login(res.data.user, res.data.token);
              navigate('/home');
            } catch (err) {
              setError(err.response?.data?.error || 'Login failed');
            }
          }} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
            <div>
              <label style={{
              display: 'block',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              color: '#999',
              marginBottom: '8px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
                Email
              </label>
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} style={inputStyle('email')} />
            </div>

            <div>
              <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '8px'
            }}>
                <label style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 600,
                color: '#999',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                  Password
                </label>
                <a onClick={() => navigate('/forgot-password')} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                color: '#4F46E5',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }} onMouseEnter={e => {
                e.currentTarget.style.color = '#818CF8';
              }} onMouseLeave={e => {
                e.currentTarget.style.color = '#4F46E5';
              }}>
                  Forgot password?
                </a>
              </div>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setFocused('password')} onBlur={() => setFocused(null)} style={inputStyle('password')} />
            </div>

            <button type="submit" style={{
            marginTop: '8px',
            width: '100%',
            background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
            border: 'none',
            borderRadius: '8px',
            padding: '14px',
            color: '#ffffff',
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(79,70,229,0.3)',
            transition: 'transform 0.15s, box-shadow 0.15s'
          }} onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 0 32px rgba(79,70,229,0.45)';
          }} onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(79,70,229,0.3)';
          }}>
              Login
            </button>

            {/* Divider */}
            <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '4px 0'
          }}>
              <div style={{
              flex: 1,
              height: '1px',
              background: 'rgba(255,255,255,0.07)'
            }} />
              <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              color: '#444'
            }}>or continue with</span>
              <div style={{
              flex: 1,
              height: '1px',
              background: 'rgba(255,255,255,0.07)'
            }} />
            </div>

            {/* GitHub OAuth */}
            <button type="button" style={{
            width: '100%',
            background: '#1A1A1A',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '12px',
            color: '#ffffff',
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'border-color 0.2s, background 0.2s'
          }} onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
            e.currentTarget.style.background = '#222222';
          }} onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.background = '#1A1A1A';
          }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </form>
        </div>

        <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        color: '#666',
        marginTop: '24px'
      }}>
          Don&apos;t have an account?{' '}
          <button onClick={onSignup} style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#4F46E5',
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          fontWeight: 500,
          padding: 0,
          transition: 'color 0.2s'
        }} onMouseEnter={e => {
          e.currentTarget.style.color = '#818CF8';
        }} onMouseLeave={e => {
          e.currentTarget.style.color = '#4F46E5';
        }}>
            Create one →
          </button>
        </p>
      </div>
    </div>;
}
