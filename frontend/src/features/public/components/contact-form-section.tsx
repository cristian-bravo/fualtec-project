import { UseFormReturn } from 'react-hook-form';
import { ContactFormValues } from '../hooks/use-contact-form';

type ContactFormSectionProps = {
  form: UseFormReturn<ContactFormValues>;
  submitted: boolean;
  loading: boolean;
  error: string | null;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const ContactFormSection = ({
  form,
  submitted,
  loading,
  error,
  onSubmit,
}: ContactFormSectionProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="relative bg-white">
      <div className="h-[3px] w-full bg-gradient-to-r from-[#8B0000] via-[#0A1F44] to-blue-400 opacity-60" />
      <div className="mx-auto w-full max-w-[90rem] px-8 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0A1F44]">
            Escribenos
          </p>
          <h2 className="relative inline-block mt-2 text-3xl md:text-4xl font-bold text-slate-900">
            Envie un mensaje
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#8B0000] to-blue-500" />
          </h2>
          <p className="mt-6 text-slate-600">
            Respondemos en menos de 24 horas habiles. Prioridad para clientes con SLA activo.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 grid max-w-3xl gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        >
          {submitted && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Tu mensaje fue enviado correctamente.
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700">Nombre</label>
            <input
              {...register('nombre')}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                {...register('email')}
                type="email"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Asunto</label>
              <input
                {...register('asunto')}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              {errors.asunto && (
                <p className="mt-1 text-sm text-red-600">{errors.asunto.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Mensaje</label>
            <textarea
              {...register('mensaje')}
              rows={5}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.mensaje && (
              <p className="mt-1 text-sm text-red-600">{errors.mensaje.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-70"
          >
            {loading ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          <p className="text-xs text-slate-500">
            Al enviar este formulario aceptas nuestra politica de privacidad. Nunca compartimos tus datos con terceros.
          </p>
        </form>
      </div>
    </div>
  );
};
