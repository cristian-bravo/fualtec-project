import { Link } from 'react-router-dom';

const newsItems = [
  {
    title: 'Nueva linea de inspeccion NDT en Oriente',
    date: '12/12/2025',
    tag: 'Operaciones',
    excerpt:
      'Ampliamos cobertura en Lago Agrio con equipos y personal certificado para inspecciones criticas.',
    href: '/contacto',
  },
  {
    title: 'Actualizacion de protocolos HSE 2025',
    date: '02/12/2025',
    tag: 'Cumplimiento',
    excerpt:
      'Implementamos mejoras en seguridad operacional y control documental para proyectos energicos.',
    href: '/servicios',
  },
  {
    title: 'Certificaciones renovadas y acreditaciones vigentes',
    date: '18/11/2025',
    tag: 'Calidad',
    excerpt:
      'Nuestros procesos se mantienen alineados a ISO y regulaciones locales del sector petrolero.',
    href: '/descargas',
  },
];

export const NewsSection = () => (
  <section className="relative overflow-hidden bg-[#071326]">
    <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(70rem_35rem_at_10%_10%,rgba(59,130,246,0.18),transparent),radial-gradient(50rem_25rem_at_90%_10%,rgba(16,185,129,0.12),transparent)]" />

    <div className="relative mx-auto w-full max-w-7xl px-6 py-20">
      <div className="flex flex-col gap-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
          Noticias y actualizaciones
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Novedades de Fualtec
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
          Informes operativos, actualizaciones regulatorias y avances en inspeccion y
          gestion documental para la industria energetica.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {newsItems.map((item) => (
          <article
            key={item.title}
            className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:border-white/20"
          >
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-blue-200">
                {item.tag}
              </span>
              <span>{item.date}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{item.excerpt}</p>
            <Link
              to={item.href}
              className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-sky-300 transition group-hover:text-sky-200"
            >
              Ver detalle
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);
