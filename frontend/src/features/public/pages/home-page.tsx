import { Link } from 'react-router-dom';

export const HomePage = () => (
  <section className="bg-gradient-to-b from-white to-blue-50">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 lg:flex-row lg:items-center">
      <div className="flex-1 space-y-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Sector petrolero</p>
        <h1 className="text-4xl font-bold text-slate-900 lg:text-5xl">
          Operaciones confiables para un futuro energético sostenible
        </h1>
        <p className="text-lg text-slate-600">
          Acompañamos a compañías petroleras con soluciones de inspección, integridad y gestión documental que garantizan seguridad y cumplimiento normativo en cada activo.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/servicios"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            Conoce más
          </Link>
          <Link
            to="/client-access"
            className="inline-flex items-center justify-center rounded-md border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-blue-50"
          >
            Acceso Clientes
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <div className="rounded-xl border border-blue-100 bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Portal exclusivo</p>
          <h2 className="mt-4 text-2xl font-bold text-slate-900">Documentación estratégica en un solo lugar</h2>
          <p className="mt-3 text-sm text-slate-600">
            Descarga reportes técnicos, planes de inspección y publicaciones de auditoría disponibles exclusivamente para clientes autorizados.
          </p>
          <Link
            to="/client-access"
            className="mt-6 inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
          >
            Ir al portal
          </Link>
        </div>
      </div>
    </div>
  </section>
);
