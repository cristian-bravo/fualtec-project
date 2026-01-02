import { Search } from 'lucide-react';

type SearchBarProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export const SearchBar = ({
  value,
  placeholder = 'Buscar...',
  onChange,
  onSearch,
}: SearchBarProps) => (
  <div className="flex items-center gap-2">
    <div className="relative flex-1">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <Search className="h-4 w-4" />
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onSearch();
        }}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    <button
      onClick={onSearch}
      className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      Buscar
    </button>
  </div>
);
