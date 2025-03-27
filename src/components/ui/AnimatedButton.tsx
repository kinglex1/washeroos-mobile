
import React from 'react';
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

const AnimatedButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  loading = false,
  icon,
  ...props
}: AnimatedButtonProps) => {
  const baseStyles = 'relative overflow-hidden rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-wash-500 focus:ring-offset-1 active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-wash-600 text-white hover:bg-wash-700',
    secondary: 'bg-secondary text-foreground hover:bg-secondary/80',
    ghost: 'bg-transparent hover:bg-wash-100 text-foreground',
    outline: 'bg-transparent border border-wash-300 hover:border-wash-400 text-foreground',
  };
  
  const sizes = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2.5 px-5 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  const rippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = '100px';
    ripple.style.left = `${x - 50}px`;
    ripple.style.top = `${y - 50}px`;
    ripple.className = 'absolute rounded-full bg-white/30 animate-ripple pointer-events-none';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      button.removeChild(ripple);
    }, 600);
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        loading ? 'cursor-wait opacity-80' : '',
        icon ? 'inline-flex items-center justify-center' : '',
        className
      )}
      disabled={loading || props.disabled}
      onClick={(e) => {
        rippleEffect(e);
        props.onClick && props.onClick(e);
      }}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      
      <span className={loading ? 'invisible' : 'flex items-center'}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;
