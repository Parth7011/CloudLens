import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your work email.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/overview');
    }, 450);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f8fc',
        backgroundImage: 'radial-gradient(circle at 15% 20%, #e0e0ff 0%, transparent 40%), radial-gradient(circle at 85% 80%, #ebfff5 0%, transparent 45%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px'
      }}
    >
      {/* Top Navigation Row: Back to Home & Brand */}
      <div style={{ width: '100%', maxWidth: '420px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#575783',
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: '9999px',
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0eb',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#181824';
            e.currentTarget.style.borderColor = '#cdcddd';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#575783';
            e.currentTarget.style.borderColor = '#e0e0eb';
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to home</span>
        </Link>

        {/* Brand Header */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: '#181824',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" stroke="#ffffff" strokeWidth="2.5" />
              <circle cx="12" cy="12" r="3" fill="#2d62ff" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.2rem',
              color: '#181824',
              letterSpacing: '-0.025em'
            }}
          >
            CloudLens
          </span>
        </Link>
      </div>

      {/* Card Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e0e0eb',
          boxShadow: '0 20px 40px -15px rgba(24, 24, 36, 0.07)',
          padding: '36px 32px'
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.65rem',
              fontWeight: 700,
              color: '#181824',
              letterSpacing: '-0.03em',
              marginBottom: '6px'
            }}
          >
            Welcome back
          </h1>
          <p
            style={{
              color: '#575783',
              fontSize: '0.92rem',
              lineHeight: 1.5
            }}
          >
            Sign in to access your cloud cost intelligence
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#991b1b',
              fontSize: '0.85rem',
              marginBottom: '20px'
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {forgotSent && (
          <div
            style={{
              backgroundColor: '#ebfff5',
              border: '1px solid #cef5ca',
              borderRadius: '10px',
              padding: '10px 14px',
              color: '#114e0b',
              fontSize: '0.85rem',
              marginBottom: '20px'
            }}
          >
            Password reset link sent to your email.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Email */}
          <div>
            <label
              htmlFor="login-email"
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#181824',
                marginBottom: '6px'
              }}
            >
              Work Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              style={{
                width: '100%',
                height: '44px',
                borderRadius: '10px',
                border: '1px solid #e0e0eb',
                backgroundColor: '#ffffff',
                padding: '0 14px',
                fontSize: '0.95rem',
                color: '#181824',
                outline: 'none',
                transition: 'border-color 0.15s ease'
              }}
              onFocus={(e) => (e.target.style.borderColor = '#2d62ff')}
              onBlur={(e) => (e.target.style.borderColor = '#e0e0eb')}
            />
          </div>

          {/* Password */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px'
              }}
            >
              <label
                htmlFor="login-password"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#181824'
                }}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotSent(true)}
                style={{
                  fontSize: '0.8rem',
                  color: '#2d62ff',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                Forgot password?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  height: '44px',
                  borderRadius: '10px',
                  border: '1px solid #e0e0eb',
                  backgroundColor: '#ffffff',
                  padding: '0 40px 0 14px',
                  fontSize: '0.95rem',
                  color: '#181824',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#2d62ff')}
                onBlur={(e) => (e.target.style.borderColor = '#e0e0eb')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#7373a1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#181824',
                cursor: 'pointer'
              }}
            />
            <label
              htmlFor="remember"
              style={{
                fontSize: '0.85rem',
                color: '#575783',
                cursor: 'pointer'
              }}
            >
              Keep me signed in for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              height: '46px',
              borderRadius: '9999px',
              backgroundColor: '#181824',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '4px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(24, 24, 36, 0.15)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2d62ff')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#181824')}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>

      {/* Switch to Sign Up */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', color: '#575783' }}>
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{
              color: '#2d62ff',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
