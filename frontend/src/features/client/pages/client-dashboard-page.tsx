import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

const highlights = [
  {
    title: 'Última publicación',
    value: 'Plan de inspección Q2 2024',
    meta: 'Publicado el 08/03/2024'
  },
  {
    title: 'Documentos vigentes',
    value: '12 activos',
    meta: 'Incluye reportes de integridad'
  },
  {
    title: 'Descargas del mes',
    value: '5 registros',
    meta: 'Cédula auditada'
  }
];

export const ClientDashboardPage = () => (
  <div className="space-y-6">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Resumen general</h1>
        <p className="text-sm text-slate-600">Información relevante de las publicaciones asignadas a su empresa.</p>
      </div>
      <Badge tone="success">Estado: Aprobado</Badge>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {highlights.map((item) => (
        <Card key={item.title} title={item.title} description={item.meta}>
          <p className="text-xl font-semibold text-slate-900">{item.value}</p>
        </Card>
      ))}
    </div>
    <Card title="Recordatorio" description="Sus credenciales son personales e intransferibles.">
      <p>
        Utilizamos marcas de agua personalizadas y registro de descargas para proteger su información. Cada descarga queda asociada a su cédula y dirección IP.
      </p>
    </Card>
  </div>
);
