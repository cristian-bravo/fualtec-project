import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { useToast } from '../../../components/toast-context';
import { publicFormsService } from '../services/publicFormsService';

interface SatisfactionValues {
  nombre: string;
  email: string;
  servicio: string;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  p5: number;
  comentarios: string;
  mensajeFinal?: string;
}

const parseNum = () =>
  yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? NaN : Number(originalValue)))
    .min(1)
    .max(5)
    .required('Requerido');

const schema = yup.object({
  nombre: yup.string().required('Ingrese su nombre'),
  email: yup.string().email('Correo invalido').required('Ingrese un correo'),
  servicio: yup.string().required('Seleccione un servicio'),
  p1: parseNum(),
  p2: parseNum(),
  p3: parseNum(),
  p4: parseNum(),
  p5: parseNum(),
  comentarios: yup.string().max(500, 'Maximo 500 caracteres'),
  mensajeFinal: yup.string().max(500, 'Maximo 500 caracteres').optional(),
});

const STAR_SCALE = [1, 2, 3, 4, 5];

export const SatisfactionPage = () => {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (values: SatisfactionValues, actions: FormikHelpers<SatisfactionValues>) => {
    setSubmitError(null);
    try {
      await publicFormsService.submitSatisfaction({
        nombre: values.nombre,
        email: values.email,
        servicio: values.servicio,
        p1: values.p1,
        p2: values.p2,
        p3: values.p3,
        p4: values.p4,
        p5: values.p5,
        comentarios: values.comentarios || null,
        mensaje_final: values.mensajeFinal || null,
      });

      setSubmitted(true);
      actions.resetForm();
      showToast({
        title: 'Evaluacion enviada',
        description: 'Gracias por compartir tu experiencia.',
        tone: 'success',
      });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        Object.values(err?.response?.data?.errors || {})?.[0]?.[0] ||
        'No se pudo enviar la evaluacion.';
      setSubmitError(message);
      showToast({
        title: 'No se pudo enviar',
        description: message,
        tone: 'error',
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0A1F44]">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(80rem_40rem_at_-10%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(60rem_30rem_at_110%_-10%,rgba(16,185,129,0.12),transparent)]" />

      <div className="relative mx-auto w-full max-w-[90rem] px-8 pt-16 pb-10">
        <header className="max-w-3xl text-center mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200 mb-4">
            Tu voz importa
          </p>
          <h1 className="relative inline-block text-4xl md:text-5xl font-bold text-white leading-tight">
            Queremos saber tu experiencia
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-28 rounded-full bg-gradient-to-r from-[#8B0000] to-blue-400 mt-2 animate-pulse" />
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-200 leading-relaxed">
            Agradecemos que te tomes unos minutos para contarnos como te fue.
            Cada comentario nos ayuda a mejorar dia a dia.
          </p>
        </header>
      </div>

      <div className="relative bg-white">
        <div className="h-[3px] w-full bg-gradient-to-r from-[#8B0000] via-[#0A1F44] to-blue-400 opacity-70" />
        <div className="mx-auto w-full max-w-[90rem] px-8 py-14">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Evalua tu experiencia
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                      Tu opinion es valiosa para seguir elevando la calidad de nuestro servicio.
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
                    Gracias. Tu evaluacion fue enviada correctamente.
                  </div>
                )}

                {submitError && (
                  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </div>
                )}

                <Formik<SatisfactionValues>
                  initialValues={{
                    nombre: '',
                    email: '',
                    servicio: '',
                    p1: 3,
                    p2: 3,
                    p3: 3,
                    p4: 3,
                    p5: 3,
                    comentarios: '',
                    mensajeFinal: '',
                  }}
                  validationSchema={schema}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="mt-8 space-y-8 text-sm">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-800">Nombre completo</label>
                          <Field
                            name="nombre"
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                          />
                          <ErrorMessage name="nombre" component="p" className="mt-1 text-xs text-red-600" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-800">Correo corporativo</label>
                          <Field
                            name="email"
                            type="email"
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                          />
                          <ErrorMessage name="email" component="p" className="mt-1 text-xs text-red-600" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-slate-800">Servicio recibido</label>
                          <Field
                            as="select"
                            name="servicio"
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                          >
                            <option value="">Seleccione una opcion</option>
                            <option value="inspeccion">Inspeccion integral</option>
                            <option value="integridad">Integridad de ductos</option>
                            <option value="auditoria">Auditoria operativa</option>
                          </Field>
                          <ErrorMessage name="servicio" component="p" className="mt-1 text-xs text-red-600" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          Califica la calidad de nuestros servicios.
                        </h3>
                      </div>

                      <div className="space-y-6">
                        {[
                          {
                            name: 'p1',
                            label:
                              '1. Los servicios entregados cumplieron con tus expectativas y estandares?',
                          },
                          {
                            name: 'p2',
                            label:
                              '2. Como calificarias nuestra capacidad para resolver problemas y responder a tus necesidades?',
                          },
                          {
                            name: 'p3',
                            label:
                              '3. Como calificarias el profesionalismo y competencia tecnica de nuestro personal?',
                          },
                          {
                            name: 'p4',
                            label:
                              '4. Que tan satisfecho estas con la rapidez de nuestra respuesta a consultas?',
                          },
                          {
                            name: 'p5',
                            label:
                              '5. Que tan satisfecho estas con las medidas de seguridad en el servicio?',
                          },
                        ].map((q) => (
                          <div key={q.name}>
                            <label className="block text-sm font-medium text-slate-800 mb-2">
                              {q.label}
                            </label>

                            <div className="flex items-center gap-2">
                              {STAR_SCALE.map((level) => {
                                const active = level <= (values[q.name as keyof SatisfactionValues] as number);
                                return (
                                  <button
                                    key={`${q.name}-${level}`}
                                    type="button"
                                    onClick={() => setFieldValue(q.name, level)}
                                    className={`group inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 transition
                                      ${active
                                        ? 'bg-[#0A1F44]/15 ring-[#0A1F44]'
                                        : 'bg-slate-50 ring-slate-200 hover:bg-slate-100 hover:ring-[#0A1F44]/40'
                                      }`}
                                    aria-label={`Calificacion ${level} de 5`}
                                  >
                                    <svg
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      aria-hidden="true"
                                      className={`${active ? 'text-[#0A1F44]' : 'text-slate-400 group-hover:text-[#0A1F44]/70'}`}
                                    >
                                      <path fill="currentColor" d="m12 17.27 5.18 3.05-1.64-5.63L20 10.9l-5.73-.49L12 5 9.73 10.41 4 10.9l4.46 3.79-1.64 5.63L12 17.27Z"/>
                                    </svg>
                                  </button>
                                );
                              })}
                            </div>

                            <div className="sr-only">
                              {STAR_SCALE.map((n) => (
                                <label key={`${q.name}-radio-${n}`}>
                                  <Field type="radio" name={q.name} value={String(n)} />
                                  {n}
                                </label>
                              ))}
                            </div>

                            <ErrorMessage name={q.name} component="p" className="mt-1 text-xs text-red-600" />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-800">
                          6. Que aspectos podriamos mejorar para aumentar tu satisfaccion?
                        </label>
                        <Field
                          as="textarea"
                          name="comentarios"
                          rows={4}
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                          placeholder="Escribe aqui tus sugerencias o comentarios"
                        />
                        <ErrorMessage name="comentarios" component="p" className="mt-1 text-xs text-red-600" />
                        <p className="mt-2 text-[11px] text-slate-500">Max. 500 caracteres</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-800">
                          7. Si deseas, deja un mensaje final o recomendacion personal
                        </label>
                        <Field
                          as="textarea"
                          name="mensajeFinal"
                          rows={3}
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                          placeholder="Siempre leemos cada comentario que recibimos."
                        />
                        <ErrorMessage name="mensajeFinal" component="p" className="mt-1 text-xs text-red-600" />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-70"
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar evaluacion'}
                      </button>

                      <p className="text-xs text-slate-500">
                        Siempre leemos cada comentario que recibimos. Tu opinion es parte de nuestro crecimiento.
                      </p>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-sm font-semibold text-slate-900">Gracias por compartir</h3>
                <p className="mt-3 text-sm text-slate-700">
                  Tu experiencia es valiosa. Leemos cada comentario para tomar mejores decisiones.
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  Pequenas mejoras generan grandes resultados con el tiempo.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h4 className="text-sm font-semibold text-slate-900">Te respondemos pronto</h4>
                <p className="mt-2 text-sm text-slate-700">
                  Si dejaste tu correo, nos pondremos en contacto a la brevedad.
                </p>
                <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
                  <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-[#8B0000] to-blue-500" />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h4 className="text-sm font-semibold text-slate-900">Necesitas algo ahora mismo?</h4>
                <p className="mt-2 text-sm text-slate-700">
                  Si es urgente, escribenos por WhatsApp o envianos un correo.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href="https://wa.me/593984567890"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white bg-[#0A1F44] hover:opacity-95"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="mailto:contacto@fualtec.com?subject=Soporte"
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#0A1F44] bg-slate-100 hover:bg-slate-200"
                  >
                    Correo
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

