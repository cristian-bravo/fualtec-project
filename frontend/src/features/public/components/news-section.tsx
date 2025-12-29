const newsItems = [
  {
    category: 'Sector Petrolero',
    title: 'Fortalecimiento de la infraestructura petrolera en Ecuador',
    description:
      'El sector petrolero ecuatoriano impulsa acciones de mantenimiento, inspección y control técnico para garantizar operaciones seguras y continuas.',
    url: 'https://www.eppetroecuador.ec/',
    image:
      'https://www.eppetroecuador.ec/wp-content/uploads/2025/11/Banner_web_SACHA-04.png',
  },
  {
    category: 'Inspección Industrial',
    title: 'La inspección técnica como base de la confiabilidad operativa',
    description:
      'Las inspecciones en campo y los ensayos no destructivos permiten extender la vida útil de activos críticos en la industria.',
    url: 'https://www.api.org/',
    image:
      'https://www.api.org/-/media/Files/misc/2025/issues-slides/Infrastructure.jpg',
  },
  {
    category: 'Integridad de Activos',
    title: 'Programas de integridad y mantenimiento en sistemas de tuberías',
    description:
      'La aplicación de programas de integridad contribuye a la seguridad y eficiencia en sistemas de transporte de hidrocarburos.',
    url: 'https://www.asme.org/',
    image:
      'https://www.asme.org/getmedia/0c2ac820-5ebd-467a-b39b-0bd2b0cb47bf/dsc_0083.jpg?width=854&height=569&ext=.jpg',
  },
  {
    category: 'Cumplimiento Normativo',
    title: 'Normativas técnicas aplicadas a operaciones petroleras',
    description:
      'El cumplimiento de normas API, ASME e ISO es fundamental para una operación petrolera responsable y auditada.',
    url: 'https://www.iso.org/',
    image: 'https://www.iso.org/modules/isoorg-template/img/iso/iso-logo-og.png',
  },
  {
    category: 'Gestión Técnica',
    title: 'Importancia de la trazabilidad documental en inspecciones',
    description:
      'La gestión adecuada de reportes técnicos y evidencias fortalece los procesos de auditoría y control operativo.',
    url: 'https://www.api.org/oil-and-natural-gas/standards',
    image: 'https://www.api.org/-/media/APIWebsite/Thumbs/api-logo-stacked.png',
  },
  {
    category: 'Seguridad Operacional',
    title: 'La seguridad como eje central en trabajos de inspección',
    description:
      'La aplicación de estándares de seguridad protege al personal y asegura la continuidad de las operaciones industriales.',
    url: 'https://www.osha.gov/',
    image: 'https://www.osha.gov/sites/default/files/homepage/TrenchResourceBox.jpg',
  },
];

export const NewsSection = () => {
  const visibleItems = newsItems.filter((item) => item.image);

  return (
    <section className="relative overflow-hidden bg-[#071326]">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(70rem_35rem_at_10%_10%,rgba(59,130,246,0.18),transparent),radial-gradient(50rem_25rem_at_90%_10%,rgba(16,185,129,0.12),transparent)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
            Actualidad del sector petrolero
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Novedades de Fualtec
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
            Selección de noticias ecuatorianas sobre energía, industria, petróleo,
            seguridad industrial y normativa técnica, con fuentes externas confiables.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <article
              key={item.title}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A1F44]/35 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative w-full overflow-hidden rounded-t-2xl aspect-video">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex h-full flex-col p-6">
                <span className="inline-flex self-start rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-200">
                  {item.category}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300 line-clamp-2">
                  {item.description}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-sky-300 transition group-hover:text-sky-200"
                >
                  Ver detalle
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
