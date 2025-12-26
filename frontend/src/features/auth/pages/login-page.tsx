import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import { useToast } from '../../../components/toast-context';
import { useEffect, useRef, useState } from 'react';
import loginImg from "../../../assets/images/register/login.webp";
import { Tooltip } from '../../../components/ui/tooltip';


interface LoginValues {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('Correo inválido').required('Ingrese su correo'),
  password: yup.string().required('Ingrese su contraseña'),
});

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: Location } };
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const reloadTimerRef = useRef<number | null>(null);

  const clearReloadTimer = () => {
    if (reloadTimerRef.current) {
      window.clearTimeout(reloadTimerRef.current);
      reloadTimerRef.current = null;
    }
  };

  const scheduleReload = () => {
    clearReloadTimer();
    reloadTimerRef.current = window.setTimeout(() => {
      reloadTimerRef.current = null;
      if (window.location.pathname.includes('/client-access/login')) {
        window.location.reload();
      }
    }, 60000);
  };

  useEffect(() => clearReloadTimer, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0A1F44] overflow-hidden px-6 py-12">
      {/* Gradientes de fondo suaves */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,115,255,0.14),transparent_70%),radial-gradient(circle_at_80%_70%,rgba(255,0,80,0.10),transparent_60%)]" />
      {/* Líneas decorativas sutiles */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 800" className="h-full w-full">
          <path d="M0 300 Q300 150 600 300 T1200 300" fill="none" stroke="#7dd3fc" strokeWidth="2" />
          <path d="M0 500 Q300 650 600 500 T1200 500" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
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

      {/* Card glass */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Panel de imagen ( identidad petrolera) */}
              <div
                className="relative hidden md:block bg-cover bg-center "
                style={{ backgroundImage: `url(${loginImg})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
              </div>


          {/* Formulario */}
          <div className="p-8 md:p-10 text-slate-100">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">Portal seguro</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Acceso al portal</h1>
            <p className="mt-1 text-sm text-slate-300">
              Ingrese sus credenciales corporativas para continuar.
            </p>

            <Formik<LoginValues>
              initialValues={{ email: '', password: '' }}
              validationSchema={schema}
              onSubmit={async (values, actions) => {
                try {
                  await login(values.email, values.password);
                  clearReloadTimer();
                  showToast({ title: 'Inicio de sesión exitoso', tone: 'success' });
                  const redirect = (location.state?.from as any)?.pathname ?? '/client-access/app';
                  navigate(redirect, { replace: true });
                } catch (error: any) {
                  const message = error?.response?.data?.message as
                    | string
                    | undefined;
                  const normalized = message?.toLowerCase() ?? '';

                  if (normalized.includes('deshabilitada')) {
                    showToast({
                      title: 'Cuenta deshabilitada',
                      description: 'Consulte con administracion.',
                      tone: 'error',
                    });
                  } else if (normalized.includes('pendiente')) {
                    showToast({
                      title: 'Cuenta pendiente de aprobacion',
                      description: 'Espere la aprobacion del administrador.',
                      tone: 'error',
                    });
                  } else if (normalized.includes('no verificado')) {
                    showToast({
                      title: 'Correo no verificado',
                      description: 'Revise su correo para verificar la cuenta.',
                      tone: 'error',
                    });
                  } else {
                    showToast({
                      title: 'Credenciales invalidas',
                      description: 'Revise los datos ingresados',
                      tone: 'error',
                    });
                  }

                  scheduleReload();
                } finally {
                  actions.setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="mt-6 space-y-5 text-sm">
                  {/* Email */}
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-white">Correo electrónico</span>
                    <Field
                      name="email"
                      type="email"
                      autoComplete="username"
                      placeholder="usuario@empresa.com"
                      className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-slate-300 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                    />
                    <ErrorMessage name="email" component="span" className="text-xs font-medium text-red-300" />
                  </label>

                  {/* Password */}
                  <label className="flex flex-col gap-1">
                    <span className="font-semibold text-white">Contraseña</span>
                    <div className="relative">
                      <Field
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="********"
                        className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 pr-10 text-white placeholder-slate-300 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Tooltip content={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}>
                          <button
                            type="button"
                            aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                            onClick={() => setShowPassword((s) => !s)}
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

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-60"
                  >
                    Ingresar
                  </button>
                </Form>
              )}
            </Formik>

            {/* Links inferiores */}
            <div className="mt-6 space-y-2 text-center text-sm">
              <Link to="/client-access/forgot" className="text-blue-300 hover:text-blue-200 hover:underline">
                Olvidé mi contraseña
              </Link>
              <p className="text-slate-300">
                ¿Aún no tiene acceso?{' '}
                <Link to="/client-access/register" className="text-blue-300 hover:text-blue-200 hover:underline">
                  Solicitar registro
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Créditos (opcional) */}
      <div className="absolute bottom-4 text-center text-xs text-slate-300/80">
        © {new Date().getFullYear()} Fualtec - Plataforma de acceso seguro
      </div>
    </div>
  );
};

