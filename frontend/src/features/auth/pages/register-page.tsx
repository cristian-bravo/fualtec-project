import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { authApi } from '../../../lib/api/auth-api';
import { useToast } from '../../../components/toast-context';

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
    .matches(/^[VEJPG]-?\d{5,10}$/i, 'Utilice el formato V-12345678')
    .required('Ingrese su cédula'),
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
    .required('Confirme su contraseña')
});

export const RegisterPage = () => {
  const { showToast } = useToast();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-12">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-10 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">Solicitud de acceso</h1>
        <p className="mt-2 text-sm text-slate-600">
          Complete el formulario y un administrador validará su información antes de otorgar acceso al portal.
        </p>
        <Formik<RegisterValues>
          initialValues={{ nombre: '', email: '', cedula: '', password: '', confirmPassword: '' }}
          validationSchema={schema}
          onSubmit={async (values, actions) => {
            try {
              await authApi.register({
                nombre: values.nombre,
                email: values.email,
                cedula: values.cedula,
                password: values.password
              });
              showToast({
                title: 'Registro enviado',
                description: 'Le notificaremos cuando su cuenta sea aprobada.',
                tone: 'success'
              });
              actions.resetForm();
            } catch (error) {
              showToast({
                title: 'No se pudo completar el registro',
                description: 'Intente nuevamente o contacte a soporte.',
                tone: 'error'
              });
            } finally {
              actions.setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Nombre completo</span>
                <Field
                  name="nombre"
                  className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <ErrorMessage name="nombre" component="span" className="text-xs font-medium text-red-700" />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Correo corporativo</span>
                <Field
                  name="email"
                  type="email"
                  className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <ErrorMessage name="email" component="span" className="text-xs font-medium text-red-700" />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Cédula / RIF</span>
                <Field
                  name="cedula"
                  className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <ErrorMessage name="cedula" component="span" className="text-xs font-medium text-red-700" />
              </label>
              <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Contraseña</span>
                  <Field
                    name="password"
                    type="password"
                    className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <ErrorMessage name="password" component="span" className="text-xs font-medium text-red-700" />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Confirmar contraseña</span>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <ErrorMessage name="confirmPassword" component="span" className="text-xs font-medium text-red-700" />
                </label>
              </div>
              <p className="md:col-span-2 text-xs text-slate-500">
                Al enviar, acepta nuestra política de privacidad y el tratamiento de datos conforme a la normativa vigente.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="md:col-span-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-60"
              >
                Solicitar aprobación
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Ya tiene una cuenta?{' '}
          <Link to="/client-access/login" className="text-primary hover:underline">
            Ingrese aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
