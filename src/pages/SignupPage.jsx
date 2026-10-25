import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid work email.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
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
      {/* Brand Header */}
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          marginBottom: '28px'
        }}
      >
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            backgroundColor: '#181824',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="3" fill="#2d62ff" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.35rem',
            color: '#181824',
            letterSpacing: '-0.025em'
          }}
        >
          CloudLens
        </span>
      </Link>

      {/* Card Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
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
            Create an account
          </h1>
          <p
            style={{
              color: '#575783',
              fontSize: '0.92rem',
              lineHeight: 1.5
            }}
          >
            Start gaining clarity on your cloud infrastructure
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="signup-name"
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#181824',
                marginBottom: '6px'
              }}
            >
              Full Name
            </label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivers"
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

          {/* Work Email */}
          <div>
            <label
              htmlFor="signup-email"
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
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
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

          {/* Company */}
          <div>
            <label
              htmlFor="signup-company"
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#181824',
                marginBottom: '6px'
              }}
            >
              Company / Team Name
            </label>
            <input
              id="signup-company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Corp"
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
            <label
              htmlFor="signup-password"
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#181824',
                marginBottom: '6px'
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              height: '46px',
              borderRadius: '9999px',
              backgroundColor: '#2d62ff',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(45, 98, 255, 0.25)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2d62ff')}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
      </div>

      {/* Switch to Login */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', color: '#575783' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              color: '#2d62ff',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
