import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { Alumno } from '../services/alumnoService';

const alumnoSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellido: z
    .string()
    .trim()
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().trim().email('Ingresa un email valido'),
  telefono: z.string().trim().min(7, 'El telefono es obligatorio'),
  curso: z.string().trim().min(2, 'El curso es obligatorio'),
});

type FormValues = z.infer<typeof alumnoSchema>;

interface Props {
  selected: Alumno | null;
  onSubmit: (data: Alumno) => void;
  onClear: () => void;
  isSaving?: boolean;
  isDark: boolean;
}

const empty: FormValues = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  curso: '',
};

function toFormValues(alumno: Alumno | null): FormValues {
  if (!alumno) return empty;
  return {
    nombre: alumno.nombre ?? '',
    apellido: alumno.apellido ?? '',
    email: alumno.email ?? '',
    telefono: alumno.telefono ?? '',
    curso: alumno.curso ?? '',
  };
}

export default function AlumnoForm({
  selected,
  onSubmit,
  onClear,
  isSaving = false,
  isDark,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(alumnoSchema),
    mode: 'onChange',
    defaultValues: empty,
  });

  useEffect(() => {
    reset(toFormValues(selected));
  }, [reset, selected]);

  const submit = (values: FormValues) => {
    onSubmit(values);
  };

  const panelClass = isDark
    ? 'border-slate-800 bg-slate-900 shadow-black/20'
    : 'border-cyan-100 bg-linear-to-br from-white via-sky-50 to-indigo-50 shadow-lg shadow-slate-200/70';
  const inputClass = isDark
    ? 'border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-500'
    : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400';

  return (
    <div className={`rounded-[1.75rem] border p-7 sm:p-8 ${panelClass}`}>
      <div className="mb-6 space-y-2">
        <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
          Formulario
        </span>
        <h2 className={`text-2xl font-black tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          {selected ? 'Editar Alumno' : 'Agregar Alumno'}
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {(['nombre', 'apellido', 'email', 'telefono', 'curso'] as const).map(
          (field) => (
            <div key={field} className="flex flex-col gap-1">
              <label className={`text-sm font-semibold capitalize ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {field}
              </label>
              <input
                {...register(field)}
                placeholder={`Ingresa ${field}`}
                className={`rounded-xl border px-4 py-3 text-base transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 ${inputClass}`}
              />
              {errors[field] ? (
                <p className="text-xs font-medium text-rose-600">
                  {errors[field]?.message}
                </p>
              ) : null}
            </div>
          ),
        )}
        <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row sm:items-end sm:gap-4 lg:col-span-3">
          <button
            type="submit"
            disabled={isSaving || !isValid}
            className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving
              ? 'Guardando...'
              : selected
                ? 'Guardar cambios'
                : 'Guardar alumno'}
          </button>
          <button
            type="button"
            onClick={() => {
              reset(empty);
              onClear();
            }}
            className={`inline-flex items-center justify-center rounded-xl border px-6 py-3 text-base font-medium transition ${isDark ? 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800' : 'border-cyan-200 bg-white text-slate-700 hover:bg-cyan-50'}`}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}
