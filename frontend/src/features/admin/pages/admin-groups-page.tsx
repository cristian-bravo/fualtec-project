import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { alertError, alertSuccess, confirmAction } from "@/lib/alerts";
import { Button } from "../../../components/ui/button";
import { Table } from "../../../components/ui/table";
import { CheckCircle2, Clock, FileText, UploadCloud } from "lucide-react";
import {
  GroupSummary,
  fetchGroups,
  publishGroup,
  unpublishGroup,
} from "../services/groupService";
import { PublishGroupModal } from "../components/groups/PublishGroupModal";

export const AdminGroupsPage = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  const [groups, setGroups] = useState<GroupSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [publishingId, setPublishingId] = useState<number | null>(null);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishTarget, setPublishTarget] = useState<GroupSummary | null>(null);

  const [page, setPage] = useState(1);
  const perPage = 6;

  const totalPages = Math.max(1, Math.ceil(groups.length / perPage));

  const paginatedGroups = useMemo(() => {
    const start = (page - 1) * perPage;
    return groups.slice(start, start + perPage);
  }, [groups, page, perPage]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const loadGroups = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchGroups(token);
      setGroups(data);
    } catch (error) {
      console.error(error);
      alertError("No se pudieron cargar los grupos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handlePublish = (group: GroupSummary) => {
    if (group.publicado) return;
    setPublishTarget(group);
    setPublishModalOpen(true);
  };

  const handleConfirmPublish = async (userIds: number[]) => {
    if (!token || !publishTarget) return;
    setPublishingId(publishTarget.id);
    try {
      const result = await publishGroup(token, publishTarget.id, userIds);
      setGroups((prev) =>
        prev.map((item) =>
          item.id === publishTarget.id
            ? { ...item, publicado: true, published_at: result.published_at }
            : item
        )
      );
      alertSuccess("Grupo publicado correctamente.");
      setPublishModalOpen(false);
      setPublishTarget(null);
    } catch (error: any) {
      console.error(error);
      const message =
        error?.response?.data?.message || "No se pudo publicar el grupo.";
      alertError(message);
    } finally {
      setPublishingId(null);
    }
  };

  const handleUnpublish = async (group: GroupSummary) => {
    if (!token || !group.publicado) return;
    const confirmed = await confirmAction(
      `Ocultar el grupo "${group.name}"?`,
      "Si, ocultar"
    );
    if (!confirmed) return;

    setPublishingId(group.id);
    try {
      await unpublishGroup(token, group.id);
      setGroups((prev) =>
        prev.map((item) =>
          item.id === group.id
            ? { ...item, publicado: false, published_at: null }
            : item
        )
      );
      alertSuccess("Grupo ocultar correctamente.");
    } catch (error: any) {
      console.error(error);
      const message =
        error?.response?.data?.message || "No se pudo ocultar el grupo.";
      alertError(message);
    } finally {
      setPublishingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Debe iniciar sesion para gestionar grupos.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Grupos de publicaciones
          </h1>
          <p className="text-sm text-slate-600">
            Cree agrupaciones de PDFs y programe la publicacion para distintos
            clientes o segmentos.
          </p>
        </div>
      </div>

      <Table headers={["Nombre", "Periodo", "Estado", "Acciones"]}>
        {isLoading && (
          <tr>
            <td
              colSpan={4}
              className="px-6 py-4 text-center text-sm text-slate-500"
            >
              Cargando grupos...
            </td>
          </tr>
        )}

        {!isLoading && groups.length === 0 && (
          <tr>
            <td
              colSpan={4}
              className="px-6 py-4 text-center text-sm text-slate-500"
            >
              No hay grupos registrados.
            </td>
          </tr>
        )}

        {!isLoading &&
          paginatedGroups.map((group) => (
            <tr key={group.id} className="align-middle">
              <td className="px-6 py-4 font-semibold text-slate-900">
                {group.name}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {group.periodo || "-"}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    group.publicado
                      ? "bg-green-50 text-green-700"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {group.publicado ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Clock className="h-3.5 w-3.5" />
                  )}
                  {group.publicado ? "Publicado" : "Borrador"}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col items-end gap-2 sm:flex-row sm:justify-end">
                  <div className="relative group">
                    <Button
                      variant="primary"
                      onClick={() =>
                        navigate(`/client-access/admin/grupos/${group.id}/pdfs`)
                      }
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Gestionar
                    </Button>
                    <span
                      className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2
                                rounded bg-slate-900 px-2 py-1 text-xs text-white
                                opacity-0 group-hover:opacity-100 transition"
                    >
                      Gestionar PDFs del grupo
                    </span>
                  </div>

                  {group.publicado ? (
                    <Button
                      variant="secondary"
                      isLoading={publishingId === group.id}
                      onClick={() => handleUnpublish(group)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Ocultar
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      isLoading={publishingId === group.id}
                      onClick={() => handlePublish(group)}
                      className="flex items-center gap-2"
                    >
                      <UploadCloud className="h-4 w-4" />
                      Publicar
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
      </Table>

      {!isLoading && groups.length > perPage && (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <Button
            variant="secondary"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Anterior
          </Button>
          <span>
            Pagina {page} de {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Siguiente
          </Button>
        </div>
      )}

      <PublishGroupModal
        open={publishModalOpen}
        groupName={publishTarget?.name}
        isLoading={!!publishingId}
        onClose={() => {
          if (!publishingId) {
            setPublishModalOpen(false);
            setPublishTarget(null);
          }
        }}
        onConfirm={handleConfirmPublish}
      />
    </div>
  );
};
