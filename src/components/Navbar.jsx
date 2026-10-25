import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.25s ease',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #e0e0eb',
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo - Minimal Finance Light Style */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              background: '#2d62ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" stroke="#ffffff" strokeWidth="2.5" />
              <circle cx="12" cy="12" r="3" fill="#ffffff" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.2rem',
              color: '#181824',
              letterSpacing: '-0.02em'
            }}
          >
            CloudLens
          </span>
        </Link>

        {/* Clean Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}
          className="desktop-nav"
        >
          <button
            onClick={() => scrollTo('product-preview')}
            style={{
              fontSize: '0.88rem',
              fontWeight: 500,
              color: '#575783',
              transition: 'color 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#181824')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#575783')}
          >
            Product
          </button>
          <button
            onClick={() => scrollTo('features')}
            style={{
              fontSize: '0.88rem',
              fontWeight: 500,
              color: '#575783',
              transition: 'color 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#181824')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#575783')}
          >
            Architecture
          </button>
          <button
            onClick={() => scrollTo('calculator')}
            style={{
              fontSize: '0.88rem',
              fontWeight: 500,
              color: '#575783',
              transition: 'color 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#181824')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#575783')}
          >
            Savings ROI
          </button>
          <Link
            to="/overview"
            style={{
              fontSize: '0.88rem',
              fontWeight: 500,
              color: '#2d62ff',
              transition: 'opacity 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2d62ff' }} />
            <span>Live Demo</span>
          </Link>
        </nav>

        {/* Minimal Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link
            to="/login"
            className="desktop-auth"
            style={{
              fontSize: '0.88rem',
              fontWeight: 500,
              color: '#181824',
              padding: '8px 12px',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#2d62ff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#181824')}
          >
            Sign in
          </Link>

          <Link
            to="/signup"
            className="desktop-auth"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#181824',
              color: '#ffffff',
              fontSize: '0.86rem',
              fontWeight: 600,
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(24, 24, 36, 0.12)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2d62ff')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#181824')}
          >
            <span>Get started</span>
            <ArrowRight size={14} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="mobile-toggle"
            style={{ color: '#181824' }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            background: '#ffffff',
            borderBottom: '1px solid #e0e0eb',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 16px 36px rgba(24, 24, 36, 0.08)'
          }}
        >
          <button
            onClick={() => scrollTo('product-preview')}
            style={{ textAlign: 'left', fontSize: '1rem', fontWeight: 500, color: '#181824', padding: '6px 0', cursor: 'pointer' }}
          >
            Product
          </button>
          <button
            onClick={() => scrollTo('features')}
            style={{ textAlign: 'left', fontSize: '1rem', fontWeight: 500, color: '#181824', padding: '6px 0', cursor: 'pointer' }}
          >
            Architecture
          </button>
          <button
            onClick={() => scrollTo('calculator')}
            style={{ textAlign: 'left', fontSize: '1rem', fontWeight: 500, color: '#181824', padding: '6px 0', cursor: 'pointer' }}
          >
            Savings ROI
          </button>
          <Link
            to="/overview"
            onClick={() => setMobileMenuOpen(false)}
            style={{ textAlign: 'left', fontSize: '1rem', fontWeight: 500, color: '#2d62ff', padding: '6px 0' }}
          >
            Live Demo
          </Link>
          <div style={{ height: '1px', background: '#e0e0eb', margin: '4px 0' }} />
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            style={{ textAlign: 'center', padding: '10px', fontWeight: 500, color: '#181824' }}
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: '#181824',
              color: '#ffffff',
              textAlign: 'center',
              padding: '12px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>Get started</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </header>
  );
}
