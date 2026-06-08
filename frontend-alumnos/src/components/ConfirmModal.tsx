import Modal from './Modal';

interface Props {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDark: boolean;
}

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  isDark,
}: Props) {
  return (
    <Modal title={title} description={message} onClose={onCancel} isDark={isDark}>
      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className={`rounded-full border px-5 py-3 text-sm font-medium transition ${isDark ? 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  );
}
