import { ReactNode } from 'react';
import { clsx } from 'clsx';

type Tone = 'default' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  default: 'bg-blue-50 text-primary',
  success: 'bg-green-50 text-green-600',
  warning: 'bg-yellow-50 text-yellow-700',
  danger: 'bg-red-50 text-red-700'
};

export const Badge = ({ tone = 'default', children, className }: BadgeProps) => (
  <span
    className={clsx('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide', toneClasses[tone], className)}
  >
    {children}
  </span>
);
