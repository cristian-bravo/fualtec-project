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

  if (!token || !email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl text-center">
          <h1 className="text-xl font-bold text-slate-900">Enlace invalido</h1>
          <p className="mt-2 text-sm text-slate-600">
            El enlace de recuperacion no es valido. Solicite un nuevo enlace.
          </p>
          <Link
            to="/client-access/forgot"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
          >
            Solicitar enlace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">Definir nueva contrasena</h1>
        <p className="mt-1 text-sm text-slate-600">Actualice el acceso para {email}.</p>
        <Formik<ResetValues>
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={resetSchema}
          onSubmit={async (values, actions) => {
            try {
              await authApi.reset({ token, email, password: values.password });
              showToast({
                title: "Contrasena actualizada",
                description: "Ya puede ingresar con su nueva contrasena.",
                tone: "success",
              });
              navigate("/client-access/login");
            } catch (error: any) {
              showToast({
                title: "No fue posible actualizar la contrasena",
                description: error?.response?.data?.message || "Verifique el enlace utilizado",
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
        <p className="mt-6 text-center text-sm text-slate-500">
          Recordo su contrasena?{" "}
          <Link to="/client-access/login" className="text-primary hover:underline">
            Regresar al inicio de sesion
          </Link>
        </p>
      </div>
    </div>
  );
};
