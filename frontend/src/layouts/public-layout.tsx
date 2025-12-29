import { Outlet } from 'react-router-dom';
import { PublicHeader } from './public/components/public-header';
import { PublicFooter } from './public/components/public-footer';
import { WhatsAppFab } from './public/components/whatsapp-fab';

export const PublicLayout = () => (
  <div className="flex min-h-screen flex-col">
    <PublicHeader />
    <main className="flex-1">
      <Outlet />
    </main>
    <PublicFooter />
    <WhatsAppFab />
  </div>
);
