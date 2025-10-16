import { useState } from 'react';
import { Table } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import { Modal } from '../../../components/ui/modal';

const groups = [
  { id: 1, name: 'Publicación Operativa Q1', periodo: '2024-Q1', publicado: true },
  { id: 2, name: 'Documentos auditoría costa afuera', periodo: '2024-Q2', publicado: false }
];

export const AdminGroupsPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Grupos de publicaciones</h1>
          <p className="text-sm text-slate-600">
            Cree agrupaciones de PDFs y programe la publicación para distintos clientes o segmentos.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>Nuevo grupo</Button>
      </div>
      <Table headers={["Nombre", "Periodo", "Estado", "Acciones"]}>
        {groups.map((group) => (
          <tr key={group.id}>
            <td className="px-6 py-4 font-semibold text-slate-900">{group.name}</td>
            <td className="px-6 py-4 text-slate-600">{group.periodo}</td>
            <td className="px-6 py-4">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                group.publicado ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
              }`}>
                {group.publicado ? 'Publicado' : 'Borrador'}
              </span>
            </td>
            <td className="px-6 py-4 space-x-3">
              <Button variant="secondary">Gestionar PDFs</Button>
              <Button variant="ghost">Publicar</Button>
            </td>
          </tr>
        ))}
      </Table>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Crear nuevo grupo"
        description="Defina nombre y periodo del paquete de documentos."
        actions={<Button>Guardar</Button>}
      >
        <div className="space-y-4 text-sm">
          <label className="flex flex-col gap-1 text-slate-700">
            <span className="font-semibold text-slate-900">Nombre</span>
            <input className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </label>
          <label className="flex flex-col gap-1 text-slate-700">
            <span className="font-semibold text-slate-900">Periodo</span>
            <input className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </label>
        </div>
      </Modal>
    </div>
  );
};
