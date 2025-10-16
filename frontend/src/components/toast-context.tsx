import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Toast } from './ui/toast';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  tone?: 'success' | 'error' | 'info';
}

interface ToastContextValue {
  showToast: (message: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: Omit<ToastMessage, 'id'>) => {
    const toast = { ...message, id: uuidv4() };
    setMessages((prev) => [...prev, toast]);
    setTimeout(() => setMessages((prev) => prev.filter((item) => item.id !== toast.id)), 4000);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed inset-x-0 bottom-4 flex flex-col items-center gap-2 px-4">
        {messages.map((toast) => (
          <Toast key={toast.id} title={toast.title} description={toast.description} tone={toast.tone} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside ToastProvider');
  }
  return ctx;
};
