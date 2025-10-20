// src/features/public/pages/quejas-apelaciones.tsx
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useMemo, useState } from 'react';

/* ----------------------------- Tipos y helpers ----------------------------- */

type TipoQueja = 'Servicio' | 'Administrativo' | 'Personal' | 'Instalaciones' | 'Otro';
type TipoInconformidad = 'Queja' | 'Apelacion';

interface ComplaintValues {
  empresa: string;
  nombre: string;
  cargo: string;
  telefono: string;
  email: string;
  direccion: string;
  fecha: string; // yyyy-mm-dd

  tipoQueja: TipoQueja | '';
  inconformidad: TipoInconformidad | '';

  anexaDocumento: 'SI' | 'NO';
  documento?: File | null;

  relato: string;
}

/** ⬇️ Cambia este ENDPOINT por tu API real */
const ENDPOINT = '/api/complaints'; // <--- AQUÍ CAMBIAS TU ENDPOINT
const AUTH_TOKEN = ''; // <-- Opcional: token si tu API lo requiere

const schema = yup.object({
  empresa: yup.string().required('Requerido'),
  nombre: yup.string().required('Requerido'),
  cargo: yup.string().required('Requerido'),
  telefono: yup.string().required('Requerido'),
  email: yup.string().email('Correo inválido').required('Requerido'),
  direccion: yup.string().required('Requerido'),
  fecha: yup.string().required('Requerido'),

  tipoQueja: yup
    .mixed<TipoQueja>()
    .oneOf(['Servicio', 'Administrativo', 'Personal', 'Instalaciones', 'Otro'])
    .required('Requerido'),

  inconformidad: yup
    .mixed<TipoInconformidad>()
    .oneOf(['Queja', 'Apelacion'])
    .required('Requerido'),

  anexaDocumento: yup.mixed<'SI' | 'NO'>().oneOf(['SI', 'NO']).required('Requerido'),
  documento: yup
    .mixed<File>()
    .test('doc-required-if-si', 'Adjunta un documento', function (value) {
      const { anexaDocumento } = this.parent as ComplaintValues;
      if (anexaDocumento === 'SI') return !!value;
      return true;
    }),
  relato: yup.string().min(10, 'Muy corto').required('Requerido'),
});

const radios = {
  tipoQueja: [
    { key: 'Servicio', label: 'Servicio' },
    { key: 'Administrativo', label: 'Administrativo' },
    { key: 'Personal', label: 'Personal' },
    { key: 'Instalaciones', label: 'Instalaciones y equipos', value: 'Instalaciones' },
    { key: 'Otro', label: 'Otro' },
  ],
  inconformidad: [
    { key: 'Queja', label: 'Queja' },
    { key: 'Apelacion', label: 'Apelación' },
  ],
  anexa: [
    { key: 'NO', label: 'No' },
    { key: 'SI', label: 'Sí' },
  ],
};

function classNames(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(' ');
}

function fileToBase64(f: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'));
    reader.onload = () => resolve(String(reader.result || '').split(',')[1] || '');
    reader.readAsDataURL(f);
  });
}

async function makePayload(v: ComplaintValues) {
  let documento: any = null;
  if (v.anexaDocumento === 'SI' && v.documento) {
    const base64 = await fileToBase64(v.documento);
    documento = {
      nombre: v.documento.name,
      tipo: v.documento.type,
      bytes: v.documento.size,
      base64, // Si prefieres multipart, cambia backend y aquí envía solo metadatos
    };
  }

  return {
    empresa: v.empresa,
    denunciante: {
      nombre: v.nombre,
      cargo: v.cargo,
      telefono: v.telefono,
      email: v.email,
      direccion: v.direccion,
    },
    fecha_presentacion: v.fecha, // yyyy-mm-dd
    clasificacion: {
      tipo_queja: v.tipoQueja,
      medio: 'Web', // <-- Fijo, porque todo se hace por portal web
      tipo_inconformidad: v.inconformidad,
    },
    adjunto: v.anexaDocumento === 'SI' ? documento : null,
    relato: v.relato,
    meta: {
      submittedAt: new Date().toISOString(),
      path: typeof window !== 'undefined' ? window.location.pathname : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      version: 1,
    },
  };
}

/* --------------------------------- Vista ---------------------------------- */

function ComplaintsAppealsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialValues: ComplaintValues = useMemo(
    () => ({
      empresa: '',
      nombre: '',
      cargo: '',
      telefono: '',
      email: '',
      direccion: '',
      fecha: new Date().toISOString().slice(0, 10),

      tipoQueja: '',
      inconformidad: '',

      anexaDocumento: 'NO',
      documento: null,

      relato: '',
    }),
    []
  );

  const onSubmit = async (values: ComplaintValues, actions: FormikHelpers<ComplaintValues>) => {
    setSubmitError(null);
    try {
      const payload = await makePayload(values);

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
      setTimeout(() => setSubmitted(false), 4500);
    } catch (err: any) {
      setSubmitError(err?.message || 'No se pudo enviar la queja/apelación.');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0A1F44]">
      {/* luces de fondo */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(80rem_40rem_at_-10%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(60rem_30rem_at_110%_-10%,rgba(16,185,129,0.12),transparent)]" />

      {/* hero */}
      <div className="relative mx-auto w-full max-w-[90rem] px-8 pt-16 pb-10">
        <header className="max-w-3xl text-center mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200 mb-4">
            Canal formal
          </p>
          <h1 className="relative inline-block text-4xl md:text-5xl font-bold text-white leading-tight">
            Quejas y apelaciones
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-28 rounded-full bg-gradient-to-r from-[#8B0000] to-blue-400 mt-2 animate-pulse" />
          </h1>
          <p className="mt-6 text-base md:text-lg text-slate-200">
            Déjanos tu caso con claridad y evidencia. Daremos seguimiento oportuno y transparente.
          </p>
        </header>
      </div>

      {/* cuerpo blanco */}
      <div className="relative bg-white">
        <div className="h-[3px] w-full bg-gradient-to-r from-[#8B0000] via-[#0A1F44] to-blue-400 opacity-70" />
        <div className="mx-auto w-full max-w-[90rem] px-8 py-14">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* formulario */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    Datos generales del afectado
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Completa la información para registrar formalmente tu queja o apelación.
                  </p>
                </div>

                {submitted && (
                  <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    ¡Enviado! Hemos recibido tu registro y daremos seguimiento.
                  </div>
                )}
                {submitError && (
                  <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </div>
                )}

                <Formik<ComplaintValues>
                  initialValues={initialValues}
                  validationSchema={schema}
                  onSubmit={onSubmit}
                >
                  {({ values, isSubmitting, setFieldValue }) => (
                    <Form className="space-y-8 text-sm">
                      {/* fila 1 */}
                      <div>
                        <label className="block text-sm font-medium text-slate-800">Empresa</label>
                        <Field
                          name="empresa"
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                        />
                        <ErrorMessage name="empresa" component="p" className="mt-1 text-xs text-red-600" />
                      </div>

                      {/* fila 2 */}
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-800">
                            Nombre de la persona que presenta la queja y/o apelación
                          </label>
                          <Field
                            name="nombre"
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                          />
                          <ErrorMessage name="nombre" component="p" className="mt-1 text-xs text-red-600" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-800">Cargo</label>
                          <Field
                            name="cargo"
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                          />
                          <ErrorMessage name="cargo" component="p" className="mt-1 text-xs text-red-600" />
                        </div>
                      </div>

                      {/* fila 3 */}
                      <div className="grid gap-6 md:grid-cols-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-800">Teléfono</label>
                          <Field
                            name="telefono"
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                          />
                          <ErrorMessage name="telefono" component="p" className="mt-1 text-xs text-red-600" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-800">Email</label>
                          <Field
                            name="email"
                            type="email"
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                          />
                          <ErrorMessage name="email" component="p" className="mt-1 text-xs text-red-600" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-800">Dirección</label>
                          <Field
                            name="direccion"
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                          />
                          <ErrorMessage name="direccion" component="p" className="mt-1 text-xs text-red-600" />
                        </div>
                      </div>

                      {/* fila 4 */}
                      <div>
                        <label className="block text-sm font-medium text-slate-800">
                          Fecha de presentación de la queja y/o apelación
                        </label>
                        <Field
                          name="fecha"
                          type="date"
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                        />
                        <ErrorMessage name="fecha" component="p" className="mt-1 text-xs text-red-600" />
                      </div>

                      {/* radios 1: tipo de queja */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-900">Tipo de queja</span>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {radios.tipoQueja.map((opt) => {
                            const value = (opt.value as TipoQueja) || (opt.key as TipoQueja);
                            const active = values.tipoQueja === value;
                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => setFieldValue('tipoQueja', value)}
                                className={classNames(
                                  'inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition',
                                  active
                                    ? 'bg-[#0A1F44] text-white ring-[#0A1F44]'
                                    : 'bg-slate-50 text-slate-700 ring-slate-300 hover:bg-slate-100'
                                )}
                                aria-pressed={active}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                        {/* radios ocultos para validación */}
                        <div className="sr-only">
                          {radios.tipoQueja.map((opt) => {
                            const value = (opt.value as TipoQueja) || (opt.key as TipoQueja);
                            return (
                              <label key={`r1-${opt.key}`}>
                                <Field type="radio" name="tipoQueja" value={value} />
                                {opt.label}
                              </label>
                            );
                          })}
                        </div>
                        <ErrorMessage name="tipoQueja" component="p" className="mt-1 text-xs text-red-600" />
                      </div>

                      {/* radios 2: tipo de inconformidad */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-900">Tipo de inconformidad</span>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {radios.inconformidad.map((opt) => {
                            const value = opt.key as TipoInconformidad;
                            const active = values.inconformidad === value;
                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => setFieldValue('inconformidad', value)}
                                className={classNames(
                                  'inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition',
                                  active
                                    ? 'bg-[#0A1F44] text-white ring-[#0A1F44]'
                                    : 'bg-slate-50 text-slate-700 ring-slate-300 hover:bg-slate-100'
                                )}
                                aria-pressed={active}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                        <div className="sr-only">
                          {radios.inconformidad.map((opt) => (
                            <label key={`r3-${opt.key}`}>
                              <Field type="radio" name="inconformidad" value={opt.key as TipoInconformidad} />
                              {opt.label}
                            </label>
                          ))}
                        </div>
                        <ErrorMessage name="inconformidad" component="p" className="mt-1 text-xs text-red-600" />
                      </div>

                      {/* radios 3: adjunto + input archivo */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-900">¿Anexa algún documento?</span>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {radios.anexa.map((opt) => {
                            const active = values.anexaDocumento === (opt.key as 'SI' | 'NO');
                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => setFieldValue('anexaDocumento', opt.key)}
                                className={classNames(
                                  'inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition',
                                  active
                                    ? 'bg-[#0A1F44] text-white ring-[#0A1F44]'
                                    : 'bg-slate-50 text-slate-700 ring-slate-300 hover:bg-slate-100'
                                )}
                                aria-pressed={active}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                        <div className="sr-only">
                          {radios.anexa.map((opt) => (
                            <label key={`r4-${opt.key}`}>
                              <Field type="radio" name="anexaDocumento" value={opt.key} />
                              {opt.label}
                            </label>
                          ))}
                        </div>

                        {values.anexaDocumento === 'SI' && (
                          <div className="mt-3">
                            <label className="block text-sm font-medium text-slate-800">Adjuntar archivo</label>
                            <input
                              type="file"
                              onChange={(e) => setFieldValue('documento', e.currentTarget.files?.[0] || null)}
                              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#0A1F44] file:px-3 file:py-2 file:text-white hover:file:opacity-95"
                            />
                            <ErrorMessage name="documento" component="p" className="mt-1 text-xs text-red-600" />
                            {values.documento && (
                              <p className="mt-1 text-xs text-slate-500">
                                {values.documento.name} • {(values.documento.size / 1024).toFixed(1)} KB
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* relato */}
                      <div>
                        <label className="block text-sm font-medium text-slate-800">
                          Relato claro de la queja y/o apelación
                        </label>
                        <Field
                          as="textarea"
                          name="relato"
                          rows={6}
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200"
                          placeholder="Describe los hechos, fechas, áreas involucradas y cualquier evidencia relevante."
                        />
                        <ErrorMessage name="relato" component="p" className="mt-1 text-xs text-red-600" />
                      </div>

                      {/* aviso y botón */}
                      <p className="text-xs text-slate-500">
                        Daremos seguimiento en un plazo no mayor a 15 días y recibirás notificación por los medios indicados.
                      </p>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-70"
                      >
                        {isSubmitting ? 'Enviando…' : 'Enviar queja y/o apelación'}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            {/* panel lateral sobrio */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-sm font-semibold text-slate-900">Transparencia y trazabilidad</h3>
                <p className="mt-3 text-sm text-slate-700">
                  Cada registro genera un seguimiento interno con tiempos de respuesta y responsables definidos.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h4 className="text-sm font-semibold text-slate-900">Soporte</h4>
                <p className="mt-2 text-sm text-slate-700">
                  Si requieres asistencia para completar el formulario, contáctanos.
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
                    href="mailto:contacto@midominio.com?subject=Quejas%20y%20Apelaciones"
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
}

export default ComplaintsAppealsPage;
export { ComplaintsAppealsPage };
