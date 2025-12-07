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

export const confirmDelete = async (title: string) => {
  const result = await Swal.fire({
    title,
    icon: "warning",
    text: "Esta acción no se puede deshacer",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  });

  return result.isConfirmed;
};
