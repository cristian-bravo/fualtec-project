import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Download, FolderOpen, Search } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Tooltip } from "../../../components/ui/tooltip";
import { useClientGroups } from "../hooks/useClientGroups";

const formatDate = (value?: string | null) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const ClientDocumentsPage = () => {
  const { isAuthenticated, publications, isLoading, actionId, downloadGroup } =
    useClientGroups();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return publications;
    return publications.filter((item) => {
      const name = item.group?.name?.toLowerCase() || "";
      const periodo = item.group?.periodo?.toLowerCase() || "";
      return name.includes(term) || periodo.includes(term);
    });
  }, [publications, searchTerm]);

  const openGroup = (groupId: number, publicationId: number) => {
    const publication = publications.find((item) => item.id === publicationId);
    if (!publication?.group) return;
    navigate(`/client-access/app/documentos/grupos/${groupId}`, {
      state: {
        groupName: publication.group.name,
        groupPeriodo: publication.group.periodo,
        publishedAt: publication.published_at,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="px-4 py-8 text-center text-sm text-slate-600">
        Debe iniciar sesion para revisar documentos.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">
          Carpetas asignadas
        </h1>
        <p className="text-sm text-slate-600">
          Seleccione un grupo para ver los PDFs publicados a su nombre.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Buscar carpeta..."
            className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <Button
          onClick={() => setSearchTerm(searchInput.trim())}
          className="px-4"
        >
          Buscar
        </Button>
      </div>

      {isLoading && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
          Cargando carpetas...
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
          No hay grupos publicados para su cuenta.
        </div>
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((publication) => {
            const group = publication.group;
            if (!group) return null;
            return (
              <div
                key={publication.id}
                onDoubleClick={() => openGroup(group.id, publication.id)}
                className="cursor-pointer"
              >
                <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Grupo publicado
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        {group.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {group.periodo || "Periodo no definido"}
                      </p>
                      <p className="mt-3 text-xs text-slate-500">
                        Documentos: {group.items_count ?? 0}
                      </p>
                    </div>
                    <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      Carpeta
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-slate-500">
                    Publicado: {formatDate(publication.published_at)}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Tooltip content="Ver documentos">
                      <button
                        type="button"
                        aria-label="Ver documentos"
                        onClick={(event) => {
                          event.stopPropagation();
                          openGroup(group.id, publication.id);
                        }}
                        onDoubleClick={(event) => event.stopPropagation()}
                        className="rounded-md border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      >
                        <FolderOpen className="h-4 w-4" />
                      </button>
                    </Tooltip>
                    <Tooltip content="Descargar carpeta">
                      <button
                        type="button"
                        aria-label="Descargar carpeta"
                        onClick={(event) => {
                          event.stopPropagation();
                          downloadGroup(publication);
                        }}
                        onDoubleClick={(event) => event.stopPropagation()}
                        disabled={actionId === publication.id}
                        className={`rounded-md border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 ${actionId === publication.id ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </Tooltip>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
