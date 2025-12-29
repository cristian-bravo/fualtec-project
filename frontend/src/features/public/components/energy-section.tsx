import { Link } from 'react-router-dom';

export const EnergySection = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-[#081a35] via-[#0A1F44] to-[#071326]">
    {/* lÇðneas/luces sutiles */}
    <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(80rem_40rem_at_-10%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(60rem_30rem_at_110%_-10%,rgba(16,185,129,0.12),transparent)]" />

    <div className="relative mx-auto w-full max-w-7xl px-6 py-20">
      {/* Texto estilo ƒ?omodeloƒ?? */}
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
            Servicios NDT para activos críticos
          </p>
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Inspección y <span className="text-sky-300">ensayos no destructivos</span> para
            operaciones petroleras <span className="text-sky-300">seguras</span>
          </h2>
          <p className="max-w-xl text-lg text-slate-300">
            Ensayos no destructivos, inspección en campo y gestión de evidencias técnicas
            alineadas a normas API, ASME e ISO para activos críticos.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/servicios"
              className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Solicitar inspección
            </Link>
            {/* <Link
              to="/client-access"
              className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/5"
            >
              Acceso Clientes
            </Link> */}
          </div>
        </div>

        {/* Cards estilo glass (como los paneles del mock) */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Card 1 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
            <p className="text-sm font-medium text-blue-200">API 510 · API 570 · API 653</p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              Inspección e Integridad de Activos
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Programas RBI, inspección en servicio y trazabilidad de hallazgos en
              recipientes a presión, tuberías y tanques de almacenamiento.
            </p>
            <div className="mt-4 h-2 w-1/2 rounded-full bg-white/10">
              <div className="h-2 w-3/4 rounded-full bg-sky-400/80" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
            <p className="text-sm font-medium text-blue-200">Gestión de Evidencias Técnicas</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Portal de Evidencias</h3>
            <p className="mt-2 text-sm text-slate-300">
              Reportes NDT, certificados, registros fotográficos y auditorías disponibles 24/7
              para clientes.
            </p>
            <Link
              to="/client-access"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200"
            >
              Ir al portal
            </Link>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur sm:col-span-2">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-medium text-blue-200">
                  HSE · ISO · Normativas del sector
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  Seguridad y Cumplimiento Normativo
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Procesos alineados a ISO 9001, ISO 14001 y estándares HSE de la industria
                  petrolera.
                </p>
              </div>
              <Link
                to="/descargas"
                className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Descargar
              </Link>
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
);
