import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { authApi } from "../../../lib/api/auth-api";
import { useToast } from "../../../components/toast-context";
import { useCaptcha } from "../hooks/use-captcha";
import { CaptchaCard } from "../components/captcha-card";

interface ForgotValues {
  email: string;
  captcha_token: string;
  captcha_answer: string;
}

const CaptchaTokenSync = ({ token }: { token: string }) => {
  const { values, setFieldValue } = useFormikContext<ForgotValues>();

  useEffect(() => {
    if (token && values.captcha_token !== token) {
      setFieldValue("captcha_token", token, false);
    }
  }, [setFieldValue, token, values.captcha_token]);

  return null;
};

const schema = yup.object({
  email: yup.string().email("Correo inválido").required("Ingrese su correo"),
  captcha_token: yup.string().required("Complete el captcha"),
  captcha_answer: yup.string().required("Complete el captcha"),
});

export const ForgotPasswordPage = () => {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const { captcha, loading: captchaLoading, refresh } = useCaptcha();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-0 h-[130%] w-[55%] -skew-x-6 rounded-tr-[48px] rounded-br-[48px] bg-[#0A1F44]" />

      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 800" className="h-full w-full">
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
          <path d="M0 260 Q300 120 600 260 T1200 260" fill="none" stroke="url(#g1)" strokeWidth="2" />
          <path d="M0 520 Q300 680 600 520 T1200 520" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
        </svg>
      </div>
      {/* Botón de volver a la página principal */}
      <Link
        to="/"
        title="Ir a la página principal"
        aria-label="Ir a la página principal"
        className="absolute left-11 top-11 z-20
                  inline-flex items-center justify-center
                  rounded-full
                  border border-white/30
                  bg-white/15
                  p-3
                  text-white/80
                  backdrop-blur
                  transition
                  hover:bg-white/25 hover:text-white"
      >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="scale-125"
            >

          <path d="M10.707 2.293a1 1 0 0 1 1.414 0l9 9a1 1 0 0 1-1.414 1.414L19 11.828V20a1 1 0 0 1-1 1h-4v-5h-4v5H6a1 1 0 0 1-1-1v-8.172l-.707.879A1 1 0 0 1 2.879 11.293l9-9z" />
        </svg>
      </Link>
      {/* <Link
        to="/client-access/login"
        title="Volver al inicio de sesión"
        className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-full border border-[#FFC107]/70 bg-transparent px-3 py-2 text-[#FFC107] transition hover:bg-[#FFC107]/10"

      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        <span className="text-sm font-semibold">Volver</span>
      </Link> */}

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl md:grid-cols-2">
        <div className="relative hidden items-center justify-center bg-white p-10 md:flex">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow">
              <svg width="120" height="120" viewBox="0 0 64 64">
                <path d="M32 6c6 4 12 6 18 7v15c0 11-8 20-18 24-10-4-18-13-18-24V13c6-1 12-3 18-7z" fill="#0A1F44" />
                <circle cx="32" cy="32" r="12" fill="white" />
                <path d="M26 33l4 4 8-9" stroke="#22C55E" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Seguridad</p>
              <h2 className="mt-1 text-xl font-bold text-[#0A1F44]">Recuperar clave</h2>
            </div>
          </div>

          <div className="pointer-events-none absolute right-[-48px] top-0 h-full w-24 rounded-l-full bg-[#0A1F44]" />
        </div>

        <div className="relative bg-white p-8 md:p-10 flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0A1F44]/70">Portal seguro</p>
          <h1 className="mt-2 text-3xl font-bold text-[#0A1F44]">Recuperar contraseña</h1>
          <p className="mt-1 text-sm text-slate-600">
            Ingrese su correo electrónico. Le enviaremos un enlace para restablecer su acceso.
          </p>

          <Formik<ForgotValues>
            initialValues={{ email: "", captcha_token: "", captcha_answer: "" }}
            validationSchema={schema}
            onSubmit={async (values, actions) => {
              try {
                setSubmitting(true);
                await authApi.forgot(values);
                actions.resetForm();
                showToast({
                  title: "Solicitud enviada",
                  description: "Revise su bandeja de entrada para continuar.",
                  tone: "success",
                });
              } catch (error: any) {
                const message =
                  error?.response?.data?.errors?.email?.[0] ||
                  error?.response?.data?.message ||
                  "Verifique el correo ingresado";
                showToast({
                  title: "No fue posible procesar la solicitud",
                  description: message,
                  tone: "error",
                });
                refresh();
              } finally {
                setSubmitting(false);
                actions.setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
                <Form className="mt-6 flex flex-1 flex-col gap-5 text-sm">
                  <CaptchaTokenSync token={captcha.token} />
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-[#0A1F44]">Correo electrónico</span>
                    <Field
                      name="email"
                      type="email"
                      autoComplete="username"
                      placeholder="usuario@empresa.com"
                      className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-[#0A7CC4] focus:ring-2 focus:ring-[#0A7CC4]/20"
                    />
                    <ErrorMessage name="email" component="span" className="text-xs font-medium text-red-600" />
                  </label>

                  <CaptchaCard
                    question={captcha.question || "Resuelva el captcha"}
                    answerName="captcha_answer"
                    onReload={refresh}
                    isLoading={captchaLoading}
                    containerClassName="w-full border-slate-300 bg-white p-0"
                    headerClassName="pt-3"
                    errorClassName="px-3 pb-3 text-red-600"
                    inputClassName="mb-3"
                  />

                  <div className="flex items-center justify-between">
                    <Link
                      to="/client-access/login"
                      className="inline-flex items-center gap-2 rounded-md border border-[#0A7CC4] px-3 py-2 text-[#0A7CC4] transition hover:bg-[#0A7CC4] hover:text-white"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                      </svg>
                      Volver
                    </Link>

                    <button
                      type="submit"
                      disabled={isSubmitting || submitting}
                      className="inline-flex items-center justify-center rounded-md bg-[#0A7CC4] px-4 py-2 font-semibold text-white shadow transition hover:bg-[#096aaa] disabled:opacity-60"
                    >
                      Enviar enlace
                    </button>
                  </div>
                </Form>
            )}
          </Formik>


        </div>
      </div>

    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-white/70 px-3 py-1 text-center text-xs font-semibold text-slate-800 backdrop-blur-sm">
      (c) {new Date().getFullYear()} Fualtec - Plataforma de acceso seguro
    </div>

    </div>
  );
};
