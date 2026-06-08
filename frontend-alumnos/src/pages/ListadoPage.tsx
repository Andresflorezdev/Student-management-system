import { useMemo, useState } from 'react';
import type { Alumno } from '../services/alumnoService';
import AlumnoTable from '../components/AlumnoTable';
import ExportButtons from '../components/ExportButtons';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import ConfirmModal from '../components/ConfirmModal';
import AlumnoDetailModal from '../components/AlumnoDetailModal';
import type { SortableKey } from '../components/AlumnoTable';

const PAGE_SIZE = 5;

interface Props {
  alumnos: Alumno[];
  isLoading: boolean;
  onEdit: (alumno: Alumno) => void;
  onDelete: (id: number) => void | Promise<void>;
  onGoAdd: () => void;
  isDark: boolean;
}

export default function ListadoPage({
  alumnos,
  isLoading,
  onEdit,
  onDelete,
  onGoAdd,
  isDark,
}: Props) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [courseFilter, setCourseFilter] = useState('');
  const [sortKey, setSortKey] = useState<SortableKey>('nombre');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedDetail, setSelectedDetail] = useState<Alumno | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Alumno | null>(null);

  const courseOptions = useMemo(() => {
    return Array.from(
      new Set(alumnos.map((a) => a.curso).filter(Boolean)),
    ).sort();
  }, [alumnos]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return alumnos.filter((a) => {
      const matchesSearch =
        !q ||
        [a.nombre, a.apellido, a.email, a.curso].some((value) =>
          value.toLowerCase().includes(q),
        );
      const matchesCourse = !courseFilter || a.curso === courseFilter;
      return matchesSearch && matchesCourse;
    });
  }, [alumnos, courseFilter, search]);

  const sorted = useMemo(() => {
    const items = [...filtered];
    items.sort((a, b) => {
      const getValue = (alumno: Alumno) => {
        if (sortKey === 'id') return String(alumno.id ?? 0);
        const value = alumno[sortKey as keyof Alumno];
        if (value == null) return '';
        return String(value).toLowerCase();
      };

      const first = getValue(a);
      const second = getValue(b);
      const comparison = first.localeCompare(second, 'es');
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    return items;
  }, [filtered, sortDirection, sortKey]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleSort = (key: SortableKey) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDirection('asc');
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget?.id) return;
    void onDelete(deleteTarget.id);
    setDeleteTarget(null);
  };

  const panelClass = isDark
    ? 'border-slate-800 bg-slate-900/90 shadow-black/20'
    : 'border-slate-200 bg-white/90 shadow-xl shadow-slate-200/70';
  const inputClass = isDark
    ? 'border-slate-700 bg-slate-950 text-slate-200'
    : 'border-slate-300 bg-white text-slate-700';

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className={`rounded-4xl border p-6 backdrop-blur ${panelClass}`}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Listado de alumnos
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {sorted.length === 0
                ? 'Sin resultados para la busqueda actual.'
                : `Mostrando ${paginated.length} de ${sorted.length}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onGoAdd}
            className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500"
          >
            Agregar alumno
          </button>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <SearchBar
            value={search}
            onChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
            isDark={isDark}
          />
          <select
            value={courseFilter}
            onChange={(e) => {
              setCourseFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={`h-11 rounded-xl border px-4 text-sm shadow-sm transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 ${inputClass}`}
          >
            <option value="">Filtrar por curso</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div className={`mt-4 mb-4 flex flex-wrap items-center gap-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setCourseFilter('');
              setCurrentPage(1);
            }}
            className={`rounded-full border px-4 py-2 font-medium transition ${isDark ? 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}
          >
            Limpiar filtros
          </button>
          <span>Haz click en el encabezado para ordenar.</span>
        </div>

        {isLoading ? (
          <p className={`py-10 text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Cargando alumnos...
          </p>
        ) : (
          <>
            <AlumnoTable
              alumnos={paginated}
              onEdit={onEdit}
              onDelete={(id) => {
                const alumno = alumnos.find((item) => item.id === id);
                if (alumno) setDeleteTarget(alumno);
              }}
              onRowClick={setSelectedDetail}
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
            <ExportButtons alumnos={sorted} isDark={isDark} />
          </>
        )}
      </section>

      {selectedDetail ? (
        <AlumnoDetailModal
          alumno={selectedDetail}
          onClose={() => setSelectedDetail(null)}
          isDark={isDark}
        />
      ) : null}
      {deleteTarget ? (
        <ConfirmModal
          title="Eliminar alumno"
          message={`Vas a eliminar a ${deleteTarget.nombre} ${deleteTarget.apellido}. Esta accion no se puede deshacer.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          isDark={isDark}
        />
      ) : null}
    </main>
  );
}
