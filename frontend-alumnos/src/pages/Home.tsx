import { useMemo, useState } from 'react';
import type { Alumno } from '../services/alumnoService';
import AlumnoTable from '../components/AlumnoTable';
import ExportButtons from '../components/ExportButtons';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

const PAGE_SIZE = 5;

interface Props {
  alumnos: Alumno[];
  isLoading: boolean;
  onEdit: (alumno: Alumno) => void;
  onDelete: (id: number) => void;
  isDark?: boolean;
}

export default function Home({
  alumnos,
  isLoading,
  onEdit,
  onDelete,
  isDark = false,
}: Props) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof Alumno>('nombre');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return alumnos;
    return alumnos.filter((a) =>
      [a.nombre, a.apellido, a.email, a.curso].some((v) =>
        v.toLowerCase().includes(q),
      ),
    );
  }, [alumnos, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aValue = String(a[sortKey] ?? '').toLowerCase();
      const bValue = String(b[sortKey] ?? '').toLowerCase();
      const comparison = aValue.localeCompare(bValue);
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filtered, sortDirection, sortKey]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleSort = (key: keyof Alumno) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDirection('asc');
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">

      <section className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Listado de alumnos
            </h2>
            <p className="text-sm text-slate-500">
              {filtered.length === 0
                ? 'Sin resultados para la búsqueda actual.'
                : `Mostrando ${paginated.length} de ${filtered.length}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setCurrentPage(1);
            }}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:bg-sky-50"
          >
            Limpiar filtros
          </button>
        </div>

        <SearchBar value={search} onChange={handleSearch} isDark={isDark} />

        {isLoading ? (
          <p className="py-10 text-center text-slate-500">
            Cargando alumnos...
          </p>
        ) : (
          <>
            <AlumnoTable
              alumnos={paginated}
              onEdit={onEdit}
              onDelete={onDelete}
              onRowClick={onEdit}
              onSort={handleSort}
              sortKey={sortKey}
              sortDirection={sortDirection}
              isDark={isDark}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              isDark={isDark}
            />
            <ExportButtons alumnos={filtered} isDark={isDark} />
          </>
        )}
      </section>
    </main>
  );
}
