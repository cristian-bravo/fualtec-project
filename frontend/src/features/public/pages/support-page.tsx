import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface SupportFormValues {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

const schema = yup.object({
  nombre: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Formato de correo inválido').required('El correo es obligatorio'),
  asunto: yup.string().required('Indique un asunto'),
  mensaje: yup.string().min(10, 'El mensaje debe tener al menos 10 caracteres').required('El mensaje es obligatorio')
});

export const SupportPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SupportFormValues>({ resolver: yupResolver(schema) });

  const onSubmit = (values: SupportFormValues) => {
    console.info('Support request', values);
    reset();
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row">
      <div className="flex-1 space-y-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Atención al cliente</p>
        <h2 className="text-3xl font-bold text-slate-900">Estamos a su disposición 24/7</h2>
        <p className="text-sm text-slate-600">
          Nuestro equipo de especialistas responde cada requerimiento con la inmediatez que exigen las operaciones petroleras. Complete el formulario o comuníquese directamente con nosotros.
        </p>
        <ul className="space-y-3 text-sm text-slate-700">
          <li><strong>Teléfono:</strong> +58 (212) 555-0101</li>
          <li><strong>Correo:</strong> soporte@midominio.com</li>
          <li><strong>WhatsApp corporativo:</strong> +58 424-555-0101</li>
          <li><strong>Horario:</strong> Atención ininterrumpida 24/7</li>
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-4 rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
        <label className="flex flex-col gap-1 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Nombre completo</span>
          <input
            className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            {...register('nombre')}
          />
          {errors.nombre && <span className="text-xs font-medium text-red-700">{errors.nombre.message}</span>}
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Correo</span>
          <input
            type="email"
            className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            {...register('email')}
          />
          {errors.email && <span className="text-xs font-medium text-red-700">{errors.email.message}</span>}
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Asunto</span>
          <input
            className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            {...register('asunto')}
          />
          {errors.asunto && <span className="text-xs font-medium text-red-700">{errors.asunto.message}</span>}
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Mensaje</span>
          <textarea
            rows={4}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            {...register('mensaje')}
          />
          {errors.mensaje && <span className="text-xs font-medium text-red-700">{errors.mensaje.message}</span>}
        </label>
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
        >
          Enviar solicitud
        </button>
      </form>
    </section>
  );
};
