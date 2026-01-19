import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Tooltip } from '../../../components/ui/tooltip';
import { ContactStatusToggle } from './contact-status-toggle';
import { ComplaintSubmission } from '../services/publicSubmissionsService';

type ComplaintDetailsModalProps = {
  isOpen: boolean;
  complaint: ComplaintSubmission | null;
  onClose: () => void;
  onToggleResolved: (next: boolean) => void;
  onDownload: () => void;
  downloading?: boolean;
  updating?: boolean;
  formatDate: (value?: string | null) => string;
};

type DetailItemProps = {
  label: string;
  value: string;
};

const DetailItem = ({ label, value }: DetailItemProps) => (
  <div>
    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <div className="mt-1 text-sm text-slate-800">{value}</div>
  </div>
);

export const ComplaintDetailsModal = ({
  isOpen,
  complaint,
  onClose,
  onToggleResolved,
  onDownload,
  downloading = false,
  updating = false,
  formatDate,
}: ComplaintDetailsModalProps) => {
  if (!isOpen || !complaint) return null;

  const hasAttachment = Boolean(complaint.documento_path);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label="Detalle de queja"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="flex w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md"
        style={{ maxHeight: 'calc(100vh - 4rem)' }}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Detalle de queja</h2>
          </div>
          <div className="flex items-center gap-3">
            <ContactStatusToggle
              checked={Boolean(complaint.is_resolved)}
              disabled={updating}
              onChange={onToggleResolved}
            />
            <Tooltip content="Cerrar" side="bottom">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </Tooltip>
          </div>
        </header>

        <div className="overflow-y-auto px-6 py-5 text-sm text-slate-700">
          <div className="space-y-6">
            <section className="border-b border-slate-100 pb-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Información general
              </h3>
              <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                <DetailItem label="Empresa" value={complaint.empresa} />
                <DetailItem label="Solicitante" value={complaint.nombre} />
                <DetailItem label="Cargo" value={complaint.cargo} />
                <DetailItem label="Teléfono" value={complaint.telefono} />
              </div>
            </section>

            <section className="border-b border-slate-100 pb-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contacto y fecha
              </h3>
              <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                <DetailItem label="Correo" value={complaint.email} />
                <DetailItem
                  label="Fecha"
                  value={formatDate(complaint.fecha_presentacion)}
                />
              </div>
            </section>

            <section className="border-b border-slate-100 pb-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Dirección
              </h3>
              <p className="mt-3 text-sm text-slate-800">{complaint.direccion}</p>
            </section>

            <section className="border-b border-slate-100 pb-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tipo y documento adjunto
              </h3>
              <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                <DetailItem
                  label="Tipo"
                  value={`${complaint.tipo_inconformidad} / ${complaint.tipo_queja}`}
                />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Documento adjunto
                  </p>
                  <div className="mt-1">
                    {hasAttachment ? (
                      <div className="flex flex-wrap items-center gap-3">
                        {complaint.documento_nombre && (
                          <span className="text-sm text-slate-700">
                            {complaint.documento_nombre}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={onDownload}
                          disabled={downloading}
                          className="inline-flex items-center rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
                        >
                          Ver documento
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">
                        No se adjunto ningun documento
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Relato
              </h3>
              <div className="mt-3 max-h-64 min-h-[160px] overflow-y-auto rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {complaint.relato}
              </div>
            </section>
          </div>
        </div>

        <footer className="flex items-center justify-end border-t border-slate-200 px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cerrar
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
};
