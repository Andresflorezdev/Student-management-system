import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { Alumno } from '../services/alumnoService';

interface Props {
  alumnos: Alumno[];
  onGoList: () => void;
  onGoAdd: () => void;
  isDark: boolean;
}

export default function DashboardPage({
  alumnos,
  onGoList,
  onGoAdd,
  isDark,
}: Props) {
  const byCourse = useMemo(() => {
    const map = new Map<string, number>();
    alumnos.forEach((alumno) => {
      map.set(alumno.curso, (map.get(alumno.curso) ?? 0) + 1);
    });

    return Array.from(map.entries()).map(([curso, cantidad]) => ({
      curso,
      cantidad,
    }));
  }, [alumnos]);

  const total = alumnos.length;
  const latestCourse = byCourse.reduce(
    (best, item) => (item.cantidad > best.cantidad ? item : best),
    byCourse[0] ?? { curso: 'Sin datos', cantidad: 0 },
  );

  const heroClass = isDark
    ? 'border-slate-800 bg-slate-900 text-slate-100 shadow-black/20'
    : 'border-cyan-100 bg-linear-to-br from-sky-800 via-cyan-700 to-teal-600 text-white shadow-2xl shadow-cyan-100/50';
  const cardClass = isDark
    ? 'border-slate-800 bg-slate-900'
    : 'border-slate-200 bg-white';
  const mutedTextClass = isDark ? 'text-slate-400' : 'text-slate-500';
  const strongTextClass = isDark ? 'text-white' : 'text-slate-900';
  const chartTextColor = isDark ? '#cbd5e1' : '#475569';
  const tooltipStyle = {
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
    color: isDark ? '#e2e8f0' : '#0f172a',
    borderRadius: '16px',
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className={`overflow-hidden rounded-4xl border ${heroClass}`}>
        <div className="p-8 lg:p-10">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Dashboard con estadisticas
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-cyan-50/90 sm:text-base">
            Total de alumnos, distribucion por curso y una grafica de barras
            para revisar el estado general de forma rapida.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onGoList}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-sky-800 transition hover:bg-cyan-50"
            >
              Ver listado
            </button>
            <button
              type="button"
              onClick={onGoAdd}
              className="rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Agregar alumno
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className={`rounded-3xl border p-5 shadow-lg ${cardClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${mutedTextClass}`}>
            Total alumnos
          </p>
          <p className={`mt-3 text-4xl font-black ${strongTextClass}`}>{total}</p>
        </div>
        <div className={`rounded-3xl border p-5 shadow-lg ${cardClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${mutedTextClass}`}>
            Cursos
          </p>
          <p className={`mt-3 text-4xl font-black ${strongTextClass}`}>
            {byCourse.length}
          </p>
        </div>
        <div className={`rounded-3xl border p-5 shadow-lg ${cardClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${mutedTextClass}`}>
            Curso mas poblado
          </p>
          <p className={`mt-3 text-2xl font-black ${strongTextClass}`}>
            {latestCourse.curso}
          </p>
        </div>
        <div className={`rounded-3xl border p-5 shadow-lg ${cardClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${mutedTextClass}`}>
            Alumnos en ese curso
          </p>
          <p className={`mt-3 text-4xl font-black ${strongTextClass}`}>
            {latestCourse.cantidad}
          </p>
        </div>
      </section>

      <section className={`rounded-4xl border p-6 shadow-xl ${cardClass}`}>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Alumnos por curso
            </h2>
            <p className={`text-sm ${mutedTextClass}`}>
              Grafica de barras con la distribucion actual.
            </p>
          </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byCourse}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTextColor} strokeOpacity={0.2} />
              <XAxis dataKey="curso" stroke={chartTextColor} />
              <YAxis allowDecimals={false} stroke={chartTextColor} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="cantidad" radius={[12, 12, 0, 0]}>
                {byCourse.map((entry, index) => (
                  <Cell
                    key={entry.curso}
                    fill={
                      ['#0ea5e9', '#06b6d4', '#14b8a6', '#3b82f6'][index % 4]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}
