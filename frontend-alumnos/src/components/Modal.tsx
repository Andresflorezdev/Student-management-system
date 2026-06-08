interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
  isDark: boolean;
}

export default function Modal({
  title,
  description,
  children,
  onClose,
  isDark,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div
        className={`w-full max-w-2xl overflow-hidden rounded-3xl border shadow-2xl shadow-slate-900/30 ${isDark ? 'border-slate-800 bg-slate-900' : 'border-white/10 bg-white'}`}
      >
        <div
          className={`flex items-start justify-between gap-4 border-b px-6 py-5 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}
        >
          <div>
            <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {title}
            </h3>
            {description ? (
              <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-full border px-3 py-1 text-sm font-medium transition ${isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            Cerrar
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
