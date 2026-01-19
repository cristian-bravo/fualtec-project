import * as yup from "yup";
import { isValidEcuadorId } from "../utils/ecuador-id";

export const registerSchema = yup.object({
  nombre: yup.string().required("Ingrese su nombre completo"),
  email: yup.string().email("Correo invalido").required("Ingrese un correo corporativo"),
  cedula: yup
    .string()
    .required("Ingrese su cedula")
    .test(
      "cedula-ec",
      "Cedula o RUC ecuatoriano invalido (10 o 13 dígitos)",
      (v) => !!v && isValidEcuadorId(v)
    ),
  password: yup
    .string()
    .min(8, "Debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe incluir una letra mayúscula")
    .matches(/[a-z]/, "Debe incluir una letra minúscula")
    .matches(/\d/, "Debe incluir un numero")
    .matches(/[^A-Za-z0-9]/, "Debe incluir un carácter especial")
    .required("Ingrese una contraseña segura"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirme su contraseña"),
  captcha_token: yup.string().required("Complete el captcha"),
  captcha_answer: yup.string().required("Complete el captcha"),
});
