import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { authApi } from '../../../lib/api/auth-api';
import { useToast } from '../../../components/toast-context';
import { useState } from 'react';

/* --- Validador cédula Ecuador --- */
function validarCedulaEcuatoriana(cedula: string): boolean {
  if (!/^\d{10}$/.test(cedula)) return false;
  const provincia = parseInt(cedula.slice(0, 2), 10);
  if (provincia < 1 || provincia > 24) return false;
  const d = cedula.split('').map(Number);
  const coef = [2,1,2,1,2,1,2,1,2];
  let suma = 0;
  for (let i = 0; i < 9; i++) {
    let prod = d[i] * coef[i];
    if (prod >= 10) prod -= 9;
    suma += prod;
  }
  const verificador = (Math.ceil(suma / 10) * 10 - suma) % 10;
  return verificador === d[9];
}

interface RegisterValues {
  nombre: string;
  email: string;
  cedula: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  nombre: yup.string().required('Ingrese su nombre completo'),
  email: yup.string().email('Correo inválido').required('Ingrese un correo corporativo'),
  cedula: yup
    .string()
    .required('Ingrese su cédula')
    .test('cedula-ec', 'Cédula ecuatoriana inválida (10 dígitos)', (v) => !!v && validarCedulaEcuatoriana(v)),
  password: yup
    .string()
    .min(8, 'Debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe incluir una letra mayúscula')
    .matches(/[a-z]/, 'Debe incluir una letra minúscula')
    .matches(/\d/, 'Debe incluir un número')
    .matches(/[^A-Za-z0-9]/, 'Debe incluir un carácter especial')
    .required('Ingrese una contraseña segura'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirme su contraseña'),
});

