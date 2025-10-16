export const ContactPage = () => (
  <section className="mx-auto w-full max-w-6xl px-6 py-16">
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Contacto directo</p>
        <h2 className="text-3xl font-bold text-slate-900">Coordinemos su próximo proyecto</h2>
        <p className="text-sm text-slate-600">
          Nuestros consultores estarán encantados de agendar una reunión presencial o virtual para analizar su necesidad específica en operaciones petroleras costa afuera o en tierra firme.
        </p>
        <ul className="space-y-4 text-sm text-slate-700">
          <li>
            <strong>Dirección:</strong> Avenida Industria Petrolera, Torre Norte, Piso 12, Caracas, Venezuela
          </li>
          <li>
            <strong>Teléfonos:</strong> +58 (212) 555-0200 / +58 (212) 555-0201
          </li>
          <li>
            <strong>Correo:</strong> contacto@midominio.com
          </li>
        </ul>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Coordenadas operativas</h3>
          <p className="mt-2 text-xs text-slate-500">Lat: 10.491, Lon: -66.903</p>
          <p className="mt-2 text-xs text-slate-500">
            WhatsApp corporativo: <span className="font-semibold text-primary">+58 424-555-0101</span>
          </p>
        </div>
      </div>
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
        <iframe
          title="Mapa corporativo"
          src="https://maps.google.com/maps?q=Caracas%20Venezuela&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="h-full w-full"
          loading="lazy"
        />
      </div>
    </div>
  </section>
);
