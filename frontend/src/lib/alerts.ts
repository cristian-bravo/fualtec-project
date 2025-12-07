import Swal from "sweetalert2";

export const alertSuccess = (message: string) => {
  return Swal.fire({
    icon: "success",
    title: "Éxito",
    text: message,
    timer: 1800,
    showConfirmButton: false,
  });
};

export const alertError = (message: string) => {
  return Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
};

export async function confirmDelete(message: string): Promise<boolean> {
  const result = await Swal.fire({
    title: "Confirmar eliminación",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  return result.isConfirmed === true;
}
