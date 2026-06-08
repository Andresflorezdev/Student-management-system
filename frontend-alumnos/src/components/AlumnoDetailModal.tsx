import type { Alumno } from '../services/alumnoService';
import Modal from './Modal';

interface Props {
  alumno: Alumno;
  onClose: () => void;
  isDark: boolean;
}

function formatDate(value?: string) {
  if (!value) return 'Sin fecha';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function AlumnoDetailModal({ alumno, onClose, isDark }: Props) {
  return (
    <Modal
      title="Detalle del alumno"
      description={`${alumno.nombre} ${alumno.apellido}`}
      onClose={onClose}
      isDark={isDark}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ['Nombre', alumno.nombre],
          ['Apellido', alumno.apellido],
          ['Email', alumno.email],
          ['Telefono', alumno.telefono],
          ['Curso', alumno.curso],
          ['Registrado', formatDate(alumno.creadoEn)],
        ].map(([label, value]) => (
          <div
            key={label as string}
            className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {label}
            </p>
            <p className={`mt-2 text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
}
