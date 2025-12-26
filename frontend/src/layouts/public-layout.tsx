import { useEffect, useRef, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import logoLight from '../assets/images/logo/fualtec.webp';
import logoDark from '../assets/images/logo/fualtec-dark.webp';
import { Tooltip } from '../components/ui/tooltip';


const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/descargas', label: 'Descargas' },
  { to: '/contacto', label: 'Contacto' },
];

export const PublicLayout = () => {
  const [openClient, setOpenClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

const open = () => {
  if (closeTimer.current) clearTimeout(closeTimer.current);
  setOpenClient(true);
};

const scheduleClose = () => {
  if (closeTimer.current) clearTimeout(closeTimer.current);
  closeTimer.current = setTimeout(() => setOpenClient(false), 180);
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

  return (
    <div className="flex min-h-screen flex-col">
      {/* HEADER: blanco arriba; azul translúcido con blur al hacer scroll */}
      <header
        className={[
          'sticky top-0 z-50 transition-colors',
          isScrolled
            ? 'bg-[rgba(10,31,68,0.80)] backdrop-blur-md'
            : 'bg-white',
          // líneas sutiles
          'before:content-[""] before:absolute before:inset-x-0 before:top-0 before:h-[2px]',
          isScrolled ? 'before:bg-white/10' : 'before:bg-[#0A1F44]/15',
          'after:content-[""] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px]',
          isScrolled ? 'after:bg-white/10' : 'after:bg-[#0A1F44]/15',
          'shadow-sm',
        ].join(' ')}
      >
        <nav className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-8 py-5">
          {/* Logo */}
          <nav className="flex items-center justify-between h-[80px] px-8 py-0">
            <NavLink to="/" className="flex items-center leading-none">
            <img
              src={isScrolled ? logoDark : logoLight}
              alt="Fualtec logo"
              className="block h-[115px] w-auto object-contain m-0 p-0 transition-all duration-300"
            />
            </NavLink>
          </nav>



          {/* Navegación Desktop */}
          <div className="hidden items-center gap-3 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}

            {/* Dropdown Atención al Cliente */}
            <div
              className="relative"
              onMouseEnter={open}
              onMouseLeave={scheduleClose}
              onFocus={open}
              onBlur={scheduleClose}
            >
              <button
                aria-haspopup="menu"
                aria-expanded={openClient}
                className={[
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
                ].join(' ')}
              >
                Atención al Cliente
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
                  onMouseEnter={open}
                  onMouseLeave={scheduleClose}
                >
                  {[
                    {
                      to: '/formulario-de-satisfaccion',
                      title: 'Formulario de satisfacción',
                      note: 'Evalúa nuestro servicio y atención.',
                    },
                    {
                      to: '/quejas-y-apelaciones',
                      title: 'Formulario de quejas y apelaciones',
                      note: 'Registra una inconformidad o solicitud formal.',
                    },
                  ].map(({ to, title, note }) => (
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
                      <span
                        className={[
                          'block text-xs',
                          isScrolled ? 'text-white/70' : 'text-slate-500',
                        ].join(' ')}
                      >
                        {note}
                      </span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Íconos sociales (sin círculo; pill en hover) */}
            <div className="ml-3 mr-3 flex items-center gap-1.5 pl-3">
              {[
                {
                  href: 'https://www.tiktok.com/@fualtec',
                  label: 'TikTok',
                  svg: (
                    <path d="M34 14.4c2.1 1.6 4.7 2.6 7.5 2.8v6.8c-3.3-.1-6.4-1.1-9-2.8v12.2c0 7-5.7 12.6-12.6 12.6S7.2 40.4 7.2 33.5 12.9 20.9 19.8 20.9c1.2 0 2.4.2 3.5.6v7a6.6 6.6 0 0 0-3.5-1c-3.2 0-5.9 2.7-5.9 6s2.6 6 5.9 6c3.2 0 5.9-2.7 5.9-6V6h7.1V14.4Z" />
                  ),
                  viewBox: '0 0 48 48',
                },
                {
                  href: 'https://www.instagram.com/fualtec',
                  label: 'Instagram',
                  svg: (
                    <>
                      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="17.5" cy="6.5" r="1.6" />
                    </>
                  ),
                  viewBox: '0 0 24 24',
                },
                {
                  href: 'https://www.facebook.com/fualtec',
                  label: 'Facebook',
                  svg: <path d="M13 10h3V7h-3c-1.7 0-3 1.3-3 3v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z" />,
                  viewBox: '0 0 24 24',
                },
              ].map(({ href, label, svg, viewBox }) => (
                <Tooltip key={label} content={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    aria-label={label}
                    className={[
                      'inline-flex items-center justify-center px-3 py-2 rounded-lg transition',
                      isScrolled
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-[#0A1F44]/90 hover:text-[#0A1F44] hover:bg-slate-200/70',
                    ].join(' ')}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox={viewBox}
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      {svg}
                    </svg>
                  </a>
                </Tooltip>
              ))}
            </div>

            {/* CTA Portal */}
            <NavLink
              to="/client-access"
              className={[
                'rounded-xl px-5 py-3 text-sm font-semibold shadow-md transition',
                'hover:opacity-95 hover:shadow-lg',
                isScrolled ? 'bg-white text-[#0A1F44]' : 'bg-[#8B0000] text-white shadow-[#8B0000]/30',
              ].join(' ')}
            >
              Acceso Clientes
            </NavLink>
          </div>
        </nav>
      </header>

      {/* MAIN: tus vistas mandan su propio color */}
      <main className="flex-1">
        <Outlet />
      </main>

{/* FOOTER corporativo petrolero con 1ª columna más ancha */}
<footer className="relative bg-[#0A1F44] border-t border-white/10 text-slate-200 pt-16 pb-10 overflow-hidden">
  {/* fondo */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(0,125,255,0.15),transparent_70%),radial-gradient(circle_at_70%_20%,rgba(255,0,70,0.1),transparent_60%)]"></div>

  <div className="relative z-10 mx-auto max-w-7xl px-8 grid gap-y-10 gap-x-12 lg:gap-x-24
                  md:[grid-template-columns:1.8fr_1fr_1fr_1fr]">
    {/* 1. Identidad (columna amplia) */}
    <div className="space-y-4 pr-2">
      <h2 className="text-2xl font-semibold text-white">Fualtec</h2>
      <p className="text-sm leading-relaxed text-slate-300">
        Soluciones integrales para la industria petrolera con foco en seguridad, eficiencia y cumplimiento.
      </p>
      <div className="flex items-center gap-4 pt-2">
        <a href="#" className="hover:text-blue-400 transition-colors"><i className="ri-linkedin-box-fill text-2xl"></i></a>
        <a href="#" className="hover:text-blue-400 transition-colors"><i className="ri-facebook-circle-fill text-2xl"></i></a>
        <a href="#" className="hover:text-blue-400 transition-colors"><i className="ri-twitter-x-line text-2xl"></i></a>
      </div>
    </div>

    {/* 2. Enlaces */}
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white mb-4 border-b border-blue-500/50 pb-1 w-fit">Enlaces útiles</h3>
      <ul className="space-y-2 text-sm leading-relaxed">
        <li><a href="/servicios" className="hover:text-blue-400">Servicios</a></li>
        <li><a href="/descargas" className="hover:text-blue-400">Descargas</a></li>
        <li><a href="/contacto" className="hover:text-blue-400">Contacto</a></li>
        <li><a href="/soporte" className="hover:text-blue-400">Atención al cliente</a></li>
      </ul>
    </div>

    {/* 3. Legal */}
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white mb-4 border-b border-blue-500/50 pb-1 w-fit">Legal y Políticas</h3>
      <ul className="space-y-2 text-sm leading-relaxed">
        <li><a href="/terminos" className="hover:text-blue-400">Términos y condiciones</a></li>
        <li><a href="/privacidad" className="hover:text-blue-400">Política de privacidad</a></li>
        <li><a href="/cookies" className="hover:text-blue-400">Uso de cookies</a></li>
        <li><a href="/legal" className="hover:text-blue-400">Aviso legal</a></li>
      </ul>
    </div>

    {/* 4. Contacto */}
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white mb-4 border-b border-blue-500/50 pb-1 w-fit">Contacto</h3>
      <ul className="space-y-3 text-sm leading-relaxed">
        <li className="flex items-start gap-3">
          <i className="ri-mail-fill text-blue-400 mt-0.5"></i>
          <a href="mailto:contacto@fualtec.com" className="hover:text-blue-400">contacto@fualtec.com</a>
        </li>
        <li className="flex items-start gap-3">
          <i className="ri-phone-fill text-blue-400 mt-0.5"></i>
          <span>(+593) 99 123 4567</span>
        </li>
        <li className="flex items-start gap-3">
          <i className="ri-map-pin-fill text-blue-400 mt-0.5"></i>
          <span>Lago Agrio, Sucumbíos — Ecuador</span>
        </li>
      </ul>
    </div>
  </div>

  <div className="relative z-10 mt-12 border-t border-white/10"></div>
  <div className="relative z-10 text-center mt-6 text-sm text-slate-400">
    © {new Date().getFullYear()} Fualtec. Todos los derechos reservados.
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
