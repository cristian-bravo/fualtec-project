import { Link } from "react-router-dom";

export const RegisterSuccess = () => (
  <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4">
    <div className="flex items-start gap-3">
      <svg width="24" height="24" viewBox="0 0 24 24" className="text-emerald-300" fill="currentColor">
        <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
      </svg>
      <div>
        <p className="font-semibold text-emerald-200">Registro enviado</p>
        <p className="text-sm text-emerald-100/90">
          Tu cuenta fue registrada. Revisa tu correo para verificar la dirección y espera la aprobación del
          administrador.
        </p>
      </div>
    </div>
    <div className="mt-4 flex items-center justify-between text-sm">
      <Link to="/client-access/login" className="text-blue-300 hover:text-blue-200 hover:underline">
        Ir al inicio de sesión
      </Link>
      <Link to="/" className="text-blue-300 hover:text-blue-200 hover:underline">
        Volver al sitio
      </Link>
    </div>
  </div>
);
