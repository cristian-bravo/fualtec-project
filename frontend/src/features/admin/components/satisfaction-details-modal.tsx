import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Tooltip } from '../../../components/ui/tooltip';
import { SatisfactionRating } from './satisfaction-rating';
import { SatisfactionSubmission } from '../services/publicSubmissionsService';

type SatisfactionDetailsModalProps = {
  isOpen: boolean;
  submission: SatisfactionSubmission | null;
  onClose: () => void;
  formatDate: (value?: string | null) => string;
  formatPromedio: (value: string | number) => string;
};

type InfoItemProps = {
  label: string;
  value: string;
};

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div>
    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <div className="mt-1 text-sm text-slate-800">{value}</div>
  </div>
);

type RatingItemProps = {
  label: string;
  value: number;
};

const RatingItem = ({ label, value }: RatingItemProps) => (
  <div className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
    <p className="text-sm text-slate-800">{label}</p>
    <div className="mt-2 flex flex-wrap items-center gap-3">
      <SatisfactionRating value={value} showLabel={false} />
      <span className="text-xs font-semibold text-slate-500">{value}/5</span>
    </div>
  </div>
);

export const SatisfactionDetailsModal = ({
  isOpen,
  submission,
  onClose,
  formatDate,
  formatPromedio,
}: SatisfactionDetailsModalProps) => {
  if (!isOpen || !submission) return null;

  const comments = submission.comentarios?.trim();
  const messageFinal = submission.mensaje_final?.trim();
  const statusLabel = submission.is_resolved ? 'Resuelto' : 'Pendiente';

  const questions = [
    {
      label: '1. Los servicios entregados cumplieron con tus expectativas y estandares?',
      value: submission.p1,
    },
    {
      label:
        '2. ¿Cómo calificarías nuestra capacidad para resolver problemas y responder a tus necesidades?',
      value: submission.p2,
    },
    {
      label:
        '3. ¿Cómo calificarías el profesionalismo y competencia técnica de nuestro personal?',
      value: submission.p3,
    },
    {
      label: '4. Que tan satisfecho estas con la rapidez de nuestra respuesta a consultas?',
      value: submission.p4,
    },
    {
      label: '5. Que tan satisfecho estas con las medidas de seguridad en el servicio?',
      value: submission.p5,
    },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label="Detalle de evaluación"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="flex w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md"
        style={{ maxHeight: 'calc(100vh - 4rem)' }}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Detalle de evaluación</h2>
          </div>
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
        </header>

        <div className="overflow-y-auto px-6 py-5 text-sm text-slate-700">
          <div className="space-y-6">
            <section className="border-b border-slate-100 pb-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Información general
              </h3>
              <div className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                <InfoItem label="Nombre del cliente" value={submission.nombre} />
                <InfoItem label="Correo electrónico" value={submission.email} />
                <InfoItem label="Servicio evaluado" value={submission.servicio} />
                <InfoItem label="Puntaje promedio" value={formatPromedio(submission.promedio)} />
              </div>
            </section>

            <section className="border-b border-slate-100 pb-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Evaluacion por criterios
              </h3>
              <div className="mt-3 space-y-4">
                {questions.map((question) => (
                  <RatingItem
                    key={question.label}
                    label={question.label}
                    value={question.value}
                  />
                ))}
              </div>
            </section>

            <section className="border-b border-slate-100 pb-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Comentarios
              </h3>
              <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {comments || 'Sin comentarios registrados'}
              </div>
            </section>

            <section className="border-b border-slate-100 pb-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Mensaje final
              </h3>
              <p className="mt-3 text-sm text-slate-800">
                {messageFinal || (
                  <span className="text-slate-400">No se registró mensaje final</span>
                )}
              </p>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Estado y fecha
              </h3>
              <div className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                <InfoItem label="Estado" value={statusLabel} />
                <InfoItem label="Fecha de envio" value={formatDate(submission.created_at)} />
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
