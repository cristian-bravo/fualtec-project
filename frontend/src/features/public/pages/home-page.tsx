import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import hero1 from "../../../assets/images/hero/hero1.webp";
import hero2 from "../../../assets/images/hero/hero2.webp";
import hero3 from "../../../assets/images/hero/hero3.webp";



const SLIDE_INTERVAL_MS = 5000;

// ---------- HERO SLIDER ----------
function HeroSlider() {
  const slides = useMemo(
    () => [
      { src: hero1, alt: 'Líneas de transmisión' },
      { src: hero2, alt: 'Plataforma petrolera' },
      { src: hero3, alt: 'Inspección técnica' },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = (i) => setIndex((i + slides.length) % slides.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, SLIDE_INTERVAL_MS);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  return (
    <section
      className="relative h-[72vh] min-h-[520px] w-full overflow-hidden bg-[#071326]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      {/* Overlay azul estilo referencia */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061222]/60 via-[#081a35]/40 to-[#0A1F44]/80" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(60rem_30rem_at_10%_10%,rgba(59,130,246,0.18),transparent),radial-gradient(40rem_20rem_at_90%_20%,rgba(16,185,129,0.08),transparent)]" />

      {/* CTA superior opcional (al estilo pill) */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2">
        <Link
          to="/servicios"
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
        >
          Conoce nuestros servicios →
        </Link>
      </div>

      {/* Controles */}
      <button
        aria-label="Anterior"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur transition hover:bg-black/50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        aria-label="Siguiente"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur transition hover:bg-black/50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Bullets */}
      <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${i === index ? 'bg-primary ring-2 ring-white/60' : 'bg-white/60 hover:bg-white'}`}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ---------- HOME ----------
export const HomePage = () => {
  return (
    <main className="bg-[#0A1F44]">
      {/* 1) HERO full section */}
      <HeroSlider />

      {/* 2) SECCIÓN OSCURA (no blanca), con letras + cards glass como el modelo */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#081a35] via-[#0A1F44] to-[#071326]">
        {/* líneas/luces sutiles */}
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(80rem_40rem_at_-10%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(60rem_30rem_at_110%_-10%,rgba(16,185,129,0.12),transparent)]" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-20">
          {/* Texto estilo “modelo” */}
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                Built for the Energy Sector
              </p>
              <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Operaciones <span className="text-sky-300">confiables</span> para un futuro
                <br className="hidden sm:block" />
                energético <span className="text-sky-300">sostenible</span>
              </h2>
              <p className="max-w-xl text-lg text-slate-300">
                Soluciones de inspección, integridad y gestión documental que elevan la seguridad,
                la confiabilidad de activos y el cumplimiento normativo en cada etapa.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/servicios"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
                >
                  Conoce más
                </Link>
                <Link
                  to="/client-access"
                  className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/5"
                >
                  Acceso Clientes
                </Link>
              </div>
            </div>

            {/* Cards estilo glass (como los paneles del mock) */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Card 1 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
                <p className="text-sm font-medium text-blue-200">Inspección e Integridad</p>
                <h3 className="mt-2 text-xl font-semibold text-white">API 510/570/653</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Programas RBI, planes de inspección y trazabilidad de hallazgos.
                </p>
                <div className="mt-4 h-2 w-1/2 rounded-full bg-white/10">
                  <div className="h-2 w-3/4 rounded-full bg-sky-400/80" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
                <p className="text-sm font-medium text-blue-200">Gestión Documental</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Portal de Evidencias</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Reportes técnicos, certificados y auditorías disponibles 24/7 para clientes.
                </p>
                <Link
                  to="/client-access"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200"
                >
                  Ir al portal →
                </Link>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur sm:col-span-2">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-medium text-blue-200">Seguridad & Cumplimiento</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">HSE & Normativas</h3>
                    <p className="mt-2 text-sm text-slate-300">
                      Alineados a ISO 9001 / 45001 / 14001 y estándares del sector.
                    </p>
                  </div>
                  <button className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                    Descargar Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Banda de logos (opcional) */}
          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-6 opacity-80">
            <div className="h-6 w-24 rounded bg-white/10" />
            <div className="h-6 w-24 rounded bg-white/10" />
            <div className="h-6 w-24 rounded bg-white/10" />
            <div className="h-6 w-24 rounded bg-white/10" />
          </div>
        </div>
      </section>
    </main>
  );
};
