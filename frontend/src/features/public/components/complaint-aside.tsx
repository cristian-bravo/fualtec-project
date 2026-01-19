export const ComplaintAside = () => (
  <aside className="space-y-6">
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-sm font-semibold text-slate-900">Transparencia y trazabilidad</h3>
      <p className="mt-3 text-sm text-slate-700">
        Cada registro genera un seguimiento interno con tiempos de respuesta y
        responsables definidos.
      </p>
    </div>
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h4 className="text-sm font-semibold text-slate-900">Soporte</h4>
      <p className="mt-2 text-sm text-slate-700">
        Si requieres asistencia para completar el formulario, contáctenos.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href="https://wa.me/593984567890"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white bg-[#0A1F44] hover:opacity-95"
        >
          WhatsApp
        </a>
        <a
          href="mailto:contacto@fualtec.com?subject=Quejas%20y%20Apelaciones"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#0A1F44] bg-slate-100 hover:bg-slate-200"
        >
          Correo
        </a>
      </div>
    </div>
  </aside>
);
