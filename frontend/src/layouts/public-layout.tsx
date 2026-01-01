import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { PublicHeader } from './public/components/public-header';
import { PublicFooter } from './public/components/public-footer';
import { WhatsAppFab } from './public/components/whatsapp-fab';

export const PublicLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
      <WhatsAppFab />
    </div>
  );
};
