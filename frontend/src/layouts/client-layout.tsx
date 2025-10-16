import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const clientNav = [
  { to: '/client-access/app', label: 'Dashboard' },
  { to: '/client-access/app/documentos', label: 'Documentos' },
  { to: '/client-access/app/perfil', label: 'Perfil' }
];

export const ClientLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-64 flex-col bg-slate-900 p-6 text-slate-200 md:flex">
        <div>
          <p className="text-xl font-semibold text-white">Portal Cliente</p>
          <p className="text-sm text-slate-400">Bienvenido, {user?.nombre}</p>
        </div>
        <nav className="mt-10 flex flex-col gap-2 text-sm">
          {clientNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 transition ${isActive ? 'bg-primary text-white' : 'text-slate-300 hover:bg-slate-800'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={logout}
            className="mt-6 rounded-md bg-red-800 px-3 py-2 text-left text-sm font-semibold text-white hover:bg-red-900"
          >
            Cerrar sesión
          </button>
        </nav>
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
          <div>
            <p className="text-lg font-semibold text-slate-900">Portal de Clientes</p>
            <p className="text-sm text-slate-500">Documentos confidenciales y publicaciones recientes</p>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
