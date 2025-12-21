import { useEffect, useMemo, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { alertError } from "@/lib/alerts";
import { AdminUser, fetchUsers } from "../../services/userService";

type Props = {
  open: boolean;
  groupName?: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: (userIds: number[]) => void;
};

const MAX_SELECTION = 3;

export const PublishGroupModal = ({
  open,
  groupName,
  isLoading = false,
  onClose,
  onConfirm,
}: Props) => {
  const { token } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !token) return;
    setIsLoadingUsers(true);
    fetchUsers(token, { rol: "cliente", estado: "aprobado" })
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error(err);
        alertError("No se pudieron cargar los usuarios.");
      })
      .finally(() => setIsLoadingUsers(false));
  }, [open, token]);

  useEffect(() => {
    if (!open) {
      setSelectedIds([]);
      setSearch("");
      setError(null);
    }
  }, [open]);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.trim().toLowerCase();
    return users.filter(
      (user) =>
        user.nombre?.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q)
    );
  }, [users, search]);

  const toggleUser = (id: number) => {
    setError(null);
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= MAX_SELECTION) {
        setError("Solo puede seleccionar hasta 3 usuarios.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleConfirm = () => {
    if (!selectedIds.length) {
      setError("Debe seleccionar al menos un usuario.");
      return;
    }
    onConfirm(selectedIds);
  };

  return (
    <Modal
      isOpen={open}
      title="Publicar grupo"
      description={
        groupName
          ? `Seleccione hasta ${MAX_SELECTION} usuarios para "${groupName}".`
          : `Seleccione hasta ${MAX_SELECTION} usuarios para publicar el grupo.`
      }
      onClose={onClose}
      actions={
        <Button
          onClick={handleConfirm}
          disabled={isLoading || isLoadingUsers}
          isLoading={isLoading}
        >
          Publicar
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar usuario..."
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <span className="text-xs text-slate-500">
            {selectedIds.length}/{MAX_SELECTION}
          </span>
        </div>

        {error && (
          <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
            {error}
          </div>
        )}

        <div className="max-h-64 overflow-y-auto rounded-md border border-slate-200">
          {isLoadingUsers && (
            <div className="px-4 py-3 text-sm text-slate-500">
              Cargando usuarios...
            </div>
          )}

          {!isLoadingUsers && filteredUsers.length === 0 && (
            <div className="px-4 py-3 text-sm text-slate-500">
              No hay usuarios disponibles.
            </div>
          )}

          {!isLoadingUsers &&
            filteredUsers.map((user) => {
              const checked = selectedIds.includes(user.id);
              return (
                <label
                  key={user.id}
                  className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0 hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300"
                    checked={checked}
                    onChange={() => toggleUser(user.id)}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">
                      {user.nombre}
                    </div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      checked
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {checked ? "Seleccionado" : "Disponible"}
                  </span>
                </label>
              );
            })}
        </div>
      </div>
    </Modal>
  );
};
