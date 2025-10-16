import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../../lib/api/auth-api';
import { useToast } from '../../../components/toast-context';

interface ResetValues {
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  password: yup
    .string()
    .min(8, 'Debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe incluir una letra mayúscula')
    .matches(/[a-z]/, 'Debe incluir una letra minúscula')
    .matches(/\d/, 'Debe incluir un número')
    .matches(/[^A-Za-z0-9]/, 'Debe incluir un carácter especial')
    .required('Ingrese una contraseña'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirme su contraseña')
});

export const ResetPasswordPage = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const { showToast } = useToast();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">Definir nueva contraseña</h1>
        <Formik<ResetValues>
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={schema}
          onSubmit={async (values, actions) => {
            if (!token) {
              showToast({
                title: 'Token inválido',
                description: 'Solicite nuevamente el restablecimiento.',
                tone: 'error'
              });
              actions.setSubmitting(false);
              return;
            }

            try {
              await authApi.reset({ token, password: values.password });
              showToast({
                title: 'Contraseña actualizada',
                description: 'Ya puede ingresar con su nueva contraseña.',
                tone: 'success'
              });
              navigate('/client-access/login');
            } catch (error) {
              showToast({
                title: 'No fue posible actualizar la contraseña',
                description: 'Verifique el enlace utilizado',
                tone: 'error'
              });
            } finally {
              actions.setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6 space-y-4 text-sm">
              <label className="flex flex-col gap-1 text-slate-700">
                <span className="font-semibold text-slate-900">Nueva contraseña</span>
                <Field
                  name="password"
                  type="password"
                  className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <ErrorMessage name="password" component="span" className="text-xs font-medium text-red-700" />
              </label>
              <label className="flex flex-col gap-1 text-slate-700">
                <span className="font-semibold text-slate-900">Confirmar contraseña</span>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <ErrorMessage name="confirmPassword" component="span" className="text-xs font-medium text-red-700" />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-60"
              >
                Actualizar contraseña
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Recordó su contraseña?{' '}
          <Link to="/client-access/login" className="text-primary hover:underline">
            Regresar al inicio de sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
