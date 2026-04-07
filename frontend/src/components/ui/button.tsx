import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'dangerSecondary' | 'ghost';
  isLoading?: boolean;
}

const variantClasses = {
  primary:
    'bg-primary text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
  secondary: 'bg-white text-primary border border-primary hover:bg-blue-50',
  danger: 'bg-red-800 text-white hover:bg-red-900',
  dangerSecondary: 'bg-white text-red-700 border border-red-200 hover:bg-red-50',
  ghost: 'text-primary hover:bg-blue-50'
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', isLoading, disabled, type = 'button', ...props }, ref) => {
    const spinnerClasses =
      variant === 'primary' || variant === 'danger'
        ? 'border-white border-r-transparent'
        : 'border-current border-r-transparent';

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
          variantClasses[variant],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span
            className={clsx(
              'mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2',
              spinnerClasses
            )}
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
