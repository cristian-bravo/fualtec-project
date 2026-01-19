import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type UserFormValues = {
  nombre: string;
  email: string;
  cedula: string;
  rol: "admin" | "cliente";
  estado: "aprobado" | "inactivo";
  password: string;
};

type Props = {
  values: UserFormValues;
  onChange: (
    field: keyof UserFormValues,
    value: UserFormValues[keyof UserFormValues]
  ) => void;
  onSubmit: () => void;
  isSaving: boolean;
};

export const UserEditForm = ({ values, onChange, onSubmit, isSaving }: Props) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Nombre completo"
          value={values.nombre}
          onChange={(event) => onChange("nombre", event.target.value)}
          placeholder="Nombre del usuario"
          autoComplete="name"
        />
        <Input
          label="Correo corporativo"
          value={values.email}
          onChange={(event) => onChange("email", event.target.value)}
          placeholder="correo@empresa.com"
          type="email"
          autoComplete="email"
        />
        <Input
          label="Cédula"
          value={values.cedula}
          onChange={(event) => onChange("cedula", event.target.value)}
          placeholder="0102030405"
          inputMode="numeric"
        />
        <Select
          label="Rol"
          value={values.rol}
          onChange={(event) =>
            onChange("rol", event.target.value as UserFormValues["rol"])
          }
        >
          <option value="admin">Admin</option>
          <option value="cliente">Cliente</option>
        </Select>
        <Select
          label="Estado"
          value={values.estado}
          onChange={(event) =>
            onChange("estado", event.target.value as UserFormValues["estado"])
          }
        >
          <option value="aprobado">Habilitado</option>
          <option value="inactivo">Deshabilitado</option>
        </Select>
        <Input
          label="Nueva contraseña"
          value={values.password}
          onChange={(event) => onChange("password", event.target.value)}
          placeholder="Dejar vacío para mantener"
          type="password"
          autoComplete="new-password"
          hint="Deje en blanco si no desea cambiarla."
        />
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button type="submit" isLoading={isSaving}>
          Guardar cambios
        </Button>
      </div>
    </form>
  );
};
