import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline-gold' | 'outline-white';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'font-sans font-semibold px-6 py-3 rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'bg-ruban-red hover:bg-ruban-red-dark text-white hover:scale-105',
    'outline-gold': 'border-2 border-gold text-gold hover:bg-gold hover:text-white',
    'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-espresso',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}
