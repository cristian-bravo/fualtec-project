import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export const ClientProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">Perfil del cliente</h1>
        <p className="text-sm text-slate-600">
          Informacion general asociada a su cuenta. Para actualizaciones, solicite
          el cambio al administrador.
        </p>
      </div>

      <Card title="Datos principales">
        <dl className="grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Nombre</dt>
            <dd className="text-sm font-semibold text-slate-900">
              {user?.nombre || "-"}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Correo</dt>
            <dd className="text-sm font-semibold text-slate-900">
              {user?.email || "-"}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Cedula</dt>
            <dd className="text-sm font-semibold text-slate-900">
              {user?.cedula ?? "No registrada"}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Estado</dt>
            <dd className="text-sm font-semibold text-slate-900">
              {user?.estado || "-"}
            </dd>
          </div>
        </dl>
      </Card>

      <Card
        title="Actualizacion de contrasena"
        description="Solicite una actualizacion de credenciales."
      >
        <p className="text-sm text-slate-600">
          Por seguridad, el restablecimiento se gestiona desde la seccion "Olvide
          mi contrasena". Asegurese de tener acceso al correo corporativo registrado.
        </p>
        <Link to="/client-access/forgot" className="inline-block mt-4">
          <Button>Solicitar cambio</Button>
        </Link>
      </Card>
    </div>
  );
};
