import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/use-auth';
import logoLight from '../assets/images/logo/fualtec-dark.webp';
import { Tooltip } from '../components/ui/tooltip';

const adminSections = [
  {
    title: 'Panel',
    items: [{ to: '/client-access/admin', label: 'Resumen', exact: true }],
  },
  {
    title: 'Usuarios',
    items: [
      { to: '/client-access/admin/usuarios', label: 'Listado' },
      { to: '/client-access/admin/aprobaciones', label: 'Aprobaciones' },
    ],
  },
  {
    title: 'Documentos',
    items: [
      { to: '/client-access/admin/pdfs', label: 'PDFs' },
      { to: '/client-access/admin/grupos', label: 'Grupos' },
      { to: '/client-access/admin/publicaciones', label: 'Publicaciones' },
    ],
  },
  {
    title: 'Soporte',
    items: [
      { to: '/client-access/admin/contactos', label: 'Contactos' },
      { to: '/client-access/admin/satisfaccion', label: 'Satisfaccion' },
      { to: '/client-access/admin/quejas', label: 'Quejas' },
    ],
  },
];

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 relative">

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 h-screen w-60 md:w-56 lg:w-60 flex-col bg-slate-900/95 px-4 md:px-5 lg:px-6 py-4 text-slate-200 overflow-y-auto lg:overflow-y-hidden overflow-x-hidden transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:flex`}
      >
        {/* Top */}
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center pb-3 md:pb-4">
            <img
              src={logoLight}
              alt="Logo Fualtec"
              className="mb-3 h-14 md:h-16 w-auto object-contain"
            />

            <p className="text-[12px] md:text-[13px] font-semibold tracking-wide text-center text-blue-400">
              Panel <span className="text-blue-500 font-bold">Administrativo</span>
            </p>


            <p className="mt-2 text-[10px] md:text-[11px] text-slate-400 text-center">
              {user?.email}
            </p>
          </div>

          {/* Nav */}
          <nav className="mt-2 md:mt-4 flex flex-1 flex-col justify-center md:justify-start text-[12px] md:text-[13px] lg:text-[14px] font-medium">
            {adminSections.map((section, index) => (
              <div
                key={section.title}
                className={index === 0 ? '' : 'mt-2 md:mt-3 lg:mt-4'}
              >
                <p className="px-1 text-[9px] md:text-[10px] font-semibold tracking-[0.22em] uppercase text-slate-400/60">
                  {section.title}
                </p>
                <div className="mt-1.5 md:mt-2 flex flex-col gap-1 md:gap-1.5">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.exact}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-md px-2 py-1 md:py-1.5 font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-900/50 text-slate-100 shadow-sm border-l-2 border-blue-400/70'
                            : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                        }`
                      }
                    >
                      <span className="pl-3 text-[12px] md:text-[13px] lg:text-[14px]">
                        {item.label}
                      </span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          {/* Logout */}
          <div className="pt-3 md:pt-4">
            <button
              type="button"
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 rounded-md
                        bg-slate-800 hover:bg-slate-900
                        px-4 py-2 text-sm font-medium text-white
                        transition-all duration-200 shadow-sm"
            >
              <LogOut size={18} className="opacity-90" />
              <span className="tracking-wide">Desconectarse</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay móvil */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/40 shadow-[0_1px_8px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between px-6 md:px-10 py-6">
            <div className="flex items-center gap-4">
              {/* Botón móvil */}
              <Tooltip content={isMenuOpen ? "Cerrar menu" : "Abrir menu"}>
                <button
                  className="md:hidden text-white focus:outline-none"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </Tooltip>

              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-slate-400 to-slate-500"></div>
              <h1 className="text-base md:text-lg font-medium text-slate-200 tracking-wide">
                Bienvenido al sistema,
                <span className="ml-1 text-slate-100 font-semibold">
                  {user?.nombre}
                </span>
              </h1>
            </div>



            <div className="flex items-center gap-2 text-slate-300 text-xs md:text-sm">
              <div className="h-2 w-2 rounded-full bg-emerald-400/80 animate-pulse" />
              <span className="text-slate-300 font-medium">Conectado</span>
            </div>
          </div>
        </header>

        {/* Dinámico */}
        <main className="flex-1 p-4 md:p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

