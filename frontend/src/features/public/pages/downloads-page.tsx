import { useState, useEffect, useCallback } from 'react';
import { Tooltip } from '../../../components/ui/tooltip';

type DownloadItem = {
  title: string;
  date: string;
  url: string;
  size?: string;
};

const downloads: DownloadItem[] = [
  { title: 'Brochure corporativo 2024', date: '01/03/2024', url: '/pdf/brochure-2024.pdf', size: '3.2 MB' },
  { title: 'Guía de buenas prácticas HSE', date: '15/02/2024', url: '/pdf/guia-hse.pdf', size: '2.1 MB' },
  { title: 'Certificaciones vigentes', date: '10/01/2024', url: '/pdf/certificaciones.pdf', size: '1.4 MB' },
];

export const DownloadsPage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setPreviewUrl(null);
  }, []);

  useEffect(() => {
    if (previewUrl) {
      window.addEventListener('keydown', onEsc);
      document.body.style.overflow = 'hidden';
    } else {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [previewUrl, onEsc]);

  const openPreview = (url: string) => setPreviewUrl(url);
  const closePreview = () => setPreviewUrl(null);

  return (
    <section className="relative min-h-screen bg-[#0A1F44] flex flex-col justify-between">
      {/* Luces de fondo */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(80rem_40rem_at_-10%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(60rem_30rem_at_110%_-10%,rgba(16,185,129,0.12),transparent)]" />

      <div className="relative mx-auto w-full max-w-[90rem] px-8 py-20 flex-1">
        {/* ENCABEZADO MÁS ELEGANTE */}
        <header className="max-w-3xl text-center mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200 mb-4">
            Documentos públicos
          </p>

          <h2 className="relative inline-block text-4xl md:text-5xl font-bold text-white leading-tight">
            Descargas disponibles
            {/* subrayado animado elegante */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#8B0000] to-blue-400 mt-2 animate-pulse" />
          </h2>

          <p className="mt-8 text-base md:text-lg text-slate-200 leading-relaxed">
            Acceda a información institucional, fichas técnicas y lineamientos generales
            de nuestros servicios. Explore, visualice y descargue archivos oficiales con facilidad.
          </p>
        </header>

        {/* GRID DE DOCUMENTOS */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {downloads.map((doc) => (
            <article
              key={doc.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b244f] transition hover:-translate-y-1 hover:shadow-2xl hover:border-white/20"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-xl ring-1 ring-white/15 p-3 bg-white/5 group-hover:bg-white/10 transition">
                    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" className="text-white">
                      <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm1 7V3.5L18.5 9H15Z" />
                      <path fill="currentColor" d="M8 14h2.2c.9 0 1.8.8 1.8 1.9s-.9 1.9-1.8 1.9H8V14Zm1.4 2.9h.7c.5 0 .9-.4.9-.9s-.4-1-.9-1h-.7v1.9ZM13.5 14h2.7v1.1h-1.5v.6h1.4v1.1h-1.4v1h1.6V19h-2.8V14Z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white leading-snug">{doc.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-300">
                      Actualizado {doc.date}{doc.size ? ` • ${doc.size}` : ''}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openPreview(doc.url)}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 ring-1 ring-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="white" strokeWidth="2" />
                      <circle cx="12" cy="12" r="3" fill="white" />
                    </svg>
                    Vista previa
                  </button>

                  <a
                    href={doc.url}
                    download
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-[#0A1F44] bg-white hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" stroke="#0A1F44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Descargar
                  </a>
                </div>
              </div>

              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#8B0000] via-white/80 to-blue-400 opacity-0 transition group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Vista previa del documento PDF"
          onClick={closePreview}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#06182f] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-white">
                    <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm1 7V3.5L18.5 9H15Z" />
                  </svg>
                </span>
                <p className="text-sm font-semibold text-white">Vista previa</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewUrl}
                  download
                  className="hidden sm:inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#0A1F44] bg-white hover:opacity-95 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" stroke="#0A1F44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Descargar
                </a>
                <Tooltip content="Cerrar" side="bottom">
                  <button
                    onClick={closePreview}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition"
                    aria-label="Cerrar vista previa"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 6l12 12M18 6 6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </Tooltip>
              </div>
            </div>

            <div className="bg-[#081a35]">
              <iframe src={previewUrl} title="PDF preview" className="h-[75vh] w-full" />
            </div>

            <div className="flex sm:hidden items-center justify-end gap-2 border-t border-white/10 px-5 py-3 bg-[#06182f]">
              <a
                href={previewUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#0A1F44] bg-white hover:opacity-95 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" stroke="#0A1F44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Descargar
              </a>
              <button
                onClick={closePreview}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/10 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
