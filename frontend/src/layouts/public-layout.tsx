import { Outlet, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/descargas', label: 'Descargas' },
  { to: '/atencion-cliente', label: 'Atención al Cliente' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/satisfaccion', label: 'Satisfacción' }
];

export const PublicLayout = () => (
  <div className="flex min-h-screen flex-col">
    <header className="sticky top-0 z-40 bg-white shadow">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-xl font-bold text-primary">
          Fualtec Energía
        </NavLink>
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition hover:text-primary ${isActive ? 'text-primary' : 'text-slate-700'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <NavLink
          to="/client-access"
          className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 md:inline-flex"
        >
          Acceso Clientes
        </NavLink>
      </nav>
    </header>
    <main className="flex-1 bg-slate-50">
      <Outlet />
    </main>
    <footer className="bg-slate-900 py-10 text-slate-200">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">Fualtec Energía</p>
          <p className="mt-2 text-sm text-slate-400">
            Excelencia operativa para la industria petrolera.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 text-sm">
          <NavLink to="/historia" className="hover:text-primary">
            Nuestra Historia
          </NavLink>
          <p>© {new Date().getFullYear()} Fualtec Energía. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
);
