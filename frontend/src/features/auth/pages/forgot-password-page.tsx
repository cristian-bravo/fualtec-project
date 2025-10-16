import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { authApi } from '../../../lib/api/auth-api';
import { useToast } from '../../../components/toast-context';

interface ForgotValues {
  email: string;
}

const schema = yup.object({
  email: yup.string().email('Correo inválido').required('Ingrese su correo')
});

export const ForgotPasswordPage = () => {
  const { showToast } = useToast();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">Recuperar contraseña</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enviaremos un enlace de restablecimiento a su correo corporativo registrado.
        </p>
        <Formik<ForgotValues>
          initialValues={{ email: '' }}
          validationSchema={schema}
          onSubmit={async (values, actions) => {
            try {
              await authApi.forgot(values);
              showToast({
                title: 'Solicitud enviada',
                description: 'Revise su bandeja de entrada para continuar.',
                tone: 'success'
              });
              actions.resetForm();
            } catch (error) {
              showToast({
                title: 'No fue posible procesar la solicitud',
                description: 'Verifique el correo ingresado',
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
                <span className="font-semibold text-slate-900">Correo corporativo</span>
                <Field
                  name="email"
                  type="email"
                  className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <ErrorMessage name="email" component="span" className="text-xs font-medium text-red-700" />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-60"
              >
                Enviar enlace
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Ya la recibió?{' '}
          <Link to="/client-access/login" className="text-primary hover:underline">
            Regresar al inicio de sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
