import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import { useToast } from '../../../components/toast-context';

interface LoginValues {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('Correo inválido').required('Ingrese su correo'),
  password: yup.string().required('Ingrese su contraseña')
});

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: Location } };
  const { showToast } = useToast();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">Acceso al portal</h1>
        <p className="mt-2 text-sm text-slate-600">Ingrese sus credenciales corporativas para continuar.</p>
        <Formik<LoginValues>
          initialValues={{ email: '', password: '' }}
          validationSchema={schema}
          onSubmit={async (values, actions) => {
            try {
              await login(values.email, values.password);
              showToast({ title: 'Inicio de sesión exitoso', tone: 'success' });
              const redirect = location.state?.from?.pathname ?? '/client-access/app';
              navigate(redirect, { replace: true });
            } catch (error) {
              showToast({ title: 'Credenciales inválidas', description: 'Revise los datos ingresados', tone: 'error' });
            } finally {
              actions.setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6 space-y-4 text-sm">
              <label className="flex flex-col gap-1 text-slate-700">
                <span className="font-semibold text-slate-900">Correo corporativo</span>
                <Field
                  name="email"
                  type="email"
                  className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <ErrorMessage name="email" component="span" className="text-xs font-medium text-red-700" />
              </label>
              <label className="flex flex-col gap-1 text-slate-700">
                <span className="font-semibold text-slate-900">Contraseña</span>
                <Field
                  name="password"
                  type="password"
                  className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <ErrorMessage name="password" component="span" className="text-xs font-medium text-red-700" />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-60"
              >
                Ingresar
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-6 space-y-2 text-center text-sm">
          <Link to="/client-access/forgot" className="text-primary hover:underline">
            Olvidé mi contraseña
          </Link>
          <p className="text-slate-500">
            ¿Aún no tiene acceso?{' '}
            <Link to="/client-access/register" className="text-primary hover:underline">
              Solicitar registro
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
