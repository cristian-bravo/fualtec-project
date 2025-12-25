import { useAdminDashboard } from "../hooks/useAdminDashboard";

const formatCount = (value?: number | null) =>
  typeof value === "number" ? value.toLocaleString("es-EC") : "--";

const formatBytes = (value?: number | null, decimals = 0) => {
  if (typeof value !== "number") return "--";
  if (value === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const base = 1000;
  const index = Math.min(
    units.length - 1,
    Math.floor(Math.log(value) / Math.log(base))
  );
  const scaled = value / Math.pow(base, index);
  const formatter = new Intl.NumberFormat("es-EC", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${formatter.format(scaled)} ${units[index]}`;
};

const toneClasses: Record<string, string> = {
  blue: "border-l-blue-600 text-blue-600",
  emerald: "border-l-emerald-600 text-emerald-600",
  amber: "border-l-amber-500 text-amber-600",
  slate: "border-l-slate-400 text-slate-500",
};

type MetricCardProps = {
  label: string;
  value: string;
  description: string;
  tone: keyof typeof toneClasses;
};

const MetricCard = ({ label, value, description, tone }: MetricCardProps) => (
  <div
    className={`rounded-lg border border-slate-200 border-l-4 bg-white p-5 shadow-sm ${toneClasses[tone]}`}
  >
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    <p className="mt-1 text-xs text-slate-500">{description}</p>
  </div>
);

export const AdminDashboardPage = () => {
  const { isAuthenticated, stats, isLoading } = useAdminDashboard();
  const baselineUsedBytes = 1_500_000_000;
  const usedBytes =
    typeof stats?.storage_used_bytes === "number"
      ? stats.storage_used_bytes + baselineUsedBytes
      : baselineUsedBytes;
  const limitBytes = stats?.storage_limit_bytes ?? 50_000_000_000;
  const remainingBytes = Math.max(0, limitBytes - usedBytes);
  const usagePercent =
    limitBytes > 0 ? Math.min(100, (usedBytes / limitBytes) * 100) : 0;

  if (!isAuthenticated) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Debe iniciar sesion para ver el panel.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Panel de control</h1>
        <p className="text-sm text-slate-600">
          Supervise usuarios, contenido publicado y uso del almacenamiento.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Usuarios
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            label="Usuarios totales"
            value={formatCount(stats?.total_users)}
            description="Todos los accesos registrados en el portal."
            tone="blue"
          />
          <MetricCard
            label="Usuarios aprobados"
            value={formatCount(stats?.approved_users)}
            description="Cuentas habilitadas para ingresar."
            tone="emerald"
          />
          <MetricCard
            label="Por aprobar"
            value={formatCount(stats?.pending_users)}
            description="Solicitudes pendientes de revision."
            tone="amber"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Contenido
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <MetricCard
            label="PDFs subidos"
            value={formatCount(stats?.pdf_count)}
            description="Documentos almacenados en el repositorio."
            tone="blue"
          />
          <MetricCard
            label="Grupos creados"
            value={formatCount(stats?.group_count)}
            description="Paquetes configurados para publicaciones."
            tone="slate"
          />
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Almacenamiento utilizado
            </h3>
            <p className="text-xs text-slate-500">Maximo permitido: 50 GB.</p>
          </div>
          <div className="text-right text-sm text-slate-600">
            <p>
              {formatBytes(usedBytes, 2)} usados de {formatBytes(limitBytes, 2)}
            </p>
            <p className="text-xs text-slate-500">
              Restante: {formatBytes(remainingBytes, 2)}
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all"
            style={{ width: `${usagePercent}%` }}
          />
        </div>
        {isLoading && (
          <p className="mt-3 text-xs text-slate-400">
            Actualizando indicadores...
          </p>
        )}
      </div>
    </div>
  );
};
