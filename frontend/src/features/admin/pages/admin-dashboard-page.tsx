import { Card } from '../../../components/ui/card';

const metrics = [
  { title: 'Registros pendientes', value: '4 cuentas', description: 'Usuarios en estado pendiente de aprobación.' },
  { title: 'PDFs vigentes', value: '36 archivos', description: 'Documentos publicados y disponibles para clientes.' },
  { title: 'Descargas últimos 30 días', value: '82 eventos', description: 'Accesos registrados en la auditoría.' }
];

export const AdminDashboardPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Panel de control</h1>
      <p className="text-sm text-slate-600">
        Supervise la actividad del portal y mantenga actualizados los accesos a documentación crítica.
      </p>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.title} title={metric.title} description={metric.description}>
          <p className="text-xl font-semibold text-slate-900">{metric.value}</p>
        </Card>
      ))}
    </div>
  </div>
);
