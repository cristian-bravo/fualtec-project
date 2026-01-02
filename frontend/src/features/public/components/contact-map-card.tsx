export const ContactMapCard = () => (
  <div className="relative">
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#081a35] shadow-2xl ring-1 ring-white/10 transition hover:ring-white/20">
      <div className="absolute inset-0 [background:radial-gradient(60rem_30rem_at_120%_120%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
      <iframe
        title="Mapa corporativo"
        src="https://maps.google.com/maps?q=Lago%20Agrio%20Ecuador&t=&z=13&ie=UTF8&iwloc=&output=embed"
        className="h-full w-full opacity-95"
        loading="lazy"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#8B0000] via-white/80 to-blue-400 opacity-0 transition group-hover:opacity-100" />
    </div>
    <div className="absolute -top-3 left-4 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur">
      Sede Lago Agrio
    </div>
  </div>
);
