import { NavLink } from 'react-router-dom';
import fualtecDark from '../../../assets/images/logo/fualtec-dark.webp';
import { Tooltip } from '../../../components/ui/tooltip';
import { socialLinks } from '../services/navigation-data';

export const PublicFooter = () => (
  <footer className="relative overflow-hidden bg-[#0A1F44] text-slate-200">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_80%,rgba(0,125,255,0.08),transparent_70%),radial-gradient(circle_at_75%_15%,rgba(255,60,80,0.05),transparent_65%)]"></div>
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"></div>

    <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-14 sm:px-8">
      <div className="grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <div className="relative z-10">
            <img
              src={fualtecDark}
              alt="FUALTEC"
              className="h-12 w-auto object-contain sm:h-14"
            />
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            Servicios NDT para operaciones petroleras seguras y trazables.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, viewBox, svg }) => (
              <Tooltip key={label} content={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="inline-flex items-center justify-center text-[16px] leading-none text-slate-300 transition hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox={viewBox} aria-hidden="true">
                    {svg}
                  </svg>
                </a>
              </Tooltip>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-white">Accesos clave</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>
              <NavLink
                to="/client-access"
                className="inline-flex items-center gap-2 transition hover:translate-x-1 hover:text-white"
              >
                Acceso clientes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/descargas"
                className="inline-flex items-center gap-2 transition hover:translate-x-1 hover:text-white"
              >
                Descargas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/formulario-de-satisfaccion"
                className="inline-flex items-center gap-2 transition hover:translate-x-1 hover:text-white"
              >
                Atencion al cliente
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacto"
                className="inline-flex items-center gap-2 transition hover:translate-x-1 hover:text-white"
              >
                Contacto
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-white">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-4 w-4 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M4 6h16v12H4z" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
                <a
                  href="mailto:contacto@fualtec.com"
                  className="transition hover:translate-x-1 hover:text-white"
                >
                  info@fualtec.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-4 w-4 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.6 19.6 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7l.4 2.2a2 2 0 0 1-.6 1.9l-1.2 1.2a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 1.9-.6l2.2.4A2 2 0 0 1 22 16.9Z" />
                </svg>
                <span>(+593) 99 434 2217</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-4 w-4 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M12 22s7-7.4 7-12a7 7 0 1 0-14 0c0 4.6 7 12 7 12Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span>Lago Agrio, Sucumbios - Ecuador</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>
                <NavLink
                  to="/terminos-y-condiciones"
                  className="inline-flex items-center gap-2 transition hover:translate-x-1 hover:text-white"
                >
                  Terminos y condiciones
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/politica-de-privacidad"
                  className="inline-flex items-center gap-2 transition hover:translate-x-1 hover:text-white"
                >
                  Politica de privacidad
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/uso-de-cookies"
                  className="inline-flex items-center gap-2 transition hover:translate-x-1 hover:text-white"
                >
                  Uso de cookies
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="relative z-10 border-t border-white/10 py-4 text-center text-xs text-slate-400/70">
      &copy; 2026 FUALTEC &middot; Plataforma de acceso seguro
    </div>
  </footer>
);
