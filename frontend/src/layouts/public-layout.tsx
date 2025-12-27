import { useEffect, useRef, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import logoLight from '../assets/images/logo/fualtec.webp';
import fualtecDark from '../assets/images/logo/fualtec-dark.webp';
import { Tooltip } from '../components/ui/tooltip';


const companyItems = [
  { to: '/quienes-somos', label: 'Quienes somos' },
  { to: '/historia', label: 'Nuestra historia' },
  { to: '/mision', label: 'Mision' },
  { to: '/vision', label: 'Vision' },
  { to: '/valores', label: 'Valores' },
];

const socialLinks = [
  {
    href: 'https://www.tiktok.com/@fualtec',
    label: 'TikTok',
    viewBox: '0 0 24 24',
    svg: (
      <path
        d="M15 3c.6 1.6 2 3 3.6 3.4V9c-1.5-.1-2.8-.7-3.6-1.6v6.1a5 5 0 1 1-5-5c.5 0 1 .1 1.5.3v2.7a2.5 2.5 0 1 0 1 2V3h2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: 'https://www.instagram.com/fualtec',
    label: 'Instagram',
    viewBox: '0 0 24 24',
    svg: (
      <>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </>
    ),
  },
  {
    href: 'https://www.facebook.com/fualtec',
    label: 'Facebook',
    viewBox: '0 0 24 24',
    svg: (
      <path
        d="M14 8h3V5h-3c-2 0-3 1.5-3 3.4V11H8v3h3v5h3v-5h3l1-3h-4V8.4c0-.3.2-.4.5-.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export const PublicLayout = () => {
  const [openCompany, setOpenCompany] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeClientTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeCompanyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openClientMenu = () => {
    if (closeClientTimer.current) clearTimeout(closeClientTimer.current);
    setOpenClient(true);
    setOpenCompany(false);
  };

  const scheduleCloseClientMenu = () => {
    if (closeClientTimer.current) clearTimeout(closeClientTimer.current);
    closeClientTimer.current = setTimeout(() => setOpenClient(false), 180);
  };

  const openCompanyMenu = () => {
    if (closeCompanyTimer.current) clearTimeout(closeCompanyTimer.current);
    setOpenCompany(true);
    setOpenClient(false);
  };

  const scheduleCloseCompanyMenu = () => {
    if (closeCompanyTimer.current) clearTimeout(closeCompanyTimer.current);
    closeCompanyTimer.current = setTimeout(() => setOpenCompany(false), 180);
  };

  // Links adaptan color según estado del header
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'relative px-3 py-2 rounded-md text-base font-medium select-none transition',
      isScrolled
        ? isActive
          ? 'text-white'
          : 'text-white/80 hover:text-white'
        : isActive
          ? 'text-[#0A1F44]'
          : 'text-[#0A1F44]/80 hover:text-[#0A1F44]',
      // subrayado animado
      'after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:transition-all',
      isScrolled ? 'after:bg-white' : 'after:bg-[#0A1F44]',
      isActive ? 'after:w-full' : 'hover:after:w-full',
      // accesibilidad
      isScrolled
        ? 'focus-visible:ring-2 focus-visible:ring-white/30'
        : 'focus-visible:ring-2 focus-visible:ring-[#0A1F44]/30',
    ].join(' ');

  const navButtonClass = [
    'relative px-3 py-2 rounded-md text-base font-medium select-none transition',
    isScrolled
      ? 'text-white/80 hover:text-white'
      : 'text-[#0A1F44]/80 hover:text-[#0A1F44]',
    'after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:transition-all',
    isScrolled ? 'after:bg-white' : 'after:bg-[#0A1F44]',
    'hover:after:w-full',
    isScrolled
      ? 'focus-visible:ring-2 focus-visible:ring-white/30'
      : 'focus-visible:ring-2 focus-visible:ring-[#0A1F44]/30',
  ].join(' ');

  return (
    <div className="flex min-h-screen flex-col">
      {/* HEADER: blanco arriba; azul translucido con blur al hacer scroll */}
      <header className="sticky top-0 z-50">
        <div
          className={[
            'relative transition-colors',
            isScrolled
              ? 'bg-[rgba(10,31,68,0.80)] backdrop-blur-md'
              : 'bg-white',
            // lineas sutiles
            'before:content-[""] before:absolute before:inset-x-0 before:top-0 before:h-[2px]',
            isScrolled ? 'before:bg-white/10' : 'before:bg-[#0A1F44]/15',
            'after:content-[""] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px]',
            isScrolled ? 'after:bg-white/10' : 'after:bg-[#0A1F44]/15',
            'shadow-sm',
          ].join(' ')}
        >
          <div
            className={[
              'border-b',
              isScrolled ? 'border-white/10' : 'border-[#0A1F44]/10',
            ].join(' ')}
          >
            <div className="mx-auto flex h-8 w-full max-w-[90rem] items-center justify-end gap-3 px-8 text-xs">
              <span
                className={[
                  'hidden sm:inline',
                  isScrolled ? 'text-white/80' : 'text-[#0A1F44]/70',
                ].join(' ')}
              >
                Siguenos
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ href, label, viewBox, svg }) => (
                  <Tooltip key={label} content={label} side="bottom">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener"
                      aria-label={label}
                      className={[
                        'inline-flex items-center justify-center text-[14px] leading-none transition',
                        isScrolled
                          ? 'text-white/80 hover:text-white'
                          : 'text-[#0A1F44]/70 hover:text-[#0A1F44]',
                        'hover:opacity-80',
                      ].join(' ')}
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox={viewBox}
                        aria-hidden="true"
                      >
                        {svg}
                      </svg>
                    </a>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>

          <nav className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-8 py-3">
            {/* Logo */}
            <div className="flex items-center h-[64px]">
              <NavLink to="/" className="flex items-center leading-none">
                <img
                  src={isScrolled ? fualtecDark : logoLight}
                  alt="Fualtec logo"
                  className="block h-[72px] w-auto object-contain m-0 p-0 transition-all duration-300"
                />
              </NavLink>
            </div>

            {/* Navegacion Desktop */}
            <div className="hidden items-center gap-2 md:flex">
              <NavLink to="/servicios" className={navLinkClass}>
                Servicios
              </NavLink>

              {/* Dropdown Nuestra empresa */}
              <div
                className="relative"
                onMouseEnter={openCompanyMenu}
                onMouseLeave={scheduleCloseCompanyMenu}
                onFocus={openCompanyMenu}
                onBlur={scheduleCloseCompanyMenu}
              >
                <button
                  aria-haspopup="menu"
                  aria-expanded={openCompany}
                  className={navButtonClass}
                >
                  Nuestra empresa
                </button>

                {openCompany && (
                  <div
                    role="menu"
                    className={[
                      'absolute left-0 mt-3 w-[260px] rounded-xl border p-2 shadow-2xl z-50',
                      isScrolled
                        ? 'border-white/15 bg-[rgba(10,31,68,0.92)] backdrop-blur-md'
                        : 'border-[#0A1F44]/15 bg-white',
                    ].join(' ')}
                    onMouseEnter={openCompanyMenu}
                    onMouseLeave={scheduleCloseCompanyMenu}
                  >
                    {companyItems.map(({ to, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        role="menuitem"
                        className={({ isActive }) =>
                          [
                            'block rounded-lg px-4 py-2 text-sm transition',
                            isScrolled
                              ? isActive
                                ? 'bg-white/10 text-white ring-1 ring-white/15'
                                : 'text-white/90 hover:bg-white/10 hover:text-white'
                              : isActive
                                ? 'bg-[#0A1F44]/10 text-[#0A1F44] ring-1 ring-[#0A1F44]/20'
                                : 'text-[#0A1F44]/90 hover:bg-[#0A1F44]/8 hover:text-[#0A1F44]',
                          ].join(' ')
                        }
                      >
                        {label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              <NavLink to="/descargas" className={navLinkClass}>
                Descargas
              </NavLink>
              <NavLink to="/contacto" className={navLinkClass}>
                Contacto
              </NavLink>

              {/* Dropdown Atencion al Cliente */}
              <div
                className="relative"
                onMouseEnter={openClientMenu}
                onMouseLeave={scheduleCloseClientMenu}
                onFocus={openClientMenu}
                onBlur={scheduleCloseClientMenu}
              >
                <button
                  aria-haspopup="menu"
                  aria-expanded={openClient}
                  className={navButtonClass}
                >
                  Atencion al Cliente
                </button>

                {openClient && (
                  <div
                    role="menu"
                    className={[
                      'absolute left-0 mt-3 w-[340px] rounded-2xl border p-2 shadow-2xl z-50',
                      isScrolled
                        ? 'border-white/15 bg-[rgba(10,31,68,0.92)] backdrop-blur-md'
                        : 'border-[#0A1F44]/15 bg-white',
                    ].join(' ')}
                    onMouseEnter={openClientMenu}
                    onMouseLeave={scheduleCloseClientMenu}
                  >
                    {[
                      {
                        to: '/formulario-de-satisfaccion',
                        title: 'Formulario de satisfaccion',
                      },
                      {
                        to: '/quejas-y-apelaciones',
                        title: 'Formulario de quejas y apelaciones',
                      },
                    ].map(({ to, title }) => (
                      <NavLink
                        key={to}
                        to={to}
                        role="menuitem"
                        className={({ isActive }) =>
                          [
                            'block rounded-xl px-4 py-3 text-sm transition',
                            isScrolled
                              ? isActive
                                ? 'bg-white/10 text-white ring-1 ring-white/15'
                                : 'text-white/90 hover:bg-white/10 hover:text-white'
                              : isActive
                                ? 'bg-[#0A1F44]/10 text-[#0A1F44] ring-1 ring-[#0A1F44]/20'
                                : 'text-[#0A1F44]/90 hover:bg-[#0A1F44]/8 hover:text-[#0A1F44]',
                          ].join(' ')
                        }
                      >
                        {title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              <div
                className={[
                  'mx-3 h-5 w-px',
                  isScrolled ? 'bg-white/20' : 'bg-[#0A1F44]/20',
                ].join(' ')}
              />



              {/* CTA Portal */}
              <NavLink
                to="/client-access"
                className={[
                  'rounded-xl px-5 py-3 text-sm font-semibold shadow-md transition',
                  'hover:opacity-95 hover:shadow-lg',
                  isScrolled
                    ? 'bg-white text-[#0A1F44]'
                    : 'bg-[#8B0000] text-white shadow-[#8B0000]/30',
                ].join(' ')}
              >
                Acceso Clientes
              </NavLink>
            </div>
          </nav>
        </div>
      </header>

      {/* MAIN: tus vistas mandan su propio color */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER corporativo */}
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
                      <svg
                        className="h-4 w-4"
                        viewBox={viewBox}
                        aria-hidden="true"
                      >
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
                      contacto@fualtec.com
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
                    <span>(+593) 99 123 4567</span>
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
          &copy; 2025 FUALTEC &middot; Plataforma de acceso seguro
        </div>
      </footer>


      {/* BOTÓN FLOTANTE WHATSAPP — fondo transparente, ícono grande */}
      {/* BOTÓN FLOTANTE WHATSAPP — sticker centrado y limpio */}
<div className="fixed right-5 bottom-5 z-[60]">
  <Tooltip content="WhatsApp">
<a
  href="https://wa.me/593999999999"
  target="_blank"
  rel="noopener"
  aria-label="WhatsApp"
    className="inline-flex h-16 w-16 items-center justify-center transition-transform hover:scale-[1.05] focus:outline-none"
>
  <svg
    viewBox="0 0 64 64"
    width="100%"
    height="100%"
    aria-hidden="true"
    style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.25))' }}
  >
    {/* Anillo blanco + círculo verde (centro en 32,30) */}
    <circle cx="32" cy="30" r="24" fill="#25D366" stroke="#FFFFFF" strokeWidth="6" />

    {/* Cola blanca (sticker) */}
    <path d="M22 49 L19 60 L29 54 Z" fill="#FFFFFF" />

    {/* Ícono centrado EXACTO en el centro del círculo (32,30) */}
    <svg
      x="17"
      y="16"
      width="60"
      height="60"
      viewBox="0 0 24 24"
      style={{ transform: 'translate(-15px, -15px)' }}
    >
      <path
        fill="#FFFFFF"
        d="M16.57 13.5c-.23-.11-1.36-.67-1.57-.75-.21-.08-.36-.11-.51.11-.15.22-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.11-.96-.35-1.83-1.11-.68-.61-1.14-1.36-1.27-1.59-.13-.23-.01-.35.1-.46.1-.1.23-.26.34-.39.11-.13.15-.22.23-.37.08-.15.04-.28-.02-.39-.06-.11-.51-1.24-.7-1.7-.18-.43-.37-.37-.51-.38h-.43c-.15 0-.39.06-.6.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.2.93 2.35.11.15 1.6 2.45 3.87 3.43.54.23.96.37 1.29.47.54.17 1.03.15 1.42.09.43-.06 1.36-.55 1.55-1.08.19-.53.19-.98.13-1.08-.06-.1-.21-.16-.43-.27z"
      />
    </svg>
  </svg>
</a>
  </Tooltip>
</div>

    </div>
  );
};



