import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const adminNav = [
  { to: '/client-access/admin', label: 'Resumen' },
  { to: '/client-access/admin/aprobaciones', label: 'Aprobaciones' },
  { to: '/client-access/admin/usuarios', label: 'Usuarios' },
  { to: '/client-access/admin/pdfs', label: 'PDFs' },
  { to: '/client-access/admin/grupos', label: 'Grupos' },
  { to: '/client-access/admin/publicaciones', label: 'Publicaciones' },
  { to: '/client-access/admin/auditoria', label: 'Auditoría' }
];

export const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-72 flex-col bg-slate-950 p-6 text-slate-200 lg:flex">
        <div>
          <p className="text-xl font-semibold text-white">Panel Administrativo</p>
          <p className="text-sm text-slate-400">{user?.email}</p>
        </div>
        <nav className="mt-10 flex flex-col gap-2 text-sm">
          {adminNav.map((item) => (
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
            className="mt-8 rounded-md bg-red-800 px-3 py-2 text-left text-sm font-semibold text-white hover:bg-red-900"
          >
            Cerrar sesión
          </button>
        </nav>
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
          <div>
            <p className="text-lg font-semibold text-slate-900">Gestión de clientes y activos digitales</p>
            <p className="text-sm text-slate-500">Controle accesos, publicaciones y auditorías en tiempo real.</p>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
