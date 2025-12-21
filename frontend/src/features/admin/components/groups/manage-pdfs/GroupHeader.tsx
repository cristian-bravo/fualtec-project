import { ReactNode } from "react";
import { GroupDetail } from "../../../services/groupService";

type Props = {
  loadingGroup: boolean;
  group: GroupDetail | null;
  onBack: () => void;
  actions?: ReactNode;
};

export const GroupHeader = ({ loadingGroup, group, onBack, actions }: Props) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="space-y-2">
        <button
          className="text-sm text-blue-600 hover:text-blue-700"
          onClick={onBack}
        >
          &lt; Volver a grupos
        </button>
        <h1 className="text-2xl font-bold text-slate-900">
          Gesti? de PDFs del grupo
        </h1>
        <div className="text-sm text-slate-600">
          {loadingGroup
            ? "Cargando grupo..."
            : `${group?.name || "Grupo"} ? ${group?.periodo || "Sin periodo"}`}
        </div>
        {group && (
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                group.publicado
                  ? "bg-green-50 text-green-700"
                  : "bg-yellow-50 text-yellow-700"
              }`}
            >
              {group.publicado ? "Publicado" : "Borrador"}
            </span>
            {group.published_at && (
              <span className="text-xs text-slate-500">
                Publicado:{" "}
                {new Date(group.published_at).toLocaleDateString("es-ES")}
              </span>
            )}
          </div>
        )}
      </div>
      {actions && <div className="flex items-start">{actions}</div>}
    </div>
  );
};
