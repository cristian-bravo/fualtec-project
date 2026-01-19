import * as yup from "yup";

export const resetSchema = yup.object({
  password: yup
    .string()
    .min(8, "Debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe incluir una letra mayúscula")
    .matches(/[a-z]/, "Debe incluir una letra minúscula")
    .matches(/\d/, "Debe incluir un numero")
    .matches(/[^A-Za-z0-9]/, "Debe incluir un carácter especial")
    .required("Ingrese una contraseña"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirme su contraseña"),
});
