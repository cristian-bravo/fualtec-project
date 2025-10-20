import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Inspección integral de activos',
    highlight: true,
    description:
      'Programas de inspección avanzada para ductos, tanques y facilidades críticas con reportes detallados.',
  },
  {
    title: 'Integridad de ductos',
    description:
      'Evaluación de riesgo, mantenimiento predictivo y planes de mitigación alineados a normativas internacionales.',
  },
  {
    title: 'Gestión documental certificada',
    description:
      'Centralice certificados, informes y permisos con trazabilidad completa y alertas inteligentes.',
  },
  {
    title: 'Auditoría operativa',
    description:
      'Monitoreo en campo, seguimiento de hallazgos y reportes para comités ejecutivos.',
  },
];

const coverByTitle = {
  'Inspección integral de activos':
    'https://images.unsplash.com/photo-1506917728033-b6d5f3d47bdb?q=80&w=1600&auto=format&fit=crop',
  'Integridad de ductos':
    'https://images.unsplash.com/photo-1562684320-07a504f6f1a5?q=80&w=1600&auto=format&fit=crop',
  'Gestión documental certificada':
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1600&auto=format&fit=crop',
  'Auditoría operativa':
    'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1600&auto=format&fit=crop',
};

export const ServicesPage = () => (
  <section className="relative bg-[#0A1F44]">
    {/* sutiles luces de fondo */}
    <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(80rem_40rem_at_-10%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(60rem_30rem_at_110%_-10%,rgba(16,185,129,0.12),transparent)]" />

    <div className="relative mx-auto w-full max-w-7xl px-6 py-20">
      {/* encabezado con estilo elegante */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200 mb-4">
          Nuestros servicios
        </p>

        <h1 className="relative inline-block text-4xl md:text-5xl font-bold text-white leading-tight">
          Expertos en integridad y eficiencia para la industria petrolera
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-28 rounded-full bg-gradient-to-r from-[#8B0000] to-blue-400 mt-2 animate-pulse" />
        </h1>

        <p className="mt-8 text-base md:text-lg text-slate-200 leading-relaxed">
          Diseñamos soluciones modulares que combinan experiencia técnica, tecnología y cumplimiento
          normativo.
        </p>
      </div>

      {/* grid de servicios */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((s) => {
          const cover = coverByTitle[s.title];
          if (s.highlight) {
            // tarjeta destacada (ancha)
            return (
              <article
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 md:col-span-2"
              >
                <img
                  src={cover}
                  alt={s.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#06182f]/80 via-[#0A1F44]/70 to-[#071326]/80" />
                <div className="relative grid items-center gap-6 p-8 sm:grid-cols-3 sm:p-10">
                  <div className="sm:col-span-2">
                    <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-slate-200">{s.description}</p>
                  </div>
                  <div className="flex items-end sm:justify-end">
                    <Link
                      to="/contacto"
                      className="inline-flex items-center rounded-md bg-[#8B0000] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
                    >
                      Solicitar servicio
                    </Link>
                  </div>
                </div>
              </article>
            );
          }

          // tarjetas estándar
          return (
            <article
              key={s.title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b244f] transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={cover}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b244f] to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-200">{s.description}</p>
                <div className="mt-5">
                  <Link
                    to="/contacto"
                    className="inline-flex items-center rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Solicitar servicio
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
