import { Formik, Form, Field } from 'formik';
import type { FormikConfig } from 'formik';
import { Tooltip } from '../../../components/ui/tooltip';
import { ComplaintFormValues, TipoInconformidad, TipoQueja } from '../hooks/use-complaint-form';

type ComplaintFormSectionProps = {
  formikConfig: FormikConfig<ComplaintFormValues>;
  submitted: boolean;
  submitError: string | null;
  loading: boolean;
};

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

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const ComplaintFormSection = ({
  formikConfig,
  submitted,
  submitError,
  loading,
}: ComplaintFormSectionProps) => (
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
          Enviado. Hemos recibido tu registro y daremos seguimiento.
        </div>
      )}

      <Formik<ComplaintFormValues> {...formikConfig}>
        {({ values, setFieldValue, setFieldTouched, errors, touched, submitCount }) => (
          <Form className="space-y-8 text-sm">
            <div>
              <label className="block text-sm font-medium text-slate-800">Empresa</label>
              <Tooltip
                content={
                  touched.empresa || submitCount > 0 ? errors.empresa : undefined
                }
                className="w-full"
              >
                <Field
                  name="empresa"
                  className={classNames(
                    'mt-1 w-full rounded-lg border bg-white px-3 py-2 shadow-sm focus:ring',
                    (touched.empresa || submitCount > 0) && errors.empresa
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                  )}
                />
              </Tooltip>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-800">
                  Nombre de la persona que presenta la queja y/o apelación
                </label>
                <Tooltip
                  content={touched.nombre || submitCount > 0 ? errors.nombre : undefined}
                  className="w-full"
                >
                  <Field
                    name="nombre"
                    className={classNames(
                      'mt-1 w-full rounded-lg border bg-white px-3 py-2 shadow-sm focus:ring',
                      (touched.nombre || submitCount > 0) && errors.nombre
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                    )}
                  />
                </Tooltip>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-800">Cargo</label>
                <Tooltip
                  content={touched.cargo || submitCount > 0 ? errors.cargo : undefined}
                  className="w-full"
                >
                  <Field
                    name="cargo"
                    className={classNames(
                      'mt-1 w-full rounded-lg border bg-white px-3 py-2 shadow-sm focus:ring',
                      (touched.cargo || submitCount > 0) && errors.cargo
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                    )}
                  />
                </Tooltip>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-slate-800">Teléfono</label>
                <Tooltip
                  content={
                    touched.telefono || submitCount > 0 ? errors.telefono : undefined
                  }
                  className="w-full"
                >
                  <Field
                    name="telefono"
                    className={classNames(
                      'mt-1 w-full rounded-lg border bg-white px-3 py-2 shadow-sm focus:ring',
                      (touched.telefono || submitCount > 0) && errors.telefono
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                    )}
                  />
                </Tooltip>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-800">Email</label>
                <Tooltip
                  content={touched.email || submitCount > 0 ? errors.email : undefined}
                  className="w-full"
                >
                  <Field
                    name="email"
                    type="email"
                    className={classNames(
                      'mt-1 w-full rounded-lg border bg-white px-3 py-2 shadow-sm focus:ring',
                      (touched.email || submitCount > 0) && errors.email
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                    )}
                  />
                </Tooltip>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-800">dirección</label>
                <Tooltip
                  content={
                    touched.direccion || submitCount > 0 ? errors.direccion : undefined
                  }
                  className="w-full"
                >
                  <Field
                    name="dirección"
                    className={classNames(
                      'mt-1 w-full rounded-lg border bg-white px-3 py-2 shadow-sm focus:ring',
                      (touched.direccion || submitCount > 0) && errors.direccion
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                    )}
                  />
                </Tooltip>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-800">
                Fecha de presentación de la queja y/o apelación
              </label>
              <Tooltip
                content={touched.fecha || submitCount > 0 ? errors.fecha : undefined}
                className="w-full"
              >
                <Field
                  name="fecha"
                  type="date"
                  className={classNames(
                    'mt-1 w-full rounded-lg border bg-white px-3 py-2 shadow-sm focus:ring',
                    (touched.fecha || submitCount > 0) && errors.fecha
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                  )}
                />
              </Tooltip>
            </div>

            <div>
              <Tooltip
                content={touched.tipoQueja || submitCount > 0 ? errors.tipoQueja : undefined}
                align="start"
              >
                <span className="block text-sm font-semibold text-slate-900">Tipo de queja</span>
              </Tooltip>
              <div className="mt-3 flex flex-wrap gap-2">
                {radios.tipoQueja.map((opt) => {
                  const value = (opt.value as TipoQueja) || (opt.key as TipoQueja);
                  const active = values.tipoQueja === value;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        setFieldValue('tipoQueja', value);
                        setFieldTouched('tipoQueja', true, false);
                      }}
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
            </div>

            <div>
              <Tooltip
                content={
                  touched.inconformidad || submitCount > 0
                    ? errors.inconformidad
                    : undefined
                }
                align="start"
              >
                <span className="block text-sm font-semibold text-slate-900">
                  Tipo de inconformidad
                </span>
              </Tooltip>
              <div className="mt-3 flex flex-wrap gap-2">
                {radios.inconformidad.map((opt) => {
                  const value = opt.key as TipoInconformidad;
                  const active = values.inconformidad === value;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        setFieldValue('inconformidad', value);
                        setFieldTouched('inconformidad', true, false);
                      }}
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
            </div>

            <div>
              <Tooltip
                content={
                  touched.anexaDocumento || submitCount > 0
                    ? errors.anexaDocumento
                    : undefined
                }
                align="start"
              >
                <span className="block text-sm font-semibold text-slate-900">
                  Anexa algún documento?
                </span>
              </Tooltip>
              <div className="mt-3 flex flex-wrap gap-2">
                {radios.anexa.map((opt) => {
                  const active = values.anexaDocumento === (opt.key as 'SI' | 'NO');
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        setFieldValue('anexaDocumento', opt.key);
                        setFieldTouched('anexaDocumento', true, false);
                        if (opt.key === 'NO') {
                          setFieldValue('documento', null);
                        }
                      }}
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
                <Tooltip
                  content={
                    (touched.documento || submitCount > 0) && typeof errors.documento === 'string'
                      ? errors.documento
                      : undefined
                  }
                >

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={(event) => {
                        setFieldValue('documento', event.currentTarget.files?.[0] || null);
                        setFieldTouched('documento', true, false);
                      }}
                      className={classNames(
                        'mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#0A1F44] file:px-3 file:py-2 file:text-white hover:file:opacity-95',
                        (touched.documento || submitCount > 0) && errors.documento
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                      )}
                    />
                  </Tooltip>
                  {values.documento && (
                    <p className="mt-1 text-xs text-slate-500">
                      {values.documento.name} / {(values.documento.size / 1024).toFixed(1)} KB
                    </p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-800">
                Relato claro de la queja y/o apelación
              </label>
              <Tooltip
                content={touched.relato || submitCount > 0 ? errors.relato : undefined}
                className="w-full"
              >
                <Field
                  as="textarea"
                  name="relato"
                  rows={6}
                  className={classNames(
                    'mt-1 w-full rounded-lg border bg-white px-3 py-2 shadow-sm focus:ring',
                    (touched.relato || submitCount > 0) && errors.relato
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
                  )}
                  placeholder="Describe los hechos, fechas, areas involucradas y evidencia relevante."
                />
              </Tooltip>
            </div>

            <p className="text-xs text-slate-500">
              Daremos seguimiento en un plazo no mayor a 15 días y recibirás notificación por los medios indicados.
            </p>

            <Tooltip content={submitError}>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-70"
              >
                {loading ? 'Enviando...' : 'Enviar queja y/o apelación'}
              </button>
            </Tooltip>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);
