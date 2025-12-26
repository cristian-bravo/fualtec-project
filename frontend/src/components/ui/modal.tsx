import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from './button';
import { Tooltip } from './tooltip';

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
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 px-4 py-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="flex w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
        style={{ maxHeight: "calc(100vh - 4rem)" }}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
          </div>
          <Tooltip content="Cerrar" side="bottom">
            <Button variant="ghost" onClick={onClose} aria-label="Cerrar">
              <X className="h-4 w-4" />
            </Button>
          </Tooltip>
        </header>
        <div className="overflow-y-auto px-6 py-4 text-sm text-slate-700">{children}</div>
        <footer className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-3">
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



