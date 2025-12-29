import { useEffect, useRef, useState } from 'react';

export const usePublicHeader = () => {
  const [openCompany, setOpenCompany] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeClientTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeCompanyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openClientMenu = () => {
    if (closeClientTimer.current) clearTimeout(closeClientTimer.current);
    setOpenClient(true);
    setOpenCompany(false);
  };

  const scheduleCloseClientMenu = () => {
    if (closeClientTimer.current) clearTimeout(closeClientTimer.current);
    closeClientTimer.current = setTimeout(() => setOpenClient(false), 180);
  };

  const openCompanyMenu = () => {
    if (closeCompanyTimer.current) clearTimeout(closeCompanyTimer.current);
    setOpenCompany(true);
    setOpenClient(false);
  };

  const scheduleCloseCompanyMenu = () => {
    if (closeCompanyTimer.current) clearTimeout(closeCompanyTimer.current);
    closeCompanyTimer.current = setTimeout(() => setOpenCompany(false), 180);
  };

  return {
    isScrolled,
    openCompany,
    openClient,
    openClientMenu,
    scheduleCloseClientMenu,
    openCompanyMenu,
    scheduleCloseCompanyMenu,
  };
};
