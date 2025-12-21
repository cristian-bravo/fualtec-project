import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './button';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  actions?: ReactNode;
  children: ReactNode;
}

export const Modal = ({ isOpen, title, description, onClose, actions, children }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-lg rounded-lg bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
          </div>
          <Button variant="ghost" onClick={onClose} aria-label="Cerrar">
            ✕
          </Button>
        </header>
        <div className="px-6 py-4 text-sm text-slate-700">{children}</div>
        <footer className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-3">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          {actions}
        </footer>
      </div>
    </div>,
    document.body
  );
};
