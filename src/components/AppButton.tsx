import React from 'react';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const AppButton: React.FC<AppButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
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
      style={{ ...sizeStyles[size], ...style }}
      {...props}
    >
      {children}
    </button>
  );
};

export default AppButton;
