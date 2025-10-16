import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface TableProps {
  headers: string[];
  children: ReactNode;
  caption?: string;
  className?: string;
}

export const Table = ({ headers, children, caption, className }: TableProps) => (
  <div className={clsx('overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm', className)}>
    <table className="w-full min-w-max divide-y divide-slate-200">
      {caption && (
        <caption className="px-6 py-4 text-left text-sm font-medium text-slate-600">{caption}</caption>
      )}
      <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
        <tr>
          {headers.map((header) => (
            <th key={header} scope="col" className="px-6 py-3 text-left font-semibold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 text-sm text-slate-700">{children}</tbody>
    </table>
  </div>
);
