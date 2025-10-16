import { Link } from 'react-router-dom';

export const ClientAccessLanding = () => (
  <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 text-white">
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Portal seguro</p>
        <h1 className="mt-4 text-4xl font-bold">Acceso exclusivo para clientes autorizados</h1>
        <p className="mt-3 text-base text-slate-300">
          Gestione documentos técnicos, publicaciones de auditoría y asignaciones personalizadas dentro de una plataforma diseñada para el sector petrolero.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          to="/client-access/login"
          className="w-full max-w-xs rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/client-access/register"
          className="w-full max-w-xs rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white"
        >
          Solicitar registro
        </Link>
      </div>
    </div>
  </div>
);
