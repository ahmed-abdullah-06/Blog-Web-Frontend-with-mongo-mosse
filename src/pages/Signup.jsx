import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../api/api';
import { useAuth } from "../context/AuthContext";
export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const onLogin = () => navigate('/login');
  const onBack = () => navigate('/');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
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
  const passwordStrength = password.length === 0 ? null : password.length < 6 ? {
    label: 'Weak',
    color: '#EF4444',
    width: '30%'
  } : password.length < 10 ? {
    label: 'Fair',
    color: '#F59E0B',
    width: '60%'
  } : {
    label: 'Strong',
    color: '#22D3EE',
    width: '100%'
  };
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
      background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, rgba(79,70,229,0.06) 40%, transparent 70%)',
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
      maxWidth: '420px',
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
            Create your account
          </h1>
          <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: '#777',
          marginBottom: '32px'
        }}>
            Start writing and sharing with the developer community
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
              const res = await signupApi(username, email, password, age, gender);
              login(res.data.user, res.data.token);
              navigate('/home');
            } catch (err) {
              setError(err.response?.data?.error || 'Signup failed');
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
                Username
              </label>
              <div style={{
              position: 'relative'
            }}>
                <span style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '14px',
                color: '#4F46E5',
                pointerEvents: 'none'
              }}>
                  @
                </span>
                <input type="text" placeholder="yourhandle" value={username} onChange={e => setUsername(e.target.value)} onFocus={() => setFocused('username')} onBlur={() => setFocused(null)} required style={{
                ...inputStyle('username'),
                paddingLeft: '30px'
              }} />
              </div>
            </div>

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
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} required style={inputStyle('email')} />
            </div>

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
                Password
              </label>
              <input type="password" placeholder="At least 6 characters" value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setFocused('password')} onBlur={() => setFocused(null)} minLength={6} required style={inputStyle('password')} />
              {/* Strength meter */}
              {passwordStrength && <div style={{
              marginTop: '8px'
            }}>
                  <div style={{
                height: '3px',
                background: '#222',
                borderRadius: '999px',
                overflow: 'hidden'
              }}>
                    <div style={{
                  height: '100%',
                  width: passwordStrength.width,
                  background: passwordStrength.color,
                  borderRadius: '999px',
                  transition: 'width 0.3s ease, background 0.3s ease'
                }} />
                  </div>
                  <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: passwordStrength.color,
                marginTop: '4px',
                display: 'block'
              }}>
                    {passwordStrength.label}
                  </span>
                </div>}
            </div>
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
                Age
              </label>
              <input type="number" placeholder="Optional" value={age} onChange={e => setAge(e.target.value)} onFocus={() => setFocused('age')} onBlur={() => setFocused(null)} style={inputStyle('age')} />
            </div>

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
                Gender
              </label>
              <select value={gender} onChange={e => setGender(e.target.value)} onFocus={() => setFocused('gender')} onBlur={() => setFocused(null)} style={inputStyle('gender')}>
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
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
              Create Account
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
            }}>or</span>
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
              Sign up with GitHub
            </button>

            <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: '#444',
            textAlign: 'center',
            lineHeight: 1.5
          }}>
              By creating an account you agree to our{' '}
              <a href="#" style={{
              color: '#4F46E5',
              textDecoration: 'none'
            }}>Terms of Service</a>
              {' '}and{' '}
              <a href="#" style={{
              color: '#4F46E5',
              textDecoration: 'none'
            }}>Privacy Policy</a>.
            </p>
          </form>
        </div>

        <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        color: '#666',
        marginTop: '24px'
      }}>
          Already have an account?{' '}
          <button onClick={onLogin} style={{
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
            Login →
          </button>
        </p>
      </div>
    </div>;
}
