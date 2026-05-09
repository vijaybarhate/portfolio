import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'fab';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-cyan/45 text-white hover:bg-cyan/65 active:bg-cyan/30 shadow-none hover:shadow-[0_0_20px_rgba(0,237,255,0.15)] border border-white/10',
      secondary: 'bg-magenta text-white hover:bg-magenta/90 shadow-[0_0_15px_rgba(204,51,102,0.3)]',
      outline: 'border border-border bg-transparent hover:border-magenta hover:text-magenta text-white',
      ghost: 'bg-transparent hover:bg-surface text-text-muted hover:text-white',
      fab: 'bg-cyan/45 text-white hover:bg-cyan/65 active:bg-cyan/30 rounded-full w-[52px] h-[52px] border border-white/10',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-ui transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full',
          variant === 'fab' ? '' : sizes[size],
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';