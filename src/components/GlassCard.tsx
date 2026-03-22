import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, style, className = '', hover = false }) => {
  return (
    <div 
      className={`glass ${hover ? 'glass-hover' : ''} ${className}`} 
      style={{
        borderRadius: '24px',
        padding: '2rem',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
