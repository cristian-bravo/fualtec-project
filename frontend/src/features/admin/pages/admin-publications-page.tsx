import { useEffect, useState } from "react";
import { Table } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Modal } from "../../../components/ui/modal";
import { useAuth } from "@/hooks/use-auth";
import { alertError } from "@/lib/alerts";
import { Eye } from "lucide-react";
import {
  fetchPublicationDetail,
  fetchPublications,
  PublicationItem,
} from "../services/publicationService";
import { GroupDetail } from "../services/groupService";
import { getPdfBlob, PdfItem } from "../services/pdfService";
import { PdfViewerModal } from "../components/pdfs/PdfViewerModal";

export const AdminPublicationsPage = () => {
  const { token, isAuthenticated } = useAuth();

  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detail, setDetail] = useState<GroupDetail | null>(null);

  const [viewer, setViewer] = useState<{ title: string; url: string } | null>(
    null
  );

  const detailCreator =
    detail?.creator?.nombre || detail?.creator?.email || "-";
  const detailPublisher =
    detail?.publisher?.nombre || detail?.publisher?.email || "-";
  const detailPublishedAt = detail?.published_at
    ? new Date(detail.published_at).toLocaleDateString("es-ES")
    : "-";
  const detailUsers = detail?.linked_users || [];

  const loadPublications = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchPublications(token);
      setPublications(data);
    } catch (error) {
      console.error(error);
      alertError("No se pudo cargar el historial de publicaciones.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPublications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const openDetail = async (groupId: number) => {
    if (!token) return;
    setDetail(null);
    setDetailLoading(true);
    setDetailOpen(true);
    try {
      const data = await fetchPublicationDetail(token, groupId);
      setDetail(data);
    } catch (error) {
      console.error(error);
      alertError("No se pudo cargar el detalle de la publicaciÃ³n.");
      setDetailOpen(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleViewPdf = async (pdf: PdfItem) => {
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
      alertError("No se pudo abrir el PDF.");
    }
  };

  const closeViewer = () => {
    if (viewer?.url) {
      URL.revokeObjectURL(viewer.url);
    }
    setViewer(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Debe iniciar sesiÃ³n para ver las publicaciones.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">
          Historial de publicaciones
        </h1>
        <p className="text-sm text-slate-600">
          Consulte los grupos publicados y programe nuevas ventanas de
          disponibilidad.
        </p>
      </div>
      <Table
        headers={[
          "Grupo",
          "Periodo",
          "Creado por",
          "Publicado",
          "Publicado por",
          "",
        ]}
      >
        {isLoading && (
          <tr>
            <td
              colSpan={6}
              className="px-6 py-4 text-center text-sm text-slate-500"
            >
              Cargando informacion de la publicacion.
            </td>
          </tr>
        )}

        {!isLoading && publications.length === 0 && (
          <tr>
            <td
              colSpan={6}
              className="px-6 py-4 text-center text-sm text-slate-500"
            >
              No hay publicaciones registradas.
            </td>
          </tr>
        )}

        {!isLoading &&
          publications.map((item) => {
            const creator =
              item.creator?.nombre || item.creator?.email || "-";
            const publisher =
              item.publisher?.nombre || item.publisher?.email || "-";

            return (
              <tr key={item.id}>
                <td className="px-6 py-4 font-semibold text-slate-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {item.periodo || "-"}
                </td>
                <td className="px-6 py-4 text-slate-600">{creator}</td>
                <td className="px-6 py-4 text-slate-600">
                  {item.published_at
                    ? new Date(item.published_at).toLocaleDateString("es-ES")
                    : "-"}
                </td>
                <td className="px-6 py-4 text-slate-600">{publisher}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => openDetail(item.id)}
                      className="flex items-center gap-2 rounded-full border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 hover:shadow-sm transition"
                    >
                      <Eye className="h-4 w-4" />
                      Ver detalle
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
      </Table>

      <Modal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        title={detail?.name || "Detalle de publicacion"}
        description={
          detail
            ? `Periodo ${detail.periodo || "Sin periodo"} - Publicado ${
                detail.published_at
                  ? new Date(detail.published_at).toLocaleDateString("es-ES")
                  : "-"
              }`
            : "Cargando informacion de la publicacion."
        }
      >
        {detailLoading && (
          <div className="py-4 text-center text-sm text-slate-500">
            Cargando PDFs del grupo...
          </div>
        )}

        {!detailLoading && detail && (
          <div className="space-y-4">
            <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600 sm:grid-cols-3">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wide text-slate-400">
                  Creado por
                </span>
                <div className="font-semibold text-slate-700">{detailCreator}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wide text-slate-400">
                  Publicado
                </span>
                <div className="font-semibold text-slate-700">{detailPublishedAt}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wide text-slate-400">
                  Publicado por
                </span>
                <div className="font-semibold text-slate-700">{detailPublisher}</div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 px-4 py-3">
              <div className="text-xs font-semibold text-slate-700">
                Usuarios enlazados
              </div>
              {detailUsers.length === 0 ? (
                <div className="mt-2 text-xs text-slate-500">
                  No hay usuarios enlazados.
                </div>
              ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                  {detailUsers.map((user) => (
                    <span
                      key={user.id}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                    >
                      {user.nombre || user.email}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <Table headers={["Titulo", ""]}>
              {detail.pdfs.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="px-6 py-4 text-center text-sm text-slate-500"
                  >
                    No hay PDFs asociados a este grupo.
                  </td>
                </tr>
              )}

              {detail.pdfs.map((pdf: PdfItem) => (
                <tr key={pdf.id}>
                  <td className="px-6 py-3">
                    <div className="text-sm font-semibold text-slate-900 break-words">
                      {pdf.title || pdf.filename}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Button variant="ghost" onClick={() => handleViewPdf(pdf)}>
                      Ver PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        )}
      </Modal>

      <PdfViewerModal
        open={!!viewer}
        title={viewer?.title || ""}
        url={viewer?.url || ""}
        onClose={closeViewer}
      />
    </div>
  );
};
