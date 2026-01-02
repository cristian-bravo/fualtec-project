export const ContactInfoCard = () => (
  <article className="rounded-2xl border border-white/10 bg-[#0b244f]/90 backdrop-blur-md p-6 transition hover:-translate-y-1 hover:shadow-2xl hover:border-white/20">
    <h2 className="text-lg font-semibold text-white mb-4">Informacion de contacto</h2>
    <ul className="space-y-4 text-sm text-slate-200/90">
      <li className="flex gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
          <svg width="18" height="18" viewBox="0 0 24 24" className="text-white" aria-hidden="true">
            <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/>
          </svg>
        </span>
        <div>
          <p className="font-medium text-white">Dirección</p>
          <p className="text-slate-300">Av. Quito y Av. Amazonas, Lago Agrio, Sucumbios - Ecuador</p>
        </div>
      </li>
      <li className="flex gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
          <svg width="18" height="18" viewBox="0 0 24 24" className="text-white" aria-hidden="true">
            <path fill="currentColor" d="M6.6 10.8c1.2 2.4 3.2 4.4 5.6 5.6l1.9-1.9c.3-.3.8-.4 1.1-.2 1.2.4 2.5.7 3.8.7.6 0 1 .4 1 .9V19c0 .6-.4 1-1 1C10.6 20 4 13.4 4 5c0-.6.4-1 1-1h3.1c.5 0 .9.4.9 1 0 1.3.2 2.6.7 3.8.1.4 0 .8-.3 1.1l-1.8 1.9Z"/>
          </svg>
        </span>
        <div>
          <p className="font-medium text-white">Telefonos</p>
          <p className="text-slate-300">+593 99 434 2217 / +593 98 456 7891</p>
        </div>
      </li>
      <li className="flex gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
          <svg width="18" height="18" viewBox="0 0 24 24" className="text-white" aria-hidden="true">
            <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v.4l10 6.2 10-6.2V6a2 2 0 0 0-2-2Zm0 4.2-8 5-8-5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.2Z"/>
          </svg>
        </span>
        <div>
          <p className="font-medium text-white">Correo</p>
          <a
            href="mailto:contacto@fualtec.com"
            className="text-slate-300 hover:text-white underline decoration-white/30 underline-offset-4"
          >
            info@fualtec.com.ec
          </a>
        </div>
      </li>
    </ul>

    <div className="mt-6 flex flex-wrap gap-3">
      <a
        href="https://wa.me/593984567890"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 ring-1 ring-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 12a8 8 0 0 1-11.9 7l-3.1.9.9-3.1A8 8 0 1 1 20 12Z" stroke="white" strokeWidth="2"/>
          <path d="M9.5 9.5c.3 2 2.5 3.8 4 4l1-.9c.2-.2.6-.1.8.1l.9.9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        WhatsApp corporativo
      </a>
      <a
        href="mailto:contacto@fualtec.com?subject=Consulta%20corporativa"
        className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-[#0A1F44] bg-white hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16v12H4z" stroke="#0A1F44" strokeWidth="2"/><path d="m4 7 8 6 8-6" stroke="#0A1F44" strokeWidth="2" />
        </svg>
        Escribir correo
      </a>
    </div>
  </article>
);
