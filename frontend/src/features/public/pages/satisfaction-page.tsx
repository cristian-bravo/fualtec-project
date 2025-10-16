import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

interface SatisfactionValues {
  nombre: string;
  email: string;
  servicio: string;
  satisfaccion: number;
  comentarios: string;
}

const schema = yup.object({
  nombre: yup.string().required('Ingrese su nombre'),
  email: yup.string().email('Correo inválido').required('Ingrese un correo'),
  servicio: yup.string().required('Seleccione un servicio'),
  satisfaccion: yup.number().min(1).max(5).required('Califique su satisfacción'),
  comentarios: yup.string().max(500, 'Máximo 500 caracteres')
});

const satisfactionLevels = [1, 2, 3, 4, 5];

export const SatisfactionPage = () => (
  <section className="mx-auto w-full max-w-3xl px-6 py-16">
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900">Formulario de satisfacción</h2>
      <p className="mt-3 text-sm text-slate-600">
        Su opinión impulsa nuestras mejoras continuas y asegura la calidad de cada proyecto.
      </p>
      <Formik<SatisfactionValues>
        initialValues={{ nombre: '', email: '', servicio: '', satisfaccion: 3, comentarios: '' }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          console.info('Satisfaction form', values);
          actions.resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-8 space-y-5 text-sm">
            <label className="flex flex-col gap-1 text-slate-700">
              <span className="font-semibold text-slate-900">Nombre completo</span>
              <Field
                name="nombre"
                className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <ErrorMessage name="nombre" component="span" className="text-xs font-medium text-red-700" />
            </label>
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
              <span className="font-semibold text-slate-900">Servicio recibido</span>
              <Field
                as="select"
                name="servicio"
                className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Seleccione una opción</option>
                <option value="inspeccion">Inspección integral</option>
                <option value="integridad">Integridad de ductos</option>
                <option value="auditoria">Auditoría operativa</option>
              </Field>
              <ErrorMessage name="servicio" component="span" className="text-xs font-medium text-red-700" />
            </label>
            <div className="space-y-2">
              <span className="font-semibold text-slate-900">Nivel de satisfacción</span>
              <div className="flex items-center gap-3">
                {satisfactionLevels.map((level) => (
                  <label key={level} className="flex items-center gap-2 text-slate-700">
                    <Field type="radio" name="satisfaccion" value={level} className="text-primary" />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage name="satisfaccion" component="span" className="text-xs font-medium text-red-700" />
            </div>
            <label className="flex flex-col gap-1 text-slate-700">
              <span className="font-semibold text-slate-900">Comentarios adicionales</span>
              <Field
                as="textarea"
                name="comentarios"
                rows={4}
                className="rounded-md border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <ErrorMessage name="comentarios" component="span" className="text-xs font-medium text-red-700" />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-60"
            >
              Enviar evaluación
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </section>
);
