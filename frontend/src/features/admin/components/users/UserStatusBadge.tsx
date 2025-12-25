import { Badge } from "@/components/ui/badge";

type Props = {
  estado?: string | null;
};

const getStatusConfig = (estado?: string | null) => {
  if (estado === "inactivo") {
    return { label: "Deshabilitado", tone: "danger" as const };
  }

  if (estado === "pendiente") {
    return { label: "Pendiente", tone: "warning" as const };
  }

  if (estado === "rechazado") {
    return { label: "Rechazado", tone: "danger" as const };
  }

  return { label: "Habilitado", tone: "success" as const };
};

export const UserStatusBadge = ({ estado }: Props) => {
  const { label, tone } = getStatusConfig(estado);

  return <Badge tone={tone}>{label}</Badge>;
};
