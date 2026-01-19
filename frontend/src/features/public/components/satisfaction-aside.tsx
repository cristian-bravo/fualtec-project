export const SatisfactionAside = () => (
  <aside className="space-y-6">
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-sm font-semibold text-slate-900">Gracias por compartir</h3>
      <p className="mt-3 text-sm text-slate-700">
        Tu experiencia es valiosa. Leemos cada comentario para tomar mejores decisiones.
      </p>
      <p className="mt-3 text-xs text-slate-500">
        Pequeñas mejoras generan grandes resultados con el tiempo.
      </p>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h4 className="text-sm font-semibold text-slate-900">Te respondemos pronto</h4>
      <p className="mt-2 text-sm text-slate-700">
        Si dejaste tu correo, nos pondremos en contacto a la brevedad.
      </p>
      <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
        <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-[#8B0000] to-blue-500" />
      </div>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h4 className="text-sm font-semibold text-slate-900">Necesitas algo ahora mismo?</h4>
      <p className="mt-2 text-sm text-slate-700">
        Si es urgente, escríbenos por WhatsApp o envíanos un correo.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href="https://wa.me/593994342217"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white bg-[#0A1F44] hover:opacity-95"
        >
          WhatsApp
        </a>
        <a
          href="mailto:contacto@fualtec.com?subject=Soporte"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#0A1F44] bg-slate-100 hover:bg-slate-200"
        >
          Correo
        </a>
      </div>
    </div>
  </aside>
);
