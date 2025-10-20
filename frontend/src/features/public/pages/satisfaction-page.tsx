import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';

interface SatisfactionValues {
  nombre: string;
  email: string;
  servicio: string;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  p5: number;
  comentarios: string;     // p6
  mensajeFinal?: string;   // p7 opcional
}

/** === Config de envío === */
const ENDPOINT = '/api/satisfaction'; // <-- Cámbialo cuando tengas tu backend real
const AUTH_TOKEN = ''; // <-- Opcional: Bearer token si tu API lo requiere

function makePayload(v: SatisfactionValues) {
  const promedio = Number(((v.p1 + v.p2 + v.p3 + v.p4 + v.p5) / 5).toFixed(2));
  return {
    nombre: v.nombre,
    email: v.email,
    servicio: v.servicio,
    calificaciones: {
      calidad: v.p1,                   // p1
      resolucion_necesidades: v.p2,    // p2
      profesionalismo_tecnico: v.p3,   // p3
      rapidez_respuesta: v.p4,         // p4
      seguridad_en_servicio: v.p5,     // p5
      promedio,
    },
    comentarios: v.comentarios || null,     // p6
    mensaje_final: v.mensajeFinal || null,  // p7
    meta: {
      submittedAt: new Date().toISOString(),
      path: typeof window !== 'undefined' ? window.location.pathname : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      version: 1,
    },
  };
}
/** ======================= */

const parseNum = () =>
  yup
    .number()
    .transform((v, o) => (o === '' ? NaN : Number(o)))
    .min(1)
    .max(5)
    .required('Requerido');

const schema = yup.object({
  nombre: yup.string().required('Ingrese su nombre'),
  email: yup.string().email('Correo inválido').required('Ingrese un correo'),
  servicio: yup.string().required('Seleccione un servicio'),
  p1: parseNum(),
  p2: parseNum(),
  p3: parseNum(),
  p4: parseNum(),
  p5: parseNum(),
  comentarios: yup.string().max(500, 'Máximo 500 caracteres'),
  mensajeFinal: yup.string().max(500, 'Máximo 500 caracteres').optional(),
});

const STAR_SCALE = [1, 2, 3, 4, 5];

export const SatisfactionPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (values: SatisfactionValues, actions: FormikHelpers<SatisfactionValues>) => {
    setSubmitError(null);
    try {
      const payload = makePayload(values);

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(AUTH_TOKEN ? { Authorization: `Bearer ${AUTH_TOKEN}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Error ${res.status}`);
      }

      setSubmitted(true);
      actions.resetForm();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      setSubmitError(err?.message || 'No se pudo enviar la evaluación.');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0A1F44]">
      {/* Luces/gradientes de fondo del hero */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(80rem_40rem_at_-10%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(60rem_30rem_at_110%_-10%,rgba(16,185,129,0.12),transparent)]" />

      {/* Hero compacto */}
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
            Agradecemos que te tomes unos minutos para contarnos cómo te fue.
            Cada comentario nos ayuda a mejorar día a día.
          </p>
        </header>
      </div>

      {/* Sección clara con borde superior en gradiente para integración visual */}
      <div className="relative bg-white">
        <div className="h-[3px] w-full bg-gradient-to-r from-[#8B0000] via-[#0A1F44] to-blue-400 opacity-70" />
        <div className="mx-auto w-full max-w-[90rem] px-8 py-14">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Card principal del formulario */}
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
                  {/* Sello visual (no interactivo) */}
                  <div className="hidden sm:flex select-none items-center justify-center rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
                    <span className="text-[11px] font-semibold tracking-wider text-slate-600">
                      ISO • QA
                    </span>
                  </div>
                </div>

                {submitted && (
                  <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 text-center">
                    ¡Gracias! Tu evaluación fue enviada correctamente.
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
                      {/* Datos básicos */}
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
                            <option value="">Seleccione una opción</option>
                            <option value="inspeccion">Inspección integral</option>
                            <option value="integridad">Integridad de ductos</option>
                            <option value="auditoria">Auditoría operativa</option>
                          </Field>
                          <ErrorMessage name="servicio" component="p" className="mt-1 text-xs text-red-600" />
                        </div>
                      </div>

                      {/* Encabezado general para las preguntas */}
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          Califica la calidad de nuestros servicios.
                        </h3>
                      </div>

                      {/* Bloque de preguntas (p1–p5) con ESTRELLAS AZUL OSCURO */}
                      <div className="space-y-6">
                        {[
                          {
                            name: 'p1',
                            label:
                              '1. ¿Los servicios entregados cumplieron con tus expectativas y estándares?',
                          },
                          {
                            name: 'p2',
                            label:
                              '2. ¿Cómo calificarías nuestra capacidad para resolver problemas y responder a tus necesidades específicas?',
                          },
                          {
                            name: 'p3',
                            label:
                              '3. ¿Cómo calificarías el profesionalismo y competencia técnica de nuestro personal durante la inspección?',
                          },
                          {
                            name: 'p4',
                            label:
                              '4. ¿Qué tan satisfecho/a estás con la rapidez de nuestra respuesta a tus consultas y solicitudes?',
                          },
                          {
                            name: 'p5',
                            label:
                              '5. ¿Qué tan satisfecho/a estás con las medidas de seguridad implementadas durante nuestras inspecciones y servicios?',
                          },
                        ].map((q) => (
                          <div key={q.name}>
                            <label className="block text-sm font-medium text-slate-800 mb-2">
                              {q.label}
                            </label>

                            {/* Estrellas azul oscuro */}
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
                                    aria-label={`Calificación ${level} de 5 para ${q.name}`}
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

                            {/* Radios ocultos para accesibilidad/validación */}
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

                      {/* Comentarios (p6) */}
                      <div>
                        <label className="block text-sm font-medium text-slate-800">
                          6. ¿Qué aspectos podríamos mejorar para aumentar tu satisfacción?
                        </label>
                        <Field
                          as="textarea"
                          name="comentarios"
                          rows={4}
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                          placeholder="Escribe aquí tus sugerencias o comentarios…"
                        />
                        <ErrorMessage name="comentarios" component="p" className="mt-1 text-xs text-red-600" />
                        <p className="mt-2 text-[11px] text-slate-500">Máx. 500 caracteres</p>
                      </div>

                      {/* Mensaje final (p7 opcional) */}
                      <div>
                        <label className="block text-sm font-medium text-slate-800">
                          7. Si deseas, deja un mensaje final o recomendación personal
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

                      {/* Botón */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-70"
                      >
                        {isSubmitting ? 'Enviando…' : 'Enviar evaluación'}
                      </button>

                      {/* Microcopy de confianza */}
                      <p className="text-xs text-slate-500">
                        Siempre leemos cada comentario que recibimos. Tu opinión es parte de nuestro crecimiento.
                      </p>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            {/* Panel lateral */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-sm font-semibold text-slate-900">Gracias por compartir</h3>
                <p className="mt-3 text-sm text-slate-700">
                  Tu experiencia es valiosa. Leemos cada comentario para tomar mejores decisiones.
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  Pequeñas mejoras generan grandes resultados con el tiempo.
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
                <h4 className="text-sm font-semibold text-slate-900">¿Necesitas algo ahora mismo?</h4>
                <p className="mt-2 text-sm text-slate-700">
                  Si es urgente, escríbenos por WhatsApp o envíanos un correo.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href="https://wa.me/584245550101"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white bg-[#0A1F44] hover:opacity-95"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="mailto:contacto@midominio.com?subject=Soporte"
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
