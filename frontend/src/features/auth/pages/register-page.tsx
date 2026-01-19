import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { authApi } from "../../../lib/api/auth-api";
import { useToast } from "../../../components/toast-context";
import { useCaptcha } from "../hooks/use-captcha";
import { registerSchema } from "../validators/register-schema";
import { RegisterForm } from "../components/register/RegisterForm";
import { RegisterHero } from "../components/register/RegisterHero";
import { RegisterSuccess } from "../components/register/RegisterSuccess";
import type { RegisterValues } from "../types/register";

export const RegisterPage = () => {
  const { showToast } = useToast();
  const [sent, setSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { captcha, loading: captchaLoading, refresh } = useCaptcha();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0A1F44] overflow-hidden px-6 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(0,115,255,0.14),transparent_70%),radial-gradient(circle_at_82%_72%,rgba(255,0,80,0.10),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 800" className="h-full w-full">
          <path d="M0 260 Q300 140 600 260 T1200 260" fill="none" stroke="#7dd3fc" strokeWidth="2" />
          <path d="M0 560 Q300 680 600 560 T1200 560" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
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
        aria-label="Volver al inicio de sesión"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        Volver
      </Link> */}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-0 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <RegisterHero />

          <div className="lg:col-span-5 flex">
            <div className="m-auto w-full rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 md:p-8 shadow-2xl text-slate-100">
              {sent ? (
                <RegisterSuccess />
              ) : (
                <Formik<RegisterValues>
                  initialValues={{
                    nombre: "",
                    email: "",
                    cedula: "",
                    password: "",
                    confirmPassword: "",
                    captcha_token: "",
                    captcha_answer: "",
                  }}
                  validationSchema={registerSchema}
                  onSubmit={async (values, actions) => {
                    try {
                      await authApi.register({
                        nombre: values.nombre,
                        email: values.email,
                        cedula: values.cedula,
                        password: values.password,
                        captcha_token: values.captcha_token,
                        captcha_answer: values.captcha_answer,
                      });
                      showToast({
                        title: "Registro enviado",
                        description: "Revisa tu correo para verificar la dirección.",
                        tone: "success",
                      });
                      setSent(true);
                      actions.resetForm();
                    } catch (error: any) {
                      const errors = error?.response?.data?.errors as
                        | Record<string, string[]>
                        | undefined;

                      if (errors) {
                        Object.entries(errors).forEach(([field, messages]) => {
                          if (Array.isArray(messages) && messages[0]) {
                            actions.setFieldError(
                              field as keyof RegisterValues,
                              messages[0]
                            );
                          }
                        });
                      }

                      const message =
                        errors?.email?.[0] ||
                        errors?.cedula?.[0] ||
                        error?.response?.data?.message ||
                        "Intente nuevamente o contacte a soporte.";

                      showToast({
                        title: "No se pudo completar el registro",
                        description: message,
                        tone: "error",
                      });
                      refresh();
                    } finally {
                      actions.setSubmitting(false);
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <RegisterForm
                      showPassword={showPassword}
                      onTogglePassword={() => setShowPassword((s) => !s)}
                      captchaToken={captcha.token}
                      captchaQuestion={captcha.question || "Resuelva el captcha"}
                      onReloadCaptcha={refresh}
                      isCaptchaLoading={captchaLoading}
                      isSubmitting={isSubmitting}
                    />
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs text-slate-300/80">
        (c) {new Date().getFullYear()} Fualtec - Plataforma de acceso seguro
      </div>
    </div>
  );
};
