import { forwardRef, SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, error, className, children, ...props }, ref) => (
  <label className={clsx('flex flex-col gap-1 text-sm text-slate-700', className)}>
    <span className="font-semibold text-slate-900">{label}</span>
    <select
      ref={ref}
      className={clsx(
        'rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30',
        error && 'border-red-600 focus:border-red-600 focus:ring-red-600/30'
      )}
      {...props}
    >
      {children}
    </select>
    {error && <span className="text-xs font-medium text-red-700">{error}</span>}
  </label>
));

Select.displayName = 'Select';
