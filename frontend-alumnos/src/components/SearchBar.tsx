interface Props {
  value: string;
  onChange: (val: string) => void;
  isDark: boolean;
}

export default function SearchBar({ value, onChange, isDark }: Props) {
  const inputThemeClass = isDark
    ? 'border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-500'
    : 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400';

  return (
    <div className="relative mb-5">
      <span className="absolute inset-y-0 left-3 flex items-center text-sm text-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-slate-400"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por nombre, apellido, email o curso..."
        className={`w-full rounded-xl border py-2.5 pl-9 pr-10 text-sm shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 ${inputThemeClass}`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-slate-600"
        >
          <span className="sr-only">Limpiar busqueda</span>x
        </button>
      )}
    </div>
  );
}
