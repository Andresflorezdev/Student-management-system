type View = 'dashboard' | 'list' | 'add';

interface Props {
  activeView: View;
  onNavigate: (view: View) => void;
  onToggleTheme: () => void;
  isDark: boolean;
}

const navItems: Array<{ key: View; label: string }> = [
  { key: 'dashboard', label: 'Home' },
  { key: 'list', label: 'Listado de alumnos' },
  { key: 'add', label: 'Agregar alumnos' },
];

export default function AppHeader({
  activeView,
  onNavigate,
  onToggleTheme,
  isDark,
}: Props) {
  const headerThemeClass = isDark
    ? 'border-slate-800 bg-linear-to-r from-slate-950 via-slate-900 to-slate-800'
    : 'border-cyan-200/70 bg-linear-to-r from-cyan-800 via-sky-800 to-indigo-800 shadow-[0_18px_45px_rgba(6,182,212,0.22)]';

  return (
    <header
      className={`sticky top-0 z-20 overflow-hidden border-b text-white ${headerThemeClass}`}
    >
      <div className="absolute -left-16 top-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-200/15 blur-3xl" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Gestión académica
          </h2>
        </div>
        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => {
            const active = activeView === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavigate(item.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${active ? 'border-b-2 border-white text-white' : 'text-cyan-50/90 hover:text-white'}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onToggleTheme}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
        >
          {isDark ? 'Modo claro' : 'Modo oscuro'}
        </button>
      </div>
    </header>
  );
}
