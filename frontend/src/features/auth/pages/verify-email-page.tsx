import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authApi } from "@/lib/api/auth-api";

type Status = "loading" | "success" | "error";

export const VerifyEmailPage = () => {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        return;
      }
      try {
        await authApi.verifyEmail(token);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl text-center">
        {status === "loading" && (
          <>
            <h1 className="text-xl font-bold text-slate-900">Verificando correo</h1>
            <p className="mt-2 text-sm text-slate-600">Espere un momento...</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-xl font-bold text-slate-900">Correo verificado</h1>
            <p className="mt-2 text-sm text-slate-600">
              Tu correo fue confirmado. Ahora espera la aprobacion del administrador.
            </p>
            <Link
              to="/client-access/login"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
            >
              Ir al inicio de sesion
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-xl font-bold text-slate-900">Enlace invalido</h1>
            <p className="mt-2 text-sm text-slate-600">
              El enlace de verificacion no es valido o ya expiro.
            </p>
            <Link
              to="/client-access/register"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
            >
              Crear cuenta
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
