import { useState } from 'react';
import { Download, Maximize2, Minimize2, X } from 'lucide-react';
import { Tooltip } from '../../../components/ui/tooltip';

type DocumentPreviewModalProps = {
  url: string;
  title: string;
  onClose: () => void;
};

export const DocumentPreviewModal = ({ url, title, onClose }: DocumentPreviewModalProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const bodyHeight = isExpanded ? 'h-[78vh]' : 'h-[70vh]';

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Vista previa ${title}`}
      onClick={onClose}
    >
      <div
        className={[
          'flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#06182f] shadow-2xl',
          isExpanded ? 'max-w-[95vw] max-h-[92vh]' : 'max-w-5xl max-h-[85vh]',
        ].join(' ')}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Vista previa</p>
            <p className="truncate text-xs text-slate-300">{title}</p>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip content={isExpanded ? 'Reducir' : 'Ampliar'}>
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition"
                aria-label={isExpanded ? 'Reducir vista previa' : 'Ampliar vista previa'}
              >
                {isExpanded ? <Minimize2 className="h-4 w-4 text-white" /> : <Maximize2 className="h-4 w-4 text-white" />}
              </button>
            </Tooltip>
            <Tooltip content="Descargar">
              <a
                href={url}
                download
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition"
                aria-label="Descargar documento"
              >
                <Download className="h-4 w-4 text-white" />
              </a>
            </Tooltip>
            <Tooltip content="Cerrar" side="bottom">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition"
                aria-label="Cerrar vista previa"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </Tooltip>
          </div>
        </div>

        <div className={`bg-[#081a35] ${bodyHeight}`}>
          <iframe
            src={url}
            title={`Preview ${title}`}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};
