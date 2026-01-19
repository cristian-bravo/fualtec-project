import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PdfViewerModal } from "../components/pdfs/PdfViewerModal";
import { useAuth } from "@/hooks/use-auth";
import { alertError, alertSuccess, confirmAction } from "@/lib/alerts";
import {
  GroupDetail,
  addPdfsToGroup,
  fetchAvailablePdfsForGroup,
  fetchGroupDetail,
  publishGroup,
  unpublishGroup,
  removePdfFromGroup,
} from "../services/groupService";
import { PdfItem } from "../services/pdfService";
import { usePdfViewer } from "../hooks/usePdfViewer";
import { usePagination } from "../hooks/usePagination";
import { GroupHeader } from "../components/groups/manage-pdfs/GroupHeader";
import { CurrentGroupPdfsSection } from "../components/groups/manage-pdfs/CurrentGroupPdfsSection";
import { AvailablePdfsSection } from "../components/groups/manage-pdfs/AvailablePdfsSection";
import { BulkRemoveBar } from "../components/groups/manage-pdfs/BulkRemoveBar";
import { PublishGroupModal } from "../components/groups/PublishGroupModal";
import { Button } from "@/components/ui/button";

export const AdminGroupsManagePdfsPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  const numericGroupId = groupId ? Number(groupId) : null;

  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [currentPdfs, setCurrentPdfs] = useState<PdfItem[]>([]);
  const [selectedCurrentIds, setSelectedCurrentIds] = useState<number[]>([]);

  const [availablePdfs, setAvailablePdfs] = useState<PdfItem[]>([]);
  const [selectedToAdd, setSelectedToAdd] = useState<number[]>([]);
  const [searchAvailable, setSearchAvailable] = useState("");
  const [availableStatus, setAvailableStatus] = useState<"all" | "grouped" | "ungrouped">("all");

  const [loadingGroup, setLoadingGroup] = useState(true);
  const [loadingAvailable, setLoadingAvailable] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [bulkRemoving, setBulkRemoving] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const perPage = 6;

  const {
    page: currentPage,
    setPage: setCurrentPage,
    totalPages: totalPages,
    paginated: paginatedCurrent,
  } = usePagination(currentPdfs, perPage);

  const filteredAvailablePdfs = useMemo(() => {
    if (availableStatus === "grouped") {
      return availablePdfs.filter((pdf) => pdf.vigente);
    }
    if (availableStatus === "ungrouped") {
      return availablePdfs.filter((pdf) => !pdf.vigente);
    }
    return availablePdfs;
  }, [availablePdfs, availableStatus]);

  const {
    page: availablePage,
    setPage: setAvailablePage,
    totalPages: totalAvailablePages,
    paginated: paginatedAvailable,
  } = usePagination(filteredAvailablePdfs, perPage);

  const handleAvailableStatusChange = (
    value: "all" | "grouped" | "ungrouped"
  ) => {
    setAvailableStatus(value);
    setAvailablePage(1);
  };

  const { viewer, openPdf, closeViewer } = usePdfViewer(token, (message) =>
    alertError(message)
  );

  const loadGroup = async () => {
    if (!token || !numericGroupId) return;
    setLoadingGroup(true);
    try {
      const detail = await fetchGroupDetail(token, numericGroupId);
      setGroup(detail);
      setCurrentPdfs(detail.pdfs || []);
      setSelectedCurrentIds([]);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      alertError("No se pudo cargar el grupo.");
    } finally {
      setLoadingGroup(false);
    }
  };

  const loadAvailable = async (search?: string) => {
    if (!token || !numericGroupId) return;
    setLoadingAvailable(true);
    try {
      const data = await fetchAvailablePdfsForGroup(
        token,
        numericGroupId,
        search
      );
      setAvailablePdfs(data);
      setSelectedToAdd([]);
      setAvailablePage(1);
    } catch (error) {
      console.error(error);
      alertError("No se pudieron obtener los PDFs disponibles.");
    } finally {
      setLoadingAvailable(false);
    }
  };

  useEffect(() => {
    loadGroup();
    loadAvailable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, numericGroupId]);

  const handleRemoveFromGroup = async (pdf: PdfItem) => {
    if (!token || !numericGroupId) return;
    const confirmed = window.confirm(
      `Quitar "${pdf.title || pdf.filename}" del grupo? El archivo seguirá disponible.`
    );
    if (!confirmed) return;

    setRemovingId(pdf.id);
    try {
      await removePdfFromGroup(token, numericGroupId, pdf.id);
      setCurrentPdfs((prev) => prev.filter((item) => item.id !== pdf.id));
      setSelectedCurrentIds((prev) => prev.filter((id) => id !== pdf.id));
      await loadAvailable(searchAvailable);
      alertSuccess("PDF removido del grupo.");
    } catch (error) {
      console.error(error);
      alertError("No se pudo remover el PDF del grupo.");
    } finally {
      setRemovingId(null);
    }
  };

  const handleRemoveSelected = async () => {
    if (!token || !numericGroupId || selectedCurrentIds.length === 0) return;
    const confirmed = window.confirm(
      `Quitar ${selectedCurrentIds.length} PDFs del grupo?`
    );
    if (!confirmed) return;

    setBulkRemoving(true);
    try {
      const results = await Promise.allSettled(
        selectedCurrentIds.map((id) =>
          removePdfFromGroup(token, numericGroupId, id)
        )
      );

      const removedIds = selectedCurrentIds.filter(
        (_id, index) => results[index].status === "fulfilled"
      );

      if (removedIds.length > 0) {
        setCurrentPdfs((prev) =>
          prev.filter((item) => !removedIds.includes(item.id))
        );
        setSelectedCurrentIds((prev) =>
          prev.filter((id) => !removedIds.includes(id))
        );
        await loadAvailable(searchAvailable);
      }

      if (results.some((result) => result.status === "rejected")) {
        alertError("No se pudieron remover algunos PDFs del grupo.");
      } else {
        alertSuccess("PDFs removidos del grupo.");
      }
    } catch (error) {
      console.error(error);
      alertError("No se pudieron remover los PDFs del grupo.");
    } finally {
      setBulkRemoving(false);
    }
  };

  const handleAddSelected = async () => {
    if (!token || !numericGroupId || selectedToAdd.length === 0) return;
    setAdding(true);
    try {
      await addPdfsToGroup(token, numericGroupId, selectedToAdd);
      await loadGroup();
      await loadAvailable(searchAvailable);
      alertSuccess("PDFs agregados al grupo.");
    } catch (error: any) {
      console.error(error);
      const message =
        error?.response?.data?.errors?.pdfs?.[0] ||
        error?.response?.data?.message ||
        "No se pudieron agregar los PDFs.";
      alertError(message);
    } finally {
      setAdding(false);
    }
  };

  const toggleSelectCurrent = (id: number) => {
    setSelectedCurrentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAllCurrent = () => {
    const visibleIds = paginatedCurrent.map((pdf) => pdf.id);
    const allVisibleSelected =
      visibleIds.length > 0 &&
      visibleIds.every((id) => selectedCurrentIds.includes(id));

    if (allVisibleSelected) {
      setSelectedCurrentIds((prev) =>
        prev.filter((id) => !visibleIds.includes(id))
      );
    } else {
      setSelectedCurrentIds((prev) =>
        Array.from(new Set([...prev, ...visibleIds]))
      );
    }
  };

  const toggleSelectAllAvailable = () => {
    const visibleIds = paginatedAvailable.map((pdf) => pdf.id);
    const allVisibleSelected =
      visibleIds.length > 0 &&
      visibleIds.every((id) => selectedToAdd.includes(id));

    if (allVisibleSelected) {
      setSelectedToAdd((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedToAdd((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const toggleSelectToAdd = (id: number) => {
    setSelectedToAdd((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const hasCurrentSelection = selectedCurrentIds.length > 0;

  const handlePublishGroup = async (userIds: number[]) => {
    if (!token || !numericGroupId) return;
    setPublishing(true);
    try {
      const result = await publishGroup(token, numericGroupId, userIds);
      setGroup((prev) =>
        prev
          ? {
              ...prev,
              publicado: true,
              published_at: result.published_at,
            }
          : prev
      );
      alertSuccess("Grupo publicado correctamente.");
      setPublishModalOpen(false);
    } catch (error: any) {
      console.error(error);
      const message =
        error?.response?.data?.message || "No se pudo publicar el grupo.";
      alertError(message);
    } finally {
      setPublishing(false);
    }
  };

  const handleUnpublishGroup = async () => {
    if (!token || !numericGroupId || !group?.publicado) return;
    const confirmed = await confirmAction(
      `Ocultar el grupo "${group.name}"?`,
      "Si, Ocultar"
    );
    if (!confirmed) return;

    setPublishing(true);
    try {
      await unpublishGroup(token, numericGroupId);
      setGroup((prev) =>
        prev
          ? {
              ...prev,
              publicado: false,
              published_at: null,
            }
          : prev
      );
      alertSuccess("Grupo ocultado correctamente.");
    } catch (error: any) {
      console.error(error);
      const message =
        error?.response?.data?.message || "No se pudo ocultar el grupo.";
      alertError(message);
    } finally {
      setPublishing(false);
    }
  };
  console.log({
  currentPdfsLength: currentPdfs.length,
  paginatedCurrentLength: paginatedCurrent.length,
  perPage,
  totalPages,
});

  if (!isAuthenticated) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Debe iniciar sesión para gestionar PDFs.
      </div>
    );
  }

  if (!numericGroupId) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Grupo no encontrado.
      </div>
    );
  }

  return (
    <div className="relative space-y-8 px-4 sm:px-6 lg:px-8">
      <GroupHeader
        loadingGroup={loadingGroup}
        group={group}
        onBack={() => navigate("/client-access/admin/grupos")}
        actions={
          group?.publicado ? (
            <Button
              variant="secondary"
              disabled={loadingGroup || !group}
              isLoading={publishing}
              onClick={handleUnpublishGroup}
            >
              Ocultar
            </Button>
          ) : (
            <Button
              variant="primary"
              disabled={loadingGroup || !group}
              isLoading={publishing}
              onClick={() => setPublishModalOpen(true)}
            >
              Publicar
            </Button>
          )
        }
      />

      <CurrentGroupPdfsSection
        pdfs={currentPdfs}
        paginatedPdfs={paginatedCurrent}
        selectedIds={selectedCurrentIds}
        onToggleRow={toggleSelectCurrent}
        onToggleAll={toggleSelectAllCurrent}
        onView={openPdf}
        onRemove={handleRemoveFromGroup}
        isLoading={loadingGroup}
        page={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        perPage={perPage}
      />

      <AvailablePdfsSection
        availablePdfs={filteredAvailablePdfs}
        paginatedPdfs={paginatedAvailable}
        selectedIds={selectedToAdd}
        searchValue={searchAvailable}
        onSearchValueChange={setSearchAvailable}
        onSearch={() => loadAvailable(searchAvailable)}
        status={availableStatus}
        onChangeStatus={handleAvailableStatusChange}
        onToggleSelect={toggleSelectToAdd}
        onToggleSelectAll={toggleSelectAllAvailable}
        onView={openPdf}
        isLoading={loadingAvailable}
        isAdding={adding}
        onAddSelected={handleAddSelected}
        perPage={perPage}
        page={availablePage}
        totalPages={totalAvailablePages}
        onPageChange={setAvailablePage}
      />

      <BulkRemoveBar
        isVisible={hasCurrentSelection}
        selectedCount={selectedCurrentIds.length}
        isRemoving={bulkRemoving}
        onRemove={handleRemoveSelected}
        onClear={() => setSelectedCurrentIds([])}
      />

      <PdfViewerModal
        open={!!viewer}
        title={viewer?.title || ""}
        url={viewer?.url || ""}
        onClose={closeViewer}
      />

      <PublishGroupModal
        open={publishModalOpen}
        groupName={group?.name}
        isLoading={publishing}
        onClose={() => setPublishModalOpen(false)}
        onConfirm={handlePublishGroup}
      />
      
    </div>
  );
};

