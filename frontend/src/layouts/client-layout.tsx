import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/use-auth';
import logoLight from '../assets/images/logo/fualtec-dark.webp';
import { Tooltip } from '../components/ui/tooltip';

const clientNav = [
  { to: '/client-access/app', label: 'Menú Principal', exact: true },
  { to: '/client-access/app/documentos', label: 'Documentos' },
  { to: '/client-access/app/perfil', label: 'Perfil' },
];

export const ClientLayout = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 flex-col justify-between bg-slate-900/95 p-6 text-slate-200 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:flex`}
      >
        {/* Parte superior */}
        <div>
          <div className="flex flex-col items-center border-b border-slate-700/60 pb-6">
            <img
              src={logoLight}
              alt="Logo Fualtec"
              className="mb-4 h-20 w-auto object-contain"
            />

            {/* Slogan refinado */}
            <p className="text-[15px] font-semibold tracking-wide text-center text-blue-400">
               Área de <span className="text-blue-500 font-bold">Clientes</span> 
            </p>

            <p className="text-sm text-slate-400 mt-3 text-center">
              {user?.email}
            </p>

            <div className="w-20 h-[1px] bg-gradient-to-r from-slate-600 to-slate-700 mt-4"></div>
          </div>

          {/* Navegación */}
          <nav className="mt-12 flex flex-col gap-4 text-[15px] font-medium">

            {clientNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={() => setIsMenuOpen(false)} // Cierra menú al navegar
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-4 py-2 font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-900/50 text-slate-100 shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Parte inferior (Cerrar sesión) */}
        <div className="pt-8 border-t border-slate-700 mt-6">
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
      </aside>

      {/* Overlay (solo en móvil cuando menú abierto) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/40 shadow-[0_1px_8px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between px-6 md:px-10 py-6">
            <div className="flex items-center gap-4">
              {/* Botón hamburguesa móvil */}
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
                Bienvenido a su portal,
                <span className="ml-1 text-slate-100 font-semibold">
                  {user?.nombre}
                </span>
              </h1>
            </div>

            {/* <p className="hidden md:block text-base text-slate-300 tracking-wide font-medium text-center">
              Documentos confidenciales y publicaciones recientes
            </p> */}

            <div className="flex items-center gap-2 text-slate-300 text-xs md:text-sm">
              <div className="h-2 w-2 rounded-full bg-emerald-400/80 animate-pulse" />
              <span className="text-slate-300 font-medium">Conectado</span>
            </div>
          </div>
        </header>

        {/* Contenido dinámico */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
