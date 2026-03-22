import React from 'react';
import Link from 'next/link';

const Navbar = () => {
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
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="text-grad">GrammarLift</span>
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/dashboard" style={{ fontWeight: 500 }}>Dashboard</Link>
          <Link href="/learn" style={{ fontWeight: 500 }}>Learn</Link>
          <Link href="/tutor" style={{ fontWeight: 500 }}>AI Tutor</Link>
          <Link href="/scenarios" style={{ fontWeight: 500 }}>Scenarios</Link>
          <Link href="/exercises" style={{ fontWeight: 500 }}>Exercises</Link>
          <Link href="/free-writing" style={{ fontWeight: 500 }}>Free Writing</Link>
          <Link href="/pricing" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
            Go Pro
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
