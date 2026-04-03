'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 100,
      padding: '0.8rem 0',
      borderBottom: '1px solid var(--card-border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <span className="text-grad">GrammarLift</span>
        </Link>
        
        {/* Universal Toggle Button */}
        <button 
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
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
        </div>
      </nav>

      {/* Universal Menu Overlay */}
      {isOpen && (
        <div className="animate-fade-in" style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          borderTop: '1px solid var(--card-border)',
          alignItems: 'center',
          background: 'var(--background)', // Solid background for mobile
          zIndex: 101,
          overflowY: 'auto'
        }}>
            <Link href="/tutor" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>AI Tutor</Link>
            <Link href="/interpersonal" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>Interpersonal</Link>
            <Link href="/learn" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>Learn</Link>
            <Link href="/speaking" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>Speaking</Link>
            <Link href="/arena" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>⚔️ Arena</Link>
            <Link href="/free-writing" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>Free Writing</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>About</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
