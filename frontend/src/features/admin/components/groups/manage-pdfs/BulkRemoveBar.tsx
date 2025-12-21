type Props = {
  isVisible: boolean;
  selectedCount: number;
  isRemoving: boolean;
  onRemove: () => void;
  onClear: () => void;
};

export const BulkRemoveBar = ({
  isVisible,
  selectedCount,
  isRemoving,
  onRemove,
  onClear,
}: Props) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-30 flex justify-center">
      <div className="flex items-center gap-3 rounded-full bg-slate-900/95 px-4 py-2 text-white shadow-xl backdrop-blur-sm">
        <span className="text-xs sm:text-sm">
          {selectedCount} seleccionado
          {selectedCount > 1 ? "s" : ""}
        </span>

        <button
          type="button"
          className="text-xs sm:text-sm rounded-full border border-red-400 px-3 py-1 hover:bg-red-500/90 hover:border-red-500 bg-red-500/80 transition disabled:opacity-60"
          onClick={onRemove}
          disabled={isRemoving}
        >
          {isRemoving ? "Quitando..." : "Quitar del grupo"}
        </button>

        <button
          type="button"
          className="text-xs sm:text-sm rounded-full border border-white/20 px-2 py-1 hover:bg-white/10 transition hidden sm:inline-flex"
          onClick={onClear}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
};
