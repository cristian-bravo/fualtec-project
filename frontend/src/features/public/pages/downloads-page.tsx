const downloads = [
  { title: 'Brochure corporativo 2024', date: '01/03/2024' },
  { title: 'Guía de buenas prácticas HSE', date: '15/02/2024' },
  { title: 'Certificaciones vigentes', date: '10/01/2024' }
];

export const DownloadsPage = () => (
  <section className="mx-auto w-full max-w-6xl px-6 py-16">
    <header className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Documentos públicos</p>
      <h2 className="mt-3 text-3xl font-bold text-slate-900">Descargas disponibles</h2>
      <p className="mt-3 text-sm text-slate-600">
        Acceda a información institucional, fichas técnicas y lineamientos generales de nuestros servicios.
      </p>
    </header>
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {downloads.map((doc) => (
        <article key={doc.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">{doc.title}</h3>
          <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">Actualizado {doc.date}</p>
          <button className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700">
            Descargar PDF
          </button>
        </article>
      ))}
    </div>
  </section>
);
