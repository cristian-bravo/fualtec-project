const services = [
  {
    title: 'Inspección integral de activos',
    highlight: true,
    description:
      'Programas de inspección avanzada para ductos, tanques y facilidades críticas con reportes detallados.'
  },
  {
    title: 'Integridad de ductos',
    description:
      'Evaluación de riesgo, mantenimiento predictivo y planes de mitigación alineados a normativas internacionales.'
  },
  {
    title: 'Gestión documental certificada',
    description:
      'Centralice certificados, informes y permisos con trazabilidad completa y alertas inteligentes.'
  },
  {
    title: 'Auditoría operativa',
    description: 'Monitoreo en campo, seguimiento de hallazgos y reportes para comités ejecutivos.'
  }
];

export const ServicesPage = () => (
  <section className="mx-auto w-full max-w-7xl px-6 py-16">
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Nuestros servicios</p>
      <h2 className="mt-3 text-3xl font-bold text-slate-900">Expertos en integridad y eficiencia para la industria petrolera</h2>
      <p className="mt-4 text-base text-slate-600">
        Diseñamos soluciones modulares que combinan experiencia técnica, tecnología y cumplimiento normativo.
      </p>
    </div>
    <div className="mt-12 grid gap-6 md:grid-cols-2">
      {services.map((service) => (
        <article
          key={service.title}
          className={`rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
            service.highlight ? 'border-primary shadow-lg ring-2 ring-primary/10' : ''
          }`}
        >
          <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
          <p className="mt-3 text-sm text-slate-600">{service.description}</p>
          <button className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700">
            Solicitar servicio
          </button>
        </article>
      ))}
    </div>
  </section>
);
