import { useState, DragEvent } from 'react';
import { Table } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';

const pdfs = [
  { id: 1, title: 'Manual de integridad', categoria: 'Integridad', version: 'v2.1', vigente: true },
  { id: 2, title: 'Plan de contingencia offshore', categoria: 'HSE', version: 'v1.4', vigente: true }
];

export const AdminPdfsPage = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    console.info('Archivos cargados', event.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de PDFs</h1>
          <p className="text-sm text-slate-600">
            Suba archivos PDF y asigne versiones, categorías y destinatarios antes de publicarlos.
          </p>
        </div>
        <div
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className={`flex h-40 items-center justify-center rounded-xl border-2 border-dashed ${
            isDragging ? 'border-primary bg-blue-50' : 'border-slate-300 bg-white'
          }`}
        >
          <p className="text-sm text-slate-600">
            Arrastre y suelte PDFs aquí o
            <button type="button" className="ml-1 text-primary underline">
              selecciónelos manualmente
            </button>
          </p>
        </div>
      </div>
      <Table headers={["Título", "Categoría", "Versión", "Estado", "Acciones"]}>
        {pdfs.map((pdf) => (
          <tr key={pdf.id}>
            <td className="px-6 py-4 font-semibold text-slate-900">{pdf.title}</td>
            <td className="px-6 py-4 text-slate-600">{pdf.categoria}</td>
            <td className="px-6 py-4 text-slate-600">{pdf.version}</td>
            <td className="px-6 py-4">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                pdf.vigente ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {pdf.vigente ? 'Vigente' : 'No vigente'}
              </span>
            </td>
            <td className="px-6 py-4 space-x-3">
              <Button variant="secondary">Asignar</Button>
              <Button variant="ghost">Ver detalles</Button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};
