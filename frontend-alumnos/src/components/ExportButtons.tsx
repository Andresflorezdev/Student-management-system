import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Alumno } from '../services/alumnoService';

interface Props {
  alumnos: Alumno[];
  isDark: boolean;
}

export default function ExportButtons({ alumnos, isDark }: Props) {
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(alumnos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Alumnos');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buf]), 'alumnos.xlsx');
  };

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(alumnos);
    const csv = XLSX.utils.sheet_to_csv(ws);
    saveAs(new Blob([csv], { type: 'text/csv' }), 'alumnos.csv');
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text('Gestion de Alumnos', 14, 16);

    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`Generado el ${new Date().toLocaleDateString('es-CO')}`, 14, 23);

    autoTable(doc, {
      startY: 28,
      head: [['ID', 'Nombre', 'Apellido', 'Email', 'Telefono', 'Curso']],
      body: alumnos.map((a) => [
        a.id ?? '',
        a.nombre,
        a.apellido,
        a.email,
        a.telefono,
        a.curso,
      ]),
      headStyles: {
        fillColor: [79, 70, 229],
        textColor: 225,
        fontSize: 9,
        fontStyle: 'bold',
      },
      bodyStyles: { fontSize: 8, textColor: 50 },
      alternateRowStyles: { fillColor: [245, 245, 255] },
      styles: { cellPadding: 3 },
    });

    doc.save('alumnos.pdf');
  };

  const excelClass = isDark
    ? 'bg-emerald-500 hover:bg-emerald-400'
    : 'bg-emerald-600 hover:bg-emerald-500';
  const csvClass = isDark
    ? 'bg-sky-500 hover:bg-sky-400'
    : 'bg-sky-600 hover:bg-sky-500';
  const pdfClass = isDark
    ? 'bg-rose-500 hover:bg-rose-400'
    : 'bg-rose-600 hover:bg-rose-500';

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={exportExcel}
        className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition ${excelClass}`}
      >
        Exportar Excel
      </button>
      <button
        type="button"
        onClick={exportCSV}
        className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition ${csvClass}`}
      >
        Exportar CSV
      </button>
      <button
        type="button"
        onClick={exportPDF}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition shadow-sm ${pdfClass}`}
      >
        Exportar PDF
      </button>
    </div>
  );
}
