import React from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  title: string;
  url: string;
  onClose: () => void;
};

export const PdfViewerModal = ({ open, title, url, onClose }: Props) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4 py-8">
      <div className="relative flex h-[80vh] w-full max-w-5xl flex-col rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="truncate text-sm font-semibold text-slate-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-300 bg-white p-1 hover:bg-slate-100"
            aria-label="Cerrar"
          >
            <svg
              className="h-4 w-4 text-slate-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <embed src={url} type="application/pdf" className="h-full w-full" />
        </div>
      </div>
    </div>,
    document.body
  );
};
