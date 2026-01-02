type ContactStatusToggleProps = {
  checked: boolean;
  disabled?: boolean;
  onChange: (next: boolean) => void;
};

export const ContactStatusToggle = ({
  checked,
  disabled = false,
  onChange,
}: ContactStatusToggleProps) => (
  <button
    type="button"
    disabled={disabled}
    onClick={(event) => {
      event.stopPropagation();
      onChange(!checked);
    }}
    className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold transition ${
      checked
        ? 'bg-emerald-100 text-emerald-700'
        : 'bg-slate-100 text-slate-600'
    } ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'}`}
  >
    {checked ? 'Resuelto' : 'Pendiente'}
  </button>
);
