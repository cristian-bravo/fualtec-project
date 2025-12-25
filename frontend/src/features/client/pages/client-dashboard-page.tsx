import { useEffect, useMemo, useState } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { useClientDashboard } from "../hooks/useClientDashboard";

const formatDateTime = (value?: string | null) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("es-EC", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const formatDate = (value: Date) =>
  value.toLocaleDateString("es-EC", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const formatTime = (value: Date) =>
  value.toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
  });

type StatCardProps = {
  label: string;
  value: string;
  description: string;
};

const StatCard = ({ label, value, description }: StatCardProps) => (
  <Card>
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    <p className="mt-2 text-xs text-slate-500">{description}</p>
  </Card>
);

export const ClientDashboardPage = () => {
  const { isAuthenticated, isLoading, user, publications, documents, latestPublication } =
    useClientDashboard();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => window.clearInterval(timer);
  }, []);

  const groupsCount = publications.length;
  const documentsCount = documents.length;

  const groupNames = useMemo(() => {
    return publications
      .map((item) => item.group?.name)
      .filter(Boolean)
      .slice(0, 3);
  }, [publications]);

  if (!isAuthenticated) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Debe iniciar sesion para revisar sus publicaciones.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resumen general</h1>
          <p className="text-sm text-slate-600">
            Informacion relevante de los grupos publicados a su nombre.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge tone="success">Estado: Aprobado</Badge>
          {/* <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {formatTime(now)}
          </div> */}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Usuario activo
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{user?.nombre}</p>
          <p className="mt-2 text-xs text-slate-500">{formatDate(now)}</p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Ultima publicacion
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-900">
            {latestPublication?.group?.name ?? "Sin publicaciones"}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            {formatDateTime(latestPublication?.published_at)}
          </p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Estado del servicio
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-900">
            {isLoading ? "Actualizando" : "Operativo"}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Supervisado por Fualtec NDT.
          </p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          label="Grupos asignados"
          value={groupsCount.toString()}
          description={
            groupNames.length
              ? `Ultimos grupos: ${groupNames.join(", ")}`
              : "Aun no se han publicado grupos a su nombre."
          }
        />
        <StatCard
          label="PDFs asignados"
          value={documentsCount.toString()}
          description="Documentacion disponible para descarga."
        />
      </div>

      <Card title="Recordatorio de seguridad" description="Proteccion y uso responsable.">
        <p>
          Mantenga sus credenciales seguras y evite compartir enlaces de descarga.
          Cada acceso queda registrado con trazabilidad completa y auditoria.
        </p>
      </Card>
    </div>
  );
};
