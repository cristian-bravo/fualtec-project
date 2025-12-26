import { ReactNode } from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom";
  align?: "start" | "center" | "end";
  className?: string;
};

export const Tooltip = ({
  content,
  children,
  side = "top",
  align = "center",
  className = "",
}: TooltipProps) => {
  if (!content) {
    return <>{children}</>;
  }

  const sideClass = side === "bottom" ? "top-full mt-2" : "bottom-full mb-2";
  const alignClass =
    align === "start"
      ? "left-0"
      : align === "end"
        ? "right-0"
        : "left-1/2 -translate-x-1/2";
  const arrowClass =
    side === "bottom"
      ? "before:absolute before:left-1/2 before:-top-1 before:h-2 before:w-2 before:-translate-x-1/2 before:rotate-45 before:bg-slate-900/95 before:content-['']"
      : "before:absolute before:left-1/2 before:-bottom-1 before:h-2 before:w-2 before:-translate-x-1/2 before:rotate-45 before:bg-slate-900/95 before:content-['']";

  return (
    <span className={`relative inline-flex ${className} group`}>
      {children}
      <span
        className={`pointer-events-none absolute z-20 whitespace-nowrap rounded-md bg-slate-900/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100 ${sideClass} ${alignClass} ${arrowClass}`}
        aria-hidden="true"
      >
        {content}
      </span>
    </span>
  );
};
