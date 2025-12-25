import { ReactNode } from "react";
import { clsx } from "clsx";

interface TableProps {
  headers: string[];
  children: ReactNode;
  colgroup?: ReactNode;   // 👈 AÑADE ESTO
  caption?: string;
  className?: string;
}

export const Table = ({
  headers,
  children,
  colgroup,
  caption,
  className,
}: TableProps) => (
  <div className={clsx(
    "overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm",
    className
  )}>
    <table className="w-full table-fixed border-collapse divide-y divide-slate-200">

      {colgroup && <colgroup>{colgroup}</colgroup>}

      {caption && (
        <caption className="px-6 py-4 text-left text-sm font-medium text-slate-600">
          {caption}
        </caption>
      )}

      <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className={clsx(
                "px-6 py-3 font-semibold text-left",
                header === "Estado" && "text-center",
                (header === "" || header === "Acciones") && "text-right"
              )}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
        {children}
      </tbody>
    </table>
  </div>
);
