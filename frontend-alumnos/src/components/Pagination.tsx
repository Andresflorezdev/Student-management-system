interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDark: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isDark,
}: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const idleButtonClass = isDark
    ? 'border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800'
    : 'border-slate-300 bg-white text-slate-700 hover:bg-sky-50';

  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${idleButtonClass}`}
      >
        Anterior
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${page === currentPage ? 'border-sky-600 bg-sky-600 text-white' : idleButtonClass}`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${idleButtonClass}`}
      >
        Siguiente
      </button>
    </div>
  );
}
