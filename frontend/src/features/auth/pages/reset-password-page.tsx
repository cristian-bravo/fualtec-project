import { Formik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { authApi } from "../../../lib/api/auth-api";
import { useToast } from "../../../components/toast-context";
import { resetSchema } from "../validators/reset-schema";
import { ResetPasswordForm } from "../components/reset/ResetPasswordForm";
import type { ResetValues } from "../types/reset";

export const ResetPasswordPage = () => {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const email = params.get("email") || "";
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const isInvalid = !token || !email;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden px-6 py-12">
      <div className="pointer-events-none absolute -left-24 top-0 h-[130%] w-[55%] -skew-x-6 rounded-tr-[48px] rounded-br-[48px] bg-[#0A1F44]" />
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 800" className="h-full w-full">
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
          <path
            d="M0 260 Q300 120 600 260 T1200 260"
            fill="none"
            stroke="url(#g1)"
            strokeWidth="2"
          />
          <path
            d="M0 520 Q300 680 600 520 T1200 520"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl md:grid-cols-2">
        <div className="relative hidden items-center justify-center bg-gradient-to-br from-white via-white to-slate-50 p-10 md:flex">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="resetBadge" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0A1F44" />
                    <stop offset="100%" stopColor="#0A7CC4" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="44" fill="url(#resetBadge)" />
                <g transform="translate(30 24)" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M30 6c-10 10-16 20-16 30a16 16 0 0 0 32 0c0-10-6-20-16-30z" />
                  <path d="M22 40c2 3 5 5 8 6" />
                </g>
                <g transform="translate(22 68)" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round">
                  <path d="M8 6h64" />
                  <path d="M8 18h64" />
                  <path d="M8 30h42" />
                  
                </g>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Restablecer acceso
              </p>
              <h2 className="mt-1 text-xl font-bold text-[#0A1F44]">
                Proteja su cuenta
              </h2>
            </div>
          </div>

          <div className="pointer-events-none absolute right-[-48px] top-0 h-full w-24 rounded-l-full bg-[#0A1F44]" />
        </div>

        <div className="relative flex flex-col bg-white p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0A1F44]/70">
            Portal seguro
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#0A1F44]">
            {isInvalid ? "Enlace inválido" : "Restablecer contraseña"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {isInvalid
              ? "El enlace de recuperación no es válido. Solicite un nuevo enlace."
              : `Actualice el acceso para ${email}.`}
          </p>

          {isInvalid ? (
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/client-access/forgot"
                className="inline-flex items-center justify-center rounded-md bg-[#0A7CC4] px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#096aaa]"
              >
                Solicitar enlace
              </Link>
              <Link
                to="/client-access/login"
                className="text-center text-sm font-semibold text-[#0A7CC4] hover:underline"
              >
                Volver al inicio de sesión
              </Link>
            </div>
          ) : (
            <Formik<ResetValues>
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={resetSchema}
              onSubmit={async (values, actions) => {
                try {
                  await authApi.reset({ token, email, password: values.password });
                  showToast({
                    title: "contraseña actualizada",
                    description: "Ya puede ingresar con su nueva contraseña.",
                    tone: "success",
                  });
                  navigate("/client-access/login");
                } catch (error: any) {
                  showToast({
                    title: "No fue posible actualizar la contraseña",
                    description:
                      error?.response?.data?.message ||
                      "Verifique el enlace utilizado",
                    tone: "error",
                  });
                } finally {
                  actions.setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <ResetPasswordForm
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword((value) => !value)}
                  isSubmitting={isSubmitting}
                />
              )}
            </Formik>
          )}

          {!isInvalid && (
            <p className="mt-6 text-center text-sm text-slate-500">
              ¿Recordó su contraseña?{" "}
              <Link
                to="/client-access/login"
                className="text-[#0A7CC4] hover:underline"
              >
                Regresar al inicio de sesión
              </Link>
            </p>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-white/70 px-3 py-1 text-center text-xs font-semibold text-slate-800 backdrop-blur-sm">
        (c) {new Date().getFullYear()} Fualtec - Plataforma de acceso seguro
      </div>
    </div>
  );
};
