import { Formik, Form, Field } from 'formik';
import type { FormikConfig } from 'formik';
import { Tooltip } from '../../../components/ui/tooltip';
import { SatisfactionFormValues } from '../hooks/use-satisfaction-form';

type SatisfactionFormSectionProps = {
  formikConfig: FormikConfig<SatisfactionFormValues>;
  submitted: boolean;
  submitError: string | null;
  loading: boolean;
};

type RatingKey = 'p1' | 'p2' | 'p3' | 'p4' | 'p5';

const QUESTIONS: Array<{ name: RatingKey; label: string }> = [
  {
    name: 'p1',
    label: '1. Los servicios entregados cumplieron con tus expectativas y estándares?',
  },
  {
    name: 'p2',
    label: '2. ¿Cómo calificarías nuestra capacidad para resolver problemas y responder a tus necesidades?',
  },
  {
    name: 'p3',
    label: '3. ¿Cómo calificarías el profesionalismo y competencia técnica de nuestro personal?',
  },
  {
    name: 'p4',
    label: '4. Que tan satisfecho estas con la rapidez de nuestra respuesta a consultas?',
  },
  {
    name: 'p5',
    label: '5. Que tan satisfecho estas con las medidas de seguridad en el servicio?',
  },
];

const STAR_SCALE = [1, 2, 3, 4, 5];

export const SatisfactionFormSection = ({
  formikConfig,
  submitted,
  submitError,
  loading,
}: SatisfactionFormSectionProps) => (
  <div className="lg:col-span-2">
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Evalúa tu experiencia
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Tu opinión es valiosa para seguir elevando la calidad de nuestro servicio.
          </p>
        </div>
        <div className="hidden sm:flex select-none items-center justify-center rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
          <span className="text-[11px] font-semibold tracking-wider text-slate-600">
            ISO QA
          </span>
        </div>
      </div>

      {submitted && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 text-center">
          Gracias. Tu evaluación fue enviada correctamente.
        </div>
      )}

      <Formik<SatisfactionFormValues> {...formikConfig}>
        {({ isSubmitting, setFieldValue, values, errors, touched }) => (
          <Form className="mt-8 space-y-8 text-sm">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-800">
                  Nombre completo
                </label>
                <Tooltip content={touched.nombre ? errors.nombre : undefined} className="w-full">
                  <Field
                    name="nombre"
                    className={`mt-1 w-full rounded-lg border bg-white px-3 py-2 shadow-sm focus:ring ${
                      touched.nombre && errors.nombre
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                    }`}
                  />
                </Tooltip>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-800">
                  Correo electrónico
                </label>
                <Tooltip content={touched.email ? errors.email : undefined} className="w-full">
                  <Field
                    name="email"
                    type="email"
                    className={`mt-1 w-full rounded-lg border bg-white px-3 py-2 shadow-sm focus:ring ${
                      touched.email && errors.email
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                    }`}
                  />
                </Tooltip>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-800">
                  Servicio recibido
                </label>
                <Tooltip content={touched.servicio ? errors.servicio : undefined} className="w-full">
                  <Field
                    as="select"
                    name="servicio"
                    className={`mt-1 w-full rounded-lg border bg-white px-3 py-2 shadow-sm focus:ring ${
                      touched.servicio && errors.servicio
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                    }`}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="inspección">inspección integral</option>
                    <option value="integridad">Integridad de ductos</option>
                    <option value="auditoria">Auditoría operativa</option>
                  </Field>
                </Tooltip>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Califica la calidad de nuestros servicios.
              </h3>
            </div>

            <div className="space-y-6">
              {QUESTIONS.map((question) => {
                const ratingError =
                  touched[question.name] && errors[question.name]
                    ? (errors[question.name] as string)
                    : undefined;
                return (
                <div key={question.name}>
                  <Tooltip content={ratingError} align="start">
                    <label className="block text-sm font-medium text-slate-800 mb-2">
                      {question.label}
                    </label>
                  </Tooltip>

                  <div className="flex items-center gap-2">
                    {STAR_SCALE.map((level) => {
                      const active = level <= values[question.name];
                      return (
                        <button
                          key={`${question.name}-${level}`}
                          type="button"
                          onClick={() => setFieldValue(question.name, level)}
                          className={`group inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 transition ${
                            active
                              ? 'bg-[#0A1F44]/15 ring-[#0A1F44]'
                              : 'bg-slate-50 ring-slate-200 hover:bg-slate-100 hover:ring-[#0A1F44]/40'
                          }`}
                          aria-label={`Calificación ${level} de 5`}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className={`${
                              active
                                ? 'text-[#0A1F44]'
                                : 'text-slate-400 group-hover:text-[#0A1F44]/70'
                            }`}
                          >
                            <path
                              fill="currentColor"
                              d="m12 17.27 5.18 3.05-1.64-5.63L20 10.9l-5.73-.49L12 5 9.73 10.41 4 10.9l4.46 3.79-1.64 5.63L12 17.27Z"
                            />
                          </svg>
                        </button>
                      );
                    })}
                  </div>

                  <div className="sr-only">
                    {STAR_SCALE.map((n) => (
                      <label key={`${question.name}-radio-${n}`}>
                        <Field type="radio" name={question.name} value={String(n)} />
                        {n}
                      </label>
                    ))}
                  </div>

                </div>
              );
              })}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-800">
                6. Que aspectos podríamos mejorar para aumentar tu satisfacción?
              </label>
              <Tooltip content={touched.comentarios ? errors.comentarios : undefined} className="w-full">
                <Field
                  as="textarea"
                  name="comentarios"
                  rows={4}
                  className={`mt-1 w-full rounded-lg border bg-white px-3 py-2 shadow-sm focus:ring ${
                    touched.comentarios && errors.comentarios
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                  }`}
                  placeholder="Escribe aquí tus sugerencias o comentarios"
                />
              </Tooltip>
              <p className="mt-2 text-[11px] text-slate-500">Max. 500 caracteres</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-800">
                7. Si deseas, deja un mensaje final o recomendación personal
              </label>
              <Tooltip
                content={touched.mensajeFinal ? errors.mensajeFinal : undefined}
                className="w-full"
              >
                <Field
                  as="textarea"
                  name="mensajeFinal"
                  rows={3}
                  className={`mt-1 w-full rounded-lg border bg-white px-3 py-2 shadow-sm focus:ring ${
                    touched.mensajeFinal && errors.mensajeFinal
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                  }`}
                  placeholder="Siempre leemos cada comentario que recibimos."
                />
              </Tooltip>
            </div>

            <Tooltip content={submitError}>
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-70"
              >
                {loading || isSubmitting ? 'Enviando...' : 'Enviar evaluación'}
              </button>
            </Tooltip>

            <p className="text-xs text-slate-500">
              Siempre leemos cada comentario que recibimos. Tu opinión es parte de nuestro crecimiento.
            </p>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);
