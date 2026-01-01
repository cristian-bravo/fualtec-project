import { NavLink } from 'react-router-dom';
import logoLight from '../../../assets/images/logo/fualtec.webp';
import fualtecDark from '../../../assets/images/logo/fualtec-dark.webp';
import { Tooltip } from '../../../components/ui/tooltip';
import { usePublicHeader } from '../hooks/use-public-header';
import { companyItems, socialLinks } from '../services/navigation-data';

export const PublicHeader = () => {
  const {
    isScrolled,
    openCompany,
    openClient,
    openClientMenu,
    scheduleCloseClientMenu,
    openCompanyMenu,
    scheduleCloseCompanyMenu,
  } = usePublicHeader();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'relative px-3 py-2 rounded-md text-base font-medium select-none transition-opacity',
      isScrolled
        ? isActive
          ? 'text-white'
          : 'text-white/80 hover:text-white'
        : isActive
          ? 'text-[#0A1F44]'
          : 'text-[#0A1F44]/80 hover:text-[#0A1F44]',
      'after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:transition-all',
      isScrolled ? 'after:bg-white' : 'after:bg-[#0A1F44]',
      isActive ? 'after:w-full' : 'hover:after:w-full',
      'hover:opacity-90',
      isScrolled
        ? 'focus-visible:ring-2 focus-visible:ring-white/30'
        : 'focus-visible:ring-2 focus-visible:ring-[#0A1F44]/30',
    ].join(' ');

  const navButtonClass = [
    'relative px-3 py-2 rounded-md text-base font-medium select-none transition-opacity',
    isScrolled
      ? 'text-white/80 hover:text-white'
      : 'text-[#0A1F44]/80 hover:text-[#0A1F44]',
    'hover:opacity-90',
    'after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:transition-all',
    isScrolled ? 'after:bg-white' : 'after:bg-[#0A1F44]',
    'hover:after:w-full',
    isScrolled
      ? 'focus-visible:ring-2 focus-visible:ring-white/30'
      : 'focus-visible:ring-2 focus-visible:ring-[#0A1F44]/30',
  ].join(' ');

  return (
    <header className="sticky top-0 z-50">
      <div
        className={[
          'relative transition-colors',
          isScrolled ? 'bg-[rgba(10,31,68,0.80)] backdrop-blur-md' : 'bg-[#F2F5F9]',
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
                    <svg className="h-4 w-4" viewBox={viewBox} aria-hidden="true">
                      {svg}
                    </svg>
                  </a>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        <nav className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-8 py-3">
          <div className="flex h-[64px] items-center">
            <NavLink to="/" className="flex items-center leading-none">
              <img
                src={isScrolled ? fualtecDark : logoLight}
                alt="Fualtec logo"
                className="m-0 block h-[72px] w-auto object-contain p-0 transition-all duration-300"
              />
            </NavLink>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <NavLink to="/" className={navLinkClass}>
              Inicio
            </NavLink>
            <NavLink to="/servicios" className={navLinkClass}>
              Servicios
            </NavLink>

            <div
              className="relative"
              onMouseEnter={openCompanyMenu}
              onMouseLeave={scheduleCloseCompanyMenu}
              onFocus={openCompanyMenu}
              onBlur={scheduleCloseCompanyMenu}
            >
              <NavLink
                to="/quienes-somos"
                aria-haspopup="menu"
                aria-expanded={openCompany}
                className={navButtonClass}
              >
                Nuestra empresa
              </NavLink>

              {openCompany && (
                <div
                  role="menu"
                  className={[
                    'absolute left-0 mt-3 w-[260px] rounded-xl border p-2 shadow-2xl z-50',
                    isScrolled
                      ? 'border-white/15 bg-[rgba(10,31,68,0.92)] backdrop-blur-md'
                      : 'border-[#0A1F44]/15 bg-[#F2F5F9]',
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
                          'block rounded-lg px-4 py-2 text-sm transition-transform duration-200',
                          isScrolled
                            ? isActive
                              ? 'bg-white/10 text-white ring-1 ring-white/15'
                              : 'text-white/90 hover:bg-white/10 hover:text-white hover:translate-x-0.5'
                            : isActive
                              ? 'bg-[#0A1F44]/10 text-[#0A1F44] ring-1 ring-[#0A1F44]/20'
                              : 'text-[#0A1F44]/90 hover:bg-[#0A1F44]/8 hover:text-[#0A1F44] hover:translate-x-0.5',
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

            <div
              className="relative"
              onMouseEnter={openClientMenu}
              onMouseLeave={scheduleCloseClientMenu}
              onFocus={openClientMenu}
              onBlur={scheduleCloseClientMenu}
            >
              <NavLink
                to="/formulario-de-satisfaccion"
                aria-haspopup="menu"
                aria-expanded={openClient}
                className={navButtonClass}
              >
                Atención al Cliente
              </NavLink>

              {openClient && (
                <div
                  role="menu"
                  className={[
                    'absolute left-0 mt-3 w-[340px] rounded-2xl border p-2 shadow-2xl z-50',
                    isScrolled
                      ? 'border-white/15 bg-[rgba(10,31,68,0.92)] backdrop-blur-md'
                      : 'border-[#0A1F44]/15 bg-[#F2F5F9]',
                  ].join(' ')}
                  onMouseEnter={openClientMenu}
                  onMouseLeave={scheduleCloseClientMenu}
                >
                  {[
                    {
                      to: '/formulario-de-satisfaccion',
                      title: 'Formulario de satisfacción',
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
                          'block rounded-xl px-4 py-3 text-sm transition-transform duration-200',
                          isScrolled
                            ? isActive
                              ? 'bg-white/10 text-white ring-1 ring-white/15'
                              : 'text-white/90 hover:bg-white/10 hover:text-white hover:translate-x-0.5'
                            : isActive
                              ? 'bg-[#0A1F44]/10 text-[#0A1F44] ring-1 ring-[#0A1F44]/20'
                              : 'text-[#0A1F44]/90 hover:bg-[#0A1F44]/8 hover:text-[#0A1F44] hover:translate-x-0.5',
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

            <NavLink
              to="/client-access"
              className={[
                'rounded-xl px-5 py-3 text-sm font-semibold shadow-md transition',
                isScrolled
                  ? 'bg-[#E6ECF3] text-[#0A1F44] hover:bg-[#DCE4EE]'
                  : 'bg-[#8B0000] text-white shadow-[#8B0000]/30 hover:bg-[#6E0000]',
              ].join(' ')}
            >
              Acceso Clientes
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

