import { useCallback, useState } from "react";
import { getPdfBlob, PdfItem } from "../services/pdfService";

export type PdfViewerState = {
  title: string;
  url: string;
} | null;

export const usePdfViewer = (
  token?: string,
  onError?: (message: string) => void
) => {
  const [viewer, setViewer] = useState<PdfViewerState>(null);

  const openPdf = useCallback(
    async (pdf: PdfItem) => {
      if (!token) return;

      try {
        const blob = await getPdfBlob(token, pdf.id);
        const url = URL.createObjectURL(blob);
        setViewer({
          title: pdf.title || pdf.filename,
          url,
        });
      } catch (error) {
        console.error(error);
        if (onError) {
          onError("No se pudo abrir el PDF.");
        }
      }
    },
    [token, onError]
  );

  const closeViewer = useCallback(() => {
    setViewer((prev) => {
      if (prev?.url) {
        URL.revokeObjectURL(prev.url);
      }
      return null;
    });
  }, []);

  return { viewer, openPdf, closeViewer };
};
