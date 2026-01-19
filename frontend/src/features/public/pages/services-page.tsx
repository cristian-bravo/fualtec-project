import { Link } from 'react-router-dom';
import { services } from '../services/servicesData';

export const ServicesPage = () => {
  const mainServices = services.slice(0, 4);
  const featuredService = services[4];

  return (
    <section className="bg-[#0A1F44] text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
    <header className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
        Servicios NDT
      </p>

      <h1 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
        Inspección y control para operaciones petroleras e industriales
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200">
        Portafolio corporativo con foco en integridad, cumplimiento normativo y continuidad operativa.
      </p>

      {/* Línea separadora inferior */}
      <div className="mx-auto mt-5 h-[3px] w-28 rounded-full bg-gradient-to-r from-[#8B0000] to-blue-400" />
    </header>

        {/* GRID PRINCIPAL (4 servicios) */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {mainServices.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b244f] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-200">
                  {service.short}
                </p>

                <span className="mt-6 self-center inline-flex items-center justify-center rounded-full border border-[#8B0000] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F8E7E7] transition group-hover:bg-[#8B0000] group-hover:text-white">
                  Ver detalle
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* SERVICIO DESTACADO (CENTRADO) */}
        {featuredService && (
          <div className="mt-16 flex justify-center">
            <Link
              to={`/services/${featuredService.slug}`}
              className="group w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-[#0b244f] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={featuredService.image}
                  alt={featuredService.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              <div className="px-8 pb-8 pt-7 text-center">
                <h3 className="text-xl font-semibold">
                  {featuredService.title}
                </h3>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-200">
                  {featuredService.short}
                </p>

                <span className="mx-auto mt-6 inline-flex items-center justify-center rounded-full bg-[#8B0000] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition hover:opacity-90">
                  Ver detalle
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
