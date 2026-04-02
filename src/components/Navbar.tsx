'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppButton from './AppButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1rem 0',
      marginBottom: '2rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <span className="text-grad">GrammarLift</span>
        </Link>
        
        {/* Universal Toggle Button */}
        <button 
          className="hide-on-desktop"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--foreground)'
          }}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Universal Menu Overlay */}
      {isOpen && (
        <div className="glass animate-fade-in" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          borderTop: '1px solid var(--card-border)'
        }}>
            <Link href="/interpersonal" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>Interpersonal</Link>
            <Link href="/learn" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>Learn</Link>
            <Link href="/speaking" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>Speaking</Link>
            <Link href="/arena" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>⚔️ Arena</Link>
            <Link href="/free-writing" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>Free Writing</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>About</Link>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 769px) {
          .hide-on-desktop { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
