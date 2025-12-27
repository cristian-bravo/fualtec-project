import { ReactNode } from 'react';
import { Modal } from '../../../components/ui/modal';

type DetailRow = {
  label: string;
  value: ReactNode;
};

type SubmissionDetailsModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  rows: DetailRow[];
};

export const SubmissionDetailsModal = ({ isOpen, title, onClose, rows }: SubmissionDetailsModalProps) => (
  <Modal isOpen={isOpen} title={title} onClose={onClose}>
    <div className="space-y-4">
      {rows.map((row) => (
        <div key={row.label}>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{row.label}</p>
          <div className="mt-1 text-sm text-slate-800 break-words">{row.value}</div>
        </div>
      ))}
    </div>
  </Modal>
);