export const RegisterPage = () => {
  const { showToast } = useToast();
  const [sent, setSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0A1F44] overflow-hidden px-6 py-12">
      {/* Fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(0,115,255,0.14),transparent_70%),radial-gradient(circle_at_82%_72%,rgba(255,0,80,0.10),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 800" className="h-full w-full">
          <path d="M0 260 Q300 140 600 260 T1200 260" fill="none" stroke="#7dd3fc" strokeWidth="2" />
          <path d="M0 560 Q300 680 600 560 T1200 560" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Botón volver → Login (mismo estilo que olvidé contraseña) */}
      <Link
        to="/client-access/login"
        title="Volver al inicio de sesión"
        className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-md border border-[#FFC107] bg-[#FFC107] px-3 py-2 text-[#0A1F44] font-semibold shadow transition hover:bg-[#ffcf3a]"
        aria-label="Volver al inicio de sesión"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        Volver
      </Link>

      {/* Layout 7/5 (form centrado), texto izq NO centrado */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-0 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Panel izquierdo con imagen y texto alineado abajo-izquierda */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 lg:col-span-7">
            <img
              src="https://images.unsplash.com/photo-1542370285-4171b8048f9f?q=80&w=1600&auto=format&fit=crop"
              alt="Operaciones petroleras"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1F44]/85 via-[#0A1F44]/55 to-transparent" />
            <div className="absolute inset-0 flex items-end justify-start p-8 md:p-10">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200 text-center">Portal seguro</p>
                <h1 className="mt-2 mb-4 text-4xl font-extrabold text-white text-center">Registro</h1>
                <p className="mt-2 text-slate-100">
                  Crea tu cuenta corporativa. Un administrador validará tu información para habilitar el acceso.
                </p>
                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-200/90 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Descargas técnicas privadas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Auditorías y reportes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Comunicación con inspección
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Seguridad y cumplimiento
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formulario a la derecha (card centrada en su columna) */}
          <div className="lg:col-span-5 flex">
            <div className="m-auto w-full rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 md:p-8 shadow-2xl text-slate-100">
              {sent ? (
                <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" className="text-emerald-300" fill="currentColor">
                      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-emerald-200">Registro enviado</p>
                      <p className="text-sm text-emerald-100/90">
                        Tu cuenta fue registrada. <strong>Espera la aprobación del administrador</strong>. Te
                        notificaremos por correo cuando esté habilitada.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <Link to="/client-access/login" className="text-blue-300 hover:text-blue-200 hover:underline">
                      Ir al inicio de sesión
                    </Link>
                    <Link to="/" className="text-blue-300 hover:text-blue-200 hover:underline">
                      Volver al sitio
                    </Link>
                  </div>
                </div>
              ) : (
                <Formik<RegisterValues>
                  initialValues={{ nombre: '', email: '', cedula: '', password: '', confirmPassword: '' }}
                  validationSchema={schema}
                  onSubmit={async (values, actions) => {
                    try {
                      await authApi.register({
                        nombre: values.nombre,
                        email: values.email,
                        cedula: values.cedula,
                        password: values.password,
                      } as any);
                      showToast({
                        title: 'Registro enviado',
                        description: 'Espera la aprobación de un administrador.',
                        tone: 'success',
                      });
                      setSent(true);
                      actions.resetForm();
                    } catch {
                      showToast({
                        title: 'No se pudo completar el registro',
                        description: 'Intente nuevamente o contacte a soporte.',
                        tone: 'error',
                      });
                    } finally {
                      actions.setSubmitting(false);
                    }
                  }}
                >
                  {({ isSubmitting }) => (
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
                        <span className="font-semibold text-white">Correo corporativo</span>
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
                        <span className="font-semibold text-white">Cédula ecuatoriana</span>
                        <Field
                          name="cedula"
                          placeholder="0102030405"
                          inputMode="numeric"
                          className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-slate-300 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                        />
                        <ErrorMessage name="cedula" component="span" className="text-xs font-medium text-red-300" />
                      </label>

                      <label className="flex flex-col gap-1">
                        <span className="font-semibold text-white">Contraseña</span>
                        <div className="relative">
                          <Field
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            autoComplete="new-password"
                            className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 pr-10 text-white placeholder-slate-300 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-300 transition hover:text-white"
                          >
                            {showPassword ? (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6.5C7 6.5 2.73 9.61 1 14c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 9.61 17 6.5 12 6.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5a5 5 0 010 10z" /><circle cx="12" cy="14" r="3" /></svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6.5C7 6.5 2.73 9.61 1 14c.55 1.4 1.37 2.67 2.39 3.78l-1.61 1.61 1.41 1.41 18-18-1.41-1.41-2.46 2.46C15.64 7.02 13.87 6.5 12 6.5zM12 21.5c5 0 9.27-3.11 11-7.5-.7-1.76-1.86-3.29-3.31-4.5l-2.16 2.16a5 5 0 01-6.87 6.87l-2.1 2.1c1.01.53 2.11.87 3.44.87z" /></svg>
                            )}
                          </button>
                        </div>
                        <ErrorMessage name="password" component="span" className="text-xs font-medium text-red-300" />
                      </label>

                      <label className="flex flex-col gap-1">
                        <span className="font-semibold text-white">Confirmar contraseña</span>
                        <Field
                          name="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="********"
                          autoComplete="new-password"
                          className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-slate-300 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                        />
                        <ErrorMessage name="confirmPassword" component="span" className="text-xs font-medium text-red-300" />
                      </label>

                      <p className="text-xs text-slate-300/90">
                        Al registrarse, acepta nuestra política de privacidad y el tratamiento de datos conforme a la normativa vigente.
                      </p>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-md bg-blue-600 px-4 py-3 font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-60"
                      >
                        Crear cuenta
                      </button>

                      <p className="text-center text-sm text-slate-300">
                        ¿Ya tiene una cuenta?{' '}
                        <Link to="/client-access/login" className="text-blue-300 hover:text-blue-200 hover:underline">
                          Ingresar
                        </Link>
                      </p>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Créditos */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs text-slate-300/80">
        © {new Date().getFullYear()} Fualtec — Plataforma de acceso seguro
      </div>
    </div>
  );
};
