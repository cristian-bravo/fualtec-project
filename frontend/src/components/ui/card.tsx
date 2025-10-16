import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}

export const Card = ({ title, description, children, className, footer }: CardProps) => (
  <section className={clsx('rounded-lg border border-slate-200 bg-white shadow-sm', className)}>
    {(title || description) && (
      <header className="border-b border-slate-100 px-6 py-4">
        {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
        {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
      </header>
    )}
    <div className="px-6 py-4 text-sm text-slate-700">{children}</div>
    {footer && <footer className="border-t border-slate-100 px-6 py-3">{footer}</footer>}
  </section>
);
