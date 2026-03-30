import React from 'react';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const AppButton: React.FC<AppButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  children, 
  style,
  ...props 
}) => {
  const className = `btn btn-${variant} pulse`;
  
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    lg: { padding: '1rem 2.5rem', fontSize: '1.125rem' },
  };

  return (
    <button 
      className={className} 
      style={{ ...sizeStyles[size], ...style, opacity: loading || props.disabled ? 0.7 : 1 }}
      {...props}
      disabled={loading || props.disabled}
    >
      {loading ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="spinner" style={{ 
            width: '16px', 
            height: '16px', 
            border: '2px solid white', 
            borderTopColor: 'transparent', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite' 
          }}></span>
          Processing...
        </span>
      ) : children}
    </button>
  );
};

export default AppButton;
