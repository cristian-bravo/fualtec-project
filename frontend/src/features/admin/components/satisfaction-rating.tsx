type SatisfactionRatingProps = {
  value: number;
  max?: number;
  showLabel?: boolean;
};

export const SatisfactionRating = ({
  value,
  max = 5,
  showLabel = true,
}: SatisfactionRatingProps) => {
  // Mirrors the public form's rating visuals for admin detail clarity.
  const safeValue = Math.max(0, Math.min(value, max));

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: max }, (_, index) => {
          const active = index + 1 <= safeValue;
          return (
            <span
              key={index}
              className={`inline-flex h-6 w-6 items-center justify-center rounded-full ring-1 ${
                active ? 'bg-[#0A1F44]/15 ring-[#0A1F44]' : 'bg-slate-50 ring-slate-200'
              }`}
              aria-hidden="true"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                className={active ? 'text-[#0A1F44]' : 'text-slate-300'}
              >
                <path
                  fill="currentColor"
                  d="m12 17.27 5.18 3.05-1.64-5.63L20 10.9l-5.73-.49L12 5 9.73 10.41 4 10.9l4.46 3.79-1.64 5.63L12 17.27Z"
                />
              </svg>
            </span>
          );
        })}
      </div>
      {showLabel && <span className="text-xs text-slate-500">{safeValue}/{max}</span>}
    </div>
  );
};
