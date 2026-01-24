import { useEffect, useMemo, useState } from 'react';
import { DocumentPreviewModal } from '../components/document-preview-modal';
import { useEscapeKey } from '../hooks/useEscapeKey';

type DownloadItem = {
  title: string;
  date: string;
  url: string;
  size?: string;
};

const docFiles = import.meta.glob('../../../assets/documents/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;


const formatTitle = (filename: string) =>
  filename
    .replace(/\.pdf$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const resolveMeta = (filename: string): Omit<DownloadItem, 'url'> => {
  const name = filename.toLowerCase();

  if (name.includes('alcances')) {
    return {
      title: 'Alcances de acreditación OI',
      date: '18/01/2026',
      size: '0.22 MB',
    };
  }

  if (name.includes('certificado')) {
    return {
      title: 'Certificado de acreditación',
      date: '18/12/2025',
      size: '0.86 MB',
    };
  }

  if (name.includes('resolucion')) {
    return {
      title: 'Resolución  ARCERNNR 2024',
      date: '05/12/2024',
      size: '0.11 MB',
    };
  }

  return {
    title: formatTitle(filename),
    date: 'recientemente',
  };
};

export const DownloadsPage = () => {
  const [previewDoc, setPreviewDoc] = useState<DownloadItem | null>(null);

  const downloads = useMemo(
    () =>
      Object.entries(docFiles).map(([path, url]) => {
        const filename = path.split('/').pop() ?? 'Documento.pdf';
        return {
          url,
          ...resolveMeta(filename),
        };
      }),
    []
  );

  useEscapeKey(Boolean(previewDoc), () => setPreviewDoc(null));

  useEffect(() => {
    if (previewDoc) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [previewDoc]);

  return (
    <section className="relative bg-[#0A1F44] flex flex-col justify-between">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(80rem_40rem_at_-10%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(60rem_30rem_at_110%_-10%,rgba(16,185,129,0.12),transparent)]" />

      <div className="relative mx-auto w-full max-w-[90rem] px-8 py-20 flex-1">
        <header className="max-w-3xl text-center mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200 mb-4">
            Documentos públicos
          </p>

          <h2 className="relative inline-block text-4xl md:text-5xl font-bold text-white leading-tight">
            Descargas disponibles
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#8B0000] to-blue-400 mt-2 animate-pulse" />
          </h2>

          <p className="mt-8 text-base md:text-lg text-slate-200 leading-relaxed">
            Acceda a información institucional, fichas técnicas y lineamientos generales
            de nuestros servicios. Explore, visualice y descargue archivos oficiales con facilidad.
          </p>
        </header>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {downloads.map((doc) => (
            <article
              key={doc.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b244f] transition hover:-translate-y-1 hover:shadow-2xl hover:border-white/20"
            >
              <button
                type="button"
                onClick={() => setPreviewDoc(doc)}
                aria-label={`Abrir ${doc.title}`}
                className="relative h-44 w-full overflow-hidden border-b border-white/10 bg-[#081a35] text-left cursor-pointer"
              >
                <iframe
                  title={`Preview ${doc.title}`}
                  src={doc.url}
                  loading="lazy"
                  className="pointer-events-none h-full w-full scale-[1.02] opacity-90"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081a35] via-transparent to-transparent" />
              </button>

              <div className="p-6">
                <div className="flex items-start gap-4">
                <div className="group/icon shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/15 transition-all duration-300 hover:bg-white/10">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="text-blue-300 transition-transform duration-300 group-hover/icon:-translate-y-0.5 group-hover/icon:scale-105"
                    fill="none"
                  >
                    {/* Hoja */}
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
                      fill="currentColor"
                      fillOpacity="0.85"
                    />
                    {/* Pliegue */}
                    <path
                      d="M14 2v6h6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                    />
                    {/* Texto PDF */}
                    <text
                      x="12"
                      y="16.2"
                      textAnchor="middle"
                      fontSize="6.5"
                      fontWeight="700"
                      fill="#0A1F44"
                    >
                      PDF
                    </text>
                  </svg>
                </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white leading-snug">{doc.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-300">
                      Actualizado {doc.date}{doc.size ? ` · ${doc.size}` : ''}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 ring-1 ring-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="white" strokeWidth="2" />
                      <circle cx="12" cy="12" r="3" fill="white" />
                    </svg>
                    Ver detalle
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

      {previewDoc && (
        <DocumentPreviewModal
          url={previewDoc.url}
          title={previewDoc.title}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </section>
  );
};

