import { useEffect } from "react";
import { ErrorMessage, Field, Form, useFormikContext } from "formik";
import { Link } from "react-router-dom";
import { CaptchaCard } from "../captcha-card";
import { Tooltip } from "../../../../components/ui/tooltip";
import type { RegisterValues } from "../../types/register";

type Props = {
  showPassword: boolean;
  onTogglePassword: () => void;
  captchaToken: string;
  captchaQuestion: string;
  onReloadCaptcha: () => void;
  isCaptchaLoading?: boolean;
  isSubmitting?: boolean;
};

export const RegisterForm = ({
  showPassword,
  onTogglePassword,
  captchaToken,
  captchaQuestion,
  onReloadCaptcha,
  isCaptchaLoading,
  isSubmitting,
}: Props) => {
  const { setFieldValue } = useFormikContext<RegisterValues>();

  useEffect(() => {
    if (captchaToken) {
      setFieldValue("captcha_token", captchaToken);
    }
  }, [captchaToken, setFieldValue]);

  return (
    <Form className="grid gap-4 text-sm">
      <label className="flex flex-col gap-1">
        <span className="font-semibold text-white">Nombre completo</span>
        <Field
          name="nombre"
          placeholder="Nombre y apellidos"
          className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-slate-300 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
        />
        <ErrorMessage name="nombre" component="span" className="text-xs font-medium text-red-300" />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-semibold text-white">Correo electrónico</span>
        <Field
          name="email"
          type="email"
          placeholder="usuario@empresa.com"
          autoComplete="username"
          className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-slate-300 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
        />
        <ErrorMessage name="email" component="span" className="text-xs font-medium text-red-300" />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-semibold text-white">Cédula o RUC</span>
        <Field
          name="cedula"
          placeholder="0102030405"
          inputMode="numeric"
          className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-slate-300 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
        />
        <ErrorMessage name="cedula" component="span" className="text-xs font-medium text-red-300" />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-semibold text-white">Contrasena</span>
        <div className="relative">
          <Field
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            autoComplete="new-password"
            className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 pr-10 text-white placeholder-slate-300 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Tooltip
              content={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
            >
              <button
                type="button"
                onClick={onTogglePassword}
                aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
                className="rounded p-1 text-slate-300 transition hover:text-white"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 6.5C7 6.5 2.73 9.61 1 14c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 9.61 17 6.5 12 6.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5a5 5 0 010 10z" />
                    <circle cx="12" cy="14" r="3" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 6.5C7 6.5 2.73 9.61 1 14c.55 1.4 1.37 2.67 2.39 3.78l-1.61 1.61 1.41 1.41 18-18-1.41-1.41-2.46 2.46C15.64 7.02 13.87 6.5 12 6.5zM12 21.5c5 0 9.27-3.11 11-7.5-.7-1.76-1.86-3.29-3.31-4.5l-2.16 2.16a5 5 0 01-6.87 6.87l-2.1 2.1c1.01.53 2.11.87 3.44.87z" />
                  </svg>
                )}
              </button>
            </Tooltip>
          </div>
        </div>
        <ErrorMessage name="password" component="span" className="text-xs font-medium text-red-300" />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-semibold text-white">Confirmar contrasena</span>
        <Field
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="********"
          autoComplete="new-password"
          className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-slate-300 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
        />
        <ErrorMessage name="confirmPassword" component="span" className="text-xs font-medium text-red-300" />
      </label>

      <CaptchaCard
        question={captchaQuestion}
        answerName="captcha_answer"
        onReload={onReloadCaptcha}
        isLoading={isCaptchaLoading}
        containerClassName="border-white/20 bg-white/5"
        labelClassName="text-white"
        inputClassName="border-white/20 bg-white/10 text-white placeholder-white/60 focus:border-blue-400 focus:ring-blue-400/30"
        errorClassName="text-red-400"
      />

      <p className="text-xs text-slate-300/90">
        Al registrarse, acepta nuestra politica de privacidad y el tratamiento de datos conforme a la normativa vigente.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-blue-600 px-4 py-3 font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-60"
      >
        Crear cuenta
      </button>

      <p className="text-center text-sm text-slate-300">
        Ya tiene una cuenta?{" "}
        <Link to="/client-access/login" className="text-blue-300 hover:text-blue-200 hover:underline">
          Ingresar
        </Link>
      </p>
    </Form>
  );
};
