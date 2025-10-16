import { clsx } from 'clsx';

interface ToastProps {
  title: string;
  description?: string;
  tone?: 'success' | 'error' | 'info';
}

const toneStyles: Record<Required<ToastProps>['tone'], string> = {
  success: 'border-green-500 text-green-700',
  error: 'border-red-600 text-red-700',
  info: 'border-primary text-primary'
};

export const Toast = ({ title, description, tone = 'info' }: ToastProps) => (
  <div className={clsx('w-full max-w-sm rounded-md border bg-white p-4 shadow-lg', toneStyles[tone])} role="status">
    <p className="font-semibold">{title}</p>
    {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
  </div>
);
