import { forwardRef, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, hint, className, ...props }, ref) => (
  <label className={clsx('flex flex-col gap-1 text-sm text-slate-700', className)}>
    <span className="font-semibold text-slate-900">{label}</span>
    <input
      ref={ref}
      className={clsx(
        'rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30',
        error && 'border-red-600 focus:border-red-600 focus:ring-red-600/30'
      )}
      {...props}
    />
    {hint && <span className="text-xs text-slate-500">{hint}</span>}
    {error && <span className="text-xs font-medium text-red-700">{error}</span>}
  </label>
));

Input.displayName = 'Input';
