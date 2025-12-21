import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { PublicLayout } from '../layouts/public-layout';
import { ClientLayout } from '../layouts/client-layout';
import { AdminLayout } from '../layouts/admin-layout';

import { HomePage } from '../features/public/pages/home-page';
import { ServicesPage } from '../features/public/pages/services-page';
import { DownloadsPage } from '../features/public/pages/downloads-page';
import { ComplaintsAppealsPage } from '../features/public/pages/quejas-apelaciones';
import { ContactPage } from '../features/public/pages/contact-page';
import { SatisfactionPage } from '../features/public/pages/satisfaction-page';
import { HistoryPage } from '../features/public/pages/history-page';

import { LoginPage } from '../features/auth/pages/login-page';
import { RegisterPage } from '../features/auth/pages/register-page';
import { ForgotPasswordPage } from '../features/auth/pages/forgot-password-page';
import { ResetPasswordPage } from '../features/auth/pages/reset-password-page';

import { ClientDashboardPage } from '../features/client/pages/client-dashboard-page';
import { ClientDocumentsPage } from '../features/client/pages/client-documents-page';
import { ClientProfilePage } from '../features/client/pages/client-profile-page';

import { AdminDashboardPage } from '../features/admin/pages/admin-dashboard-page';
import { AdminApprovalsPage } from '../features/admin/pages/admin-approvals-page';
import { AdminUsersPage } from '../features/admin/pages/admin-users-page';
import { AdminPdfsPage } from '../features/admin/pages/admin-pdfs-page';
import { AdminGroupsPage } from '../features/admin/pages/admin-groups-page';
import { AdminGroupsManagePdfsPage } from '../features/admin/pages/admin-groups-manage-pdfs-page';
import { AdminPublicationsPage } from '../features/admin/pages/admin-publications-page';
import { AdminAuditPage } from '../features/admin/pages/admin-audit-page';

import { ProtectedRoute } from '../components/protected-route';
import { useAuth } from '../hooks/use-auth';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'servicios', element: <ServicesPage /> },
      { path: 'descargas', element: <DownloadsPage /> },
      { path: 'quejas-y-apelaciones', element: <ComplaintsAppealsPage /> },
      { path: 'contacto', element: <ContactPage /> },
      { path: 'formulario-de-satisfaccion', element: <SatisfactionPage /> },
      { path: 'historia', element: <HistoryPage /> },
    ],
  },

  {
    path: '/client-access',
    children: [
      // Redirige automáticamente /client-access -> /client-access/login
      { index: true, element: <Navigate to="/client-access/login" replace /> },

      // Auth
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot', element: <ForgotPasswordPage /> },
      { path: 'reset', element: <ResetPasswordPage /> },

      // Zona cliente (protegida)
      {
        element: <ProtectedRoute allowedRoles={['cliente']} />,
        children: [
          {
            path: 'app',
            element: <ClientLayout />,
            children: [
              { index: true, element: <ClientDashboardPage /> },
              { path: 'documentos', element: <ClientDocumentsPage /> },
              { path: 'perfil', element: <ClientProfilePage /> },
            ],
          },
        ],
      },

      // Zona admin (protegida)
      {
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          {
            path: 'admin',
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminDashboardPage /> },
              { path: 'aprobaciones', element: <AdminApprovalsPage /> },
              { path: 'usuarios', element: <AdminUsersPage /> },
              { path: 'pdfs', element: <AdminPdfsPage /> },
              { path: 'grupos', element: <AdminGroupsPage /> },
              { path: 'grupos/:groupId/pdfs', element: <AdminGroupsManagePdfsPage /> },
              { path: 'publicaciones', element: <AdminPublicationsPage /> },
              { path: 'auditoria', element: <AdminAuditPage /> },
            ],
          },
        ],
      },
    ],
  },

  // 404 -> home
  { path: '*', element: <Navigate to="/" replace /> },
];

export const AppRoutes = () => {
  const { isInitialized } = useAuth();
  const element = useRoutes(routes);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600">
        Cargando portal corporativo...
      </div>
    );
  }

  return element;
};
