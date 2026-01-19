import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authApi } from "@/lib/api/auth-api";
import logoDark from "@/assets/images/logo/fualtec-dark.webp";

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
    <div className="relative min-h-screen flex items-center justify-center bg-[#0A1F44] overflow-hidden px-6 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(0,115,255,0.14),transparent_70%),radial-gradient(circle_at_82%_72%,rgba(255,0,80,0.10),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 800" className="h-full w-full">
          <path d="M0 260 Q300 140 600 260 T1200 260" fill="none" stroke="#7dd3fc" strokeWidth="2" />
          <path d="M0 560 Q300 680 600 560 T1200 560" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-2xl text-center text-slate-100">
        <img src={logoDark} alt="Fualtec" className="mx-auto mb-4 h-16 w-auto" />
        {status === "loading" && (
          <>
            <h1 className="text-xl font-bold text-white">Verificando correo</h1>
            <p className="mt-2 text-sm text-slate-300">Espere un momento...</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-xl font-bold text-white">Correo verificado</h1>
            <p className="mt-2 text-sm text-slate-300">
              Tu correo fue confirmado. Ahora espera la aprobación del administrador.
            </p>
            <Link
              to="/client-access/login"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
            >
              Ir al inicio de sesión
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-xl font-bold text-white">Enlace inválido</h1>
            <p className="mt-2 text-sm text-slate-300">
              El enlace de verificación no es válido o ya expiró.
            </p>
            <Link
              to="/client-access/register"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
            >
              Crear cuenta
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
