import { Link } from 'react-router-dom';
import { services } from '../services/servicesData';

export const ServicesPage = () => (
  <section className="bg-[#0A1F44] text-white">
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">Servicios NDT</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
          Inspección y control para operaciones petroleras e industriales
        </h1>
        <p className="mt-4 text-sm text-slate-200">
          Portafolio corporativo con foco en integridad, cumplimiento normativo y continuidad operativa.
        </p>
      </header>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Link
            key={service.id}
            to={`/services/${service.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b244f] transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
              <h3 className="min-h-[3rem] text-base font-semibold">{service.title}</h3>
              <p className="mt-3 min-h-[5.5rem] text-sm leading-relaxed text-slate-200">
                {service.short}
              </p>
              <span className="mt-6 inline-flex w-fit items-center justify-center rounded-full border border-[#8B0000] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F8E7E7] transition group-hover:bg-[#8B0000] group-hover:text-white">
                VER DETALLE
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
