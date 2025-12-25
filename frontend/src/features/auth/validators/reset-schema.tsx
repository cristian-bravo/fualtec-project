import * as yup from "yup";

export const resetSchema = yup.object({
  password: yup
    .string()
    .min(8, "Debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe incluir una letra mayuscula")
    .matches(/[a-z]/, "Debe incluir una letra minuscula")
    .matches(/\d/, "Debe incluir un numero")
    .matches(/[^A-Za-z0-9]/, "Debe incluir un caracter especial")
    .required("Ingrese una contrasena"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contrasenas no coinciden")
    .required("Confirme su contrasena"),
});
