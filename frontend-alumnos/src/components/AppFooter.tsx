type View = 'dashboard' | 'list' | 'add';

interface Props {
  activeView: View;
  onNavigate: (view: View) => void;
  isDark: boolean;
}

const navItems: Array<{ key: View; label: string }> = [
  { key: 'dashboard', label: 'Home' },
  { key: 'list', label: 'Listado de alumnos' },
  { key: 'add', label: 'Agregar alumnos' },
];

export default function AppFooter({ activeView, onNavigate, isDark }: Props) {
  const footerThemeClass = isDark
    ? 'border-slate-800 bg-linear-to-r from-slate-950 via-slate-900 to-slate-800'
    : 'border-cyan-200/70 bg-linear-to-r from-sky-800 via-cyan-800 to-teal-800 shadow-[0_-18px_45px_rgba(6,182,212,0.18)]';

  return (
    <footer className={`mt-8 border-t text-white ${footerThemeClass}`}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className={`mt-1 text-sm ${isDark ? 'text-slate-300' : 'text-cyan-50/90'}`}>
            Gestion Academica - Todos los derechos reservados
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          {navItems.map((item) => {
            const active = activeView === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavigate(item.key)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition ${active ? 'bg-white/10 text-white' : 'text-cyan-50/90 hover:text-white'}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
