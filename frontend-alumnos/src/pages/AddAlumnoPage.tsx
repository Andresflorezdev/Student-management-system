import AlumnoForm from '../components/AlumnoForm';
import type { Alumno } from '../services/alumnoService';

interface Props {
  selected: Alumno | null;
  onBack: () => void;
  onSubmit: (data: Alumno) => void;
  isSaving: boolean;
  isDark: boolean;
}

export default function AddAlumnoPage({
  selected,
  onBack,
  onSubmit,
  isSaving,
  isDark,
}: Props) {
  const heroClass = isDark
    ? 'border-slate-800 bg-slate-900 text-slate-100 shadow-black/20'
    : 'border-cyan-100 bg-linear-to-br from-sky-800 via-cyan-700 to-teal-600 text-white shadow-2xl shadow-cyan-100/50';
  const contentClass = isDark
    ? 'border-slate-800 bg-slate-900/90 shadow-black/20'
    : 'border-slate-200 bg-white/90 shadow-xl shadow-slate-200/70';

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className={`overflow-hidden rounded-4xl border ${heroClass}`}>
        <div className="p-8 sm:p-10">
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            {selected ? 'Editar alumno' : 'Agregar alumno'}
          </h1>
          <button
            type="button"
            onClick={onBack}
            className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-semibold text-sky-700 transition hover:bg-cyan-50"
          >
            Volver al listado
          </button>
        </div>
      </section>

      <section className={`rounded-4xl border p-6 backdrop-blur sm:p-8 ${contentClass}`}>
        <AlumnoForm
          selected={selected}
          onSubmit={onSubmit}
          onClear={onBack}
          isSaving={isSaving}
          isDark={isDark}
        />
      </section>
    </main>
  );
}
