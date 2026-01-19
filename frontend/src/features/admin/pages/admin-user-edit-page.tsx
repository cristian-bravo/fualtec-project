import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAdminUser } from "../hooks/useAdminUser";
import {
  UserEditForm,
  UserFormValues,
} from "../components/users/UserEditForm";

const emptyValues: UserFormValues = {
  nombre: "",
  email: "",
  cedula: "",
  rol: "cliente",
  estado: "aprobado",
  password: "",
};

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

export const AdminUserEditPage = () => {
  const params = useParams();
  const userId = useMemo(() => Number(params.userId), [params.userId]);
  const { user, isLoading, isSaving, saveUser } = useAdminUser(
    Number.isFinite(userId) ? userId : undefined
  );
  const [values, setValues] = useState<UserFormValues>(emptyValues);

  useEffect(() => {
    if (!user) return;
    setValues({
      nombre: user.nombre ?? "",
      email: user.email ?? "",
      cedula: user.cedula ?? "",
      rol: (user.rol as UserFormValues["rol"]) ?? "cliente",
      estado:
        (user.estado as UserFormValues["estado"]) === "inactivo"
          ? "inactivo"
          : "aprobado",
      password: "",
    });
  }, [user]);

  const handleChange = (
    field: keyof UserFormValues,
    value: UserFormValues[keyof UserFormValues]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!user) return;
    const payload = {
      nombre: values.nombre.trim(),
      email: values.email.trim(),
      cedula: values.cedula.trim(),
      rol: values.rol,
      estado: values.estado,
      password: values.password.trim() || undefined,
    };
    const updated = await saveUser(payload);
    if (updated) {
      setValues((prev) => ({ ...prev, password: "" }));
    }
  };

  if (!Number.isFinite(userId)) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Usuario inválido.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Detalle de usuario
            </h1>
            <p className="text-sm text-slate-600">
              Actualice los datos del usuario aprobado.
            </p>
          </div>
          <Link to="/client-access/admin/usuarios">
            <Button variant="secondary">Volver</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          {isLoading && (
            <div className="py-10 text-center text-sm text-slate-500">
              Cargando usuario...
            </div>
          )}
          {!isLoading && !user && (
            <div className="py-10 text-center text-sm text-slate-500">
              No se encontró el usuario solicitado.
            </div>
          )}
          {!isLoading && user && (
            <UserEditForm
              values={values}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isSaving={isSaving}
            />
          )}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Información general
          </h2>
          <dl className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <dt className="font-medium text-slate-500">ID</dt>
              <dd className="text-slate-800">{user?.id ?? "-"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-medium text-slate-500">Estado actual</dt>
              <dd className="text-slate-800">
                {user?.estado === "inactivo" ? "Deshabilitado" : "Habilitado"}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-medium text-slate-500">Verificación</dt>
              <dd className="text-slate-800">
                {user?.email_verified_at ? "Verificado" : "Sin verificar"}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-medium text-slate-500">Creación</dt>
              <dd className="text-slate-800">
                {formatDate(user?.created_at)}
              </dd>
            </div>
            {/* <div className="flex items-center justify-between">
              <dt className="font-medium text-slate-500">Último acceso</dt>
              <dd className="text-slate-800">
                {formatDate(user?.last_login_at)}
              </dd>
            </div> */}
          </dl>
        </div>
      </div>
    </div>
  );
};
