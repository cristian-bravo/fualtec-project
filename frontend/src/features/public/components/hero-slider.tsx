import { Link } from 'react-router-dom';
import { Tooltip } from '../../../components/ui/tooltip';
import { useHeroSlider } from '../hooks/use-hero-slider';
import {
  HERO_INDUSTRIAL_SLIDE_INDEX,
  HERO_MAIN_SLIDE_INDEX,
  HERO_RIGHT_TEXT_SLIDE_INDEX,
  HERO_SLIDES,
} from '../services/hero-slider';

export const HeroSlider = () => {
  const { index, setPaused, goTo, next, prev } = useHeroSlider(
    HERO_SLIDES.length
  );

  return (
    <section
      className="relative h-[calc(100vh-120px)] min-h-[520px] w-full overflow-hidden bg-[#071326]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
            i === index
              ? i === HERO_INDUSTRIAL_SLIDE_INDEX
                ? 'opacity-0'
                : 'opacity-100'
              : 'opacity-0'
          }`}
        />
      ))}

      {/* Overlay azul estilo referencia */}
      {index !== HERO_INDUSTRIAL_SLIDE_INDEX && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#061222]/60 via-[#081a35]/40 to-[#0A1F44]/80" />
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(60rem_30rem_at_10%_10%,rgba(59,130,246,0.18),transparent),radial-gradient(40rem_20rem_at_90%_20%,rgba(16,185,129,0.08),transparent)]" />
        </>
      )}

      {/* CTA superior opcional (al estilo pill)
      <div className="absolute left-1/2 top-8 -translate-x-1/2">
        <Link
          to="/servicios"
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
        >
          Conoce nuestros servicios ƒÅ'
        </Link>
      </div> */}

      {/* Texto principal del hero (solo en la primera imagen) */}
      {index === HERO_MAIN_SLIDE_INDEX && (
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6">
          <div className="max-w-2xl space-y-5 text-white">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Alta Tecnologia
              <br />
              en Servicios
              <br />
              de Inspeccion
            </h1>
            <p className="max-w-xl text-lg text-white/85">
              Confianza y precision en ensayos no destructivos para la industria
              petrolera.
            </p>
            <Link
              to="/servicios"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Conoce nuestros servicios
            </Link>
          </div>
        </div>
      )}

      {/* Texto del hero en slider 2 (mismo estilo que slider 1, alineado a la derecha) */}
      {index === HERO_RIGHT_TEXT_SLIDE_INDEX && (
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 md:px-16">
        <div className="ml-auto mr-0 max-w-xl space-y-5 rounded-xl bg-[#0A1F44]/55 p-6 backdrop-blur-sm text-white text-center translate-x-12">
          
          <h1 className="text-3xl md:text-4xl font-semibold leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            Empresa especializada en ensayos no destructivos e inspección industrial.
          </h1>

          <div className="flex justify-center">
            <Link
              to="/quienes-somos"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:opacity-90"
            >
              Quiénes somos
            </Link>
          </div>

        </div>
      </div>
      )}

      {/* Slide 3: imagen full + card flotante */}
      {index === HERO_INDUSTRIAL_SLIDE_INDEX && (
  <div className="absolute inset-0 z-0">

    {/* Imagen full */}
    <img
      src={HERO_SLIDES[HERO_INDUSTRIAL_SLIDE_INDEX].src}
      alt={HERO_SLIDES[HERO_INDUSTRIAL_SLIDE_INDEX].alt}
      className="absolute inset-0 h-full w-full object-cover"
    />

    {/* Overlay corporativo */}
    <div className="absolute inset-0 bg-gradient-to-l from-[#071326]/80 via-[#0A1F44]/55 to-transparent" />
    <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(40rem_25rem_at_75%_40%,rgba(59,130,246,0.16),transparent)]" />

    {/* CONTENIDO */}
    <div className="relative z-10 grid h-full w-full grid-cols-12 items-center px-6">

      {/* espacio izquierdo */}
      <div className="col-span-5 hidden lg:block" />

      {/* CARD */}
      <div className="col-span-12 lg:col-span-6">
        <div className="ml-auto w-full max-w-md rounded-xl bg-[#0A1F44]/55 p-6 text-center text-white shadow-xl backdrop-blur-sm sm:p-7">

          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Inspección en campo
          </h2>

          <div className="mt-4 space-y-2 text-lg font-semibold">
            {['Cumplimiento', 'Trazabilidad', 'Seguridad'].map((label) => (
              <div key={label} className="flex items-center justify-center gap-3">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <Link
            to="/contacto"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            Contáctanos
          </Link>

        </div>
      </div>

    </div>
  </div>
)}


      {/* Controles */}
      <div className="absolute left-4 top-1/2 z-20 -translate-y-1/2">
        <Tooltip content="Anterior">
          <button
            aria-label="Anterior"
            onClick={prev}
            className="rounded-full bg-black/30 p-3 text-white backdrop-blur transition hover:bg-black/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </Tooltip>
      </div>
      <div className="absolute right-4 top-1/2 z-20 -translate-y-1/2">
        <Tooltip content="Siguiente">
          <button
            aria-label="Siguiente"
            onClick={next}
            className="rounded-full bg-black/30 p-3 text-white backdrop-blur transition hover:bg-black/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </Tooltip>
      </div>

      {/* Bullets */}
      <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === index
                ? 'bg-primary ring-2 ring-white/60'
                : 'bg-white/60 hover:bg-white'
            }`}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
