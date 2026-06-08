import type { Alumno } from '../services/alumnoService';

interface Props {
  alumnos: Alumno[];
  onEdit: (alumno: Alumno) => void;
  onDelete: (id: number) => void;
  onRowClick: (alumno: Alumno) => void;
  onSort: (key: SortableKey) => void;
  sortKey: SortableKey;
  sortDirection: 'asc' | 'desc';
  isDark: boolean;
}

export type SortableKey = 'id' | keyof Alumno | 'creadoEn';

const columns: Array<{ key: SortableKey; label: string }> = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'apellido', label: 'Apellido' },
  { key: 'email', label: 'Email' },
  { key: 'telefono', label: 'Telefono' },
  { key: 'curso', label: 'Curso' },
  { key: 'creadoEn', label: 'Fecha de registro' },
];

function formatDate(value?: string) {
  if (!value) return 'Sin fecha';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('es-CO', { dateStyle: 'medium' });
}

export default function AlumnoTable({
  alumnos,
  onEdit,
  onDelete,
  onRowClick,
  onSort,
  sortKey,
  sortDirection,
  isDark,
}: Props) {
  if (alumnos.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-slate-400">
        No hay alumnos registrados aun.
      </div>
    );
  }

  const indicator = (key: SortableKey) =>
    sortKey === key ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : '';

  return (
    <div
      className={`overflow-x-auto rounded-3xl border shadow-sm ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}
    >
      <table
        className="w-full text-left text-[15px]"
        style={{ minWidth: '1100px' }}
      >
        <thead className={isDark ? 'bg-slate-800 text-white' : 'bg-sky-900 text-white'}>
          <tr>
            <th
              className="cursor-pointer px-6 py-4 font-medium"
              onClick={() => onSort('id')}
            >
              ID{indicator('id')}
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                className="cursor-pointer px-6 py-4 font-medium"
                onClick={() => onSort(column.key)}
              >
                {column.label}
                {indicator(column.key)}
              </th>
            ))}
            <th className="px-6 py-4 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((a, i) => (
            <tr
              key={a.id}
              onClick={() => onRowClick(a)}
              className={`cursor-pointer transition ${isDark ? 'bg-slate-950 hover:bg-slate-800' : i % 2 === 0 ? 'bg-white hover:bg-sky-50' : 'bg-slate-50 hover:bg-sky-50'}`}
            >
              <td className={`px-6 py-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {a.id}
              </td>
              {columns.map((column) => {
                const value =
                  column.key === 'creadoEn'
                    ? formatDate(a.creadoEn)
                    : column.key === 'curso'
                      ? a.curso
                      : String(a[column.key as keyof Alumno] ?? '');

                return (
                  <td key={column.key} className="px-6 py-4">
                    {column.key === 'curso' ? (
                      <div className="flex flex-wrap items-start gap-2">
                        {String(value)
                          .split(/[,\n]+/)
                          .map((part) => part.trim())
                          .filter(Boolean)
                          .map((part, idx) => (
                            <span
                              key={idx}
                              className={`rounded-full px-3 py-1 text-xs font-medium ${isDark ? 'bg-sky-500/20 text-sky-100' : 'bg-sky-100 text-sky-800'}`}
                            >
                              {part}
                            </span>
                          ))}
                      </div>
                    ) : (
                      <span
                        className={
                          column.key === 'nombre'
                            ? isDark
                              ? 'font-medium text-slate-100'
                              : 'font-medium text-slate-800'
                            : isDark
                              ? 'text-slate-300'
                              : 'text-slate-600'
                        }
                      >
                        {value}
                      </span>
                    )}
                  </td>
                );
              })}
              <td className="px-6 py-4">
                <div
                  className="flex gap-3"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    onClick={() => onEdit(a)}
                    className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-medium text-amber-950 transition hover:bg-amber-500"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(a.id!)}
                    className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
