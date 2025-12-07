import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/use-auth';
import logoLight from '../assets/images/logo/fualtec-dark.webp';

const adminNav = [
  { to: '/client-access/admin', label: 'Resumen', exact: true },
  { to: '/client-access/admin/aprobaciones', label: 'Aprobaciones' },
  { to: '/client-access/admin/usuarios', label: 'Usuarios' },
  { to: '/client-access/admin/pdfs', label: 'PDFs' },
  { to: '/client-access/admin/grupos', label: 'Grupos' },
  { to: '/client-access/admin/publicaciones', label: 'Publicaciones' },
  { to: '/client-access/admin/auditoria', label: 'Auditoría' },
];

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100 relative">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 flex-col justify-between bg-slate-900 p-6 text-slate-200 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:flex`}
      >
        {/* Top */}
        <div>
          <div className="flex flex-col items-center border-b border-slate-700 pb-6">
            <img
              src={logoLight}
              alt="Logo Fualtec"
              className="mb-4 h-20 w-auto object-contain"
            />

            <p className="text-[15px] font-semibold tracking-wide text-center text-blue-200">
              Panel <span className="text-[#e74c3c] font-bold">Administrativo</span>
            </p>

            <p className="text-sm text-slate-400 mt-3 text-center">
              {user?.email}
            </p>

            <div className="w-20 h-[1px] bg-gradient-to-r from-slate-600 to-slate-700 mt-4"></div>
          </div>

          {/* Nav */}
          <nav className="mt-12 flex flex-col gap-4 text-[15px] font-medium">
            {adminNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-4 py-2 font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600/70 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-8 border-t border-slate-700 mt-6">
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 rounded-md bg-[#7a1c1c] px-4 py-2 text-sm font-medium text-white hover:bg-[#601414] transition-all duration-200 shadow-sm"
          >
            <LogOut size={18} className="text-white opacity-90" />
            <span className="tracking-wide">Desconectarse</span>
          </button>
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
        <header className="sticky top-0 z-10 bg-gradient-to-r from-[#0A1F44] via-[#132a5e] to-[#0A1F44] border-b border-blue-700/40 shadow-[0_2px_25px_rgba(10,31,68,0.3)]">
          <div className="flex items-center justify-between px-6 md:px-10 py-6">
            <div className="flex items-center gap-4">
              {/* Botón móvil */}
              <button
                className="md:hidden text-white focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-500"></div>
              <h1 className="text-lg md:text-xl font-semibold text-white tracking-wide">
                Panel Administrativo
              </h1>
            </div>

            <p className="hidden md:block text-base text-blue-100/90 tracking-wide font-medium text-center">
              Gestión de clientes, auditorías y publicaciones
            </p>

            <div className="flex items-center gap-2 text-slate-300 text-xs md:text-sm">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium">Conectado</span>
            </div>
          </div>
        </header>

        {/* Dinámico */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
