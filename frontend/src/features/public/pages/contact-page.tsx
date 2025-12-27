import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useToast } from '../../../components/toast-context';
import { publicFormsService } from '../services/publicFormsService';

const schema = z.object({
  nombre: z.string().min(2, 'Ingrese su nombre'),
  email: z.string().email('Correo invalido'),
  asunto: z.string().min(3, 'Asunto muy corto'),
  mensaje: z.string().min(10, 'Mensaje muy corto'),
});

type SupportFormValues = z.infer<typeof schema>;

export const ContactPage = () => {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SupportFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { nombre: '', email: '', asunto: '', mensaje: '' },
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<SupportFormValues> = async (values) => {
    try {
      await publicFormsService.submitContact(values);
      reset();
      setSubmitted(true);
      showToast({
        title: 'Mensaje enviado',
        description: 'Nuestro equipo revisara su solicitud.',
        tone: 'success',
      });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        Object.values(error?.response?.data?.errors || {})?.[0]?.[0] ||
        'No se pudo enviar el mensaje. Intente nuevamente.';
      showToast({
        title: 'No se pudo enviar',
        description: message,
        tone: 'error',
      });
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0A1F44]">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(80rem_40rem_at_-10%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(60rem_30rem_at_110%_-10%,rgba(16,185,129,0.12),transparent)]" />

      <div className="relative mx-auto w-full max-w-[90rem] px-8 py-20">
        <header className="max-w-3xl text-center mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200 mb-4">
            Contacto directo
          </p>
          <h1 className="relative inline-block text-4xl md:text-5xl font-bold text-white leading-tight">
            Coordinemos su proximo proyecto
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-28 rounded-full bg-gradient-to-r from-[#8B0000] to-blue-400 mt-2 animate-pulse" />
          </h1>
          <p className="mt-8 text-base md:text-lg text-slate-200 leading-relaxed">
            Nuestro equipo puede agendar una reunion presencial o virtual para analizar
            sus necesidades en operaciones petroleras.
          </p>
        </header>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 items-start">
          <div>
            <article className="rounded-2xl border border-white/10 bg-[#0b244f]/90 backdrop-blur-md p-6 transition hover:-translate-y-1 hover:shadow-2xl hover:border-white/20">
              <h2 className="text-lg font-semibold text-white mb-4">Informacion de contacto</h2>
              <ul className="space-y-4 text-sm text-slate-200/90">
                <li className="flex gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                    <svg width="18" height="18" viewBox="0 0 24 24" className="text-white" aria-hidden="true">
                      <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/>
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium text-white">Direccion</p>
                    <p className="text-slate-300">Av. Quito y Av. Amazonas, Lago Agrio, Sucumbios - Ecuador</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                    <svg width="18" height="18" viewBox="0 0 24 24" className="text-white" aria-hidden="true">
                      <path fill="currentColor" d="M6.6 10.8c1.2 2.4 3.2 4.4 5.6 5.6l1.9-1.9c.3-.3.8-.4 1.1-.2 1.2.4 2.5.7 3.8.7.6 0 1 .4 1 .9V19c0 .6-.4 1-1 1C10.6 20 4 13.4 4 5c0-.6.4-1 1-1h3.1c.5 0 .9.4.9 1 0 1.3.2 2.6.7 3.8.1.4 0 .8-.3 1.1l-1.8 1.9Z"/>
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium text-white">Telefonos</p>
                    <p className="text-slate-300">+593 98 456 7890 / +593 98 456 7891</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                    <svg width="18" height="18" viewBox="0 0 24 24" className="text-white" aria-hidden="true">
                      <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v.4l10 6.2 10-6.2V6a2 2 0 0 0-2-2Zm0 4.2-8 5-8-5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.2Z"/>
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium text-white">Correo</p>
                    <a
                      href="mailto:contacto@fualtec.com"
                      className="text-slate-300 hover:text-white underline decoration-white/30 underline-offset-4"
                    >
                      contacto@fualtec.com
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/593984567890"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 ring-1 ring-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20 12a8 8 0 0 1-11.9 7l-3.1.9.9-3.1A8 8 0 1 1 20 12Z" stroke="white" strokeWidth="2"/>
                    <path d="M9.5 9.5c.3 2 2.5 3.8 4 4l1-.9c.2-.2.6-.1.8.1l.9.9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  WhatsApp corporativo
                </a>
                <a
                  href="mailto:contacto@fualtec.com?subject=Consulta%20corporativa"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-[#0A1F44] bg-white hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 6h16v12H4z" stroke="#0A1F44" strokeWidth="2"/><path d="m4 7 8 6 8-6" stroke="#0A1F44" strokeWidth="2" />
                  </svg>
                  Escribir correo
                </a>
              </div>
            </article>
          </div>

          <div className="relative">
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#081a35] shadow-2xl ring-1 ring-white/10 transition hover:ring-white/20">
              <div className="absolute inset-0 [background:radial-gradient(60rem_30rem_at_120%_120%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
              <iframe
                title="Mapa corporativo"
                src="https://maps.google.com/maps?q=Lago%20Agrio%20Ecuador&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-full w-full opacity-95"
                loading="lazy"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#8B0000] via-white/80 to-blue-400 opacity-0 transition group-hover:opacity-100" />
            </div>
            <div className="absolute -top-3 left-4 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur">
              Sede Lago Agrio
            </div>
          </div>
        </div>
      </div>

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
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-10 grid max-w-3xl gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
          >
            {submitted && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Tu mensaje fue enviado correctamente.
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">Nombre</label>
              <input
                {...register('nombre')}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Asunto</label>
                <input
                  {...register('asunto')}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                {errors.asunto && <p className="mt-1 text-sm text-red-600">{errors.asunto.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Mensaje</label>
              <textarea
                {...register('mensaje')}
                rows={5}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
              {errors.mensaje && <p className="mt-1 text-sm text-red-600">{errors.mensaje.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A1F44] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-70"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>

            <p className="text-xs text-slate-500">
              Al enviar este formulario aceptas nuestra politica de privacidad. Nunca compartimos tus datos con terceros.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

