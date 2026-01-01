import { Link, useParams } from 'react-router-dom';
import { services, WHATSAPP_PHONE } from '../services/servicesData';

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <section className="bg-[#0A1F44] text-white">
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          <h1 className="text-2xl font-semibold">Servicio no encontrado</h1>
          <Link
            to="/services"
            className="mt-6 inline-flex rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            Volver a servicios
          </Link>
        </div>
      </section>
    );
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(service.whatsappMessage)}`;

  return (
    <section className="bg-[#0A1F44] text-white">
      <div className="mx-auto w-full max-w-4xl px-6 py-8">
        <Link
          to="/services"
          className="inline-flex rounded-md bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-white/20"
        >
          Volver a servicios
        </Link>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">Servicio</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{service.title}</h1>
        <p className="mt-5 text-sm leading-relaxed text-slate-200">{service.full}</p>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Normativa aplicada</p>
          <p className="mt-2 text-sm text-slate-100">{service.standards}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md bg-[#8B0000] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Contactar por WhatsApp
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            Ir a contacto
          </Link>
        </div>
      </div>
    </section>
  );
};
