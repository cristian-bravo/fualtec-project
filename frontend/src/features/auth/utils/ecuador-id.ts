export const isValidEcuadorId = (cedula: string): boolean => {
  if (!/^\d{10}$/.test(cedula)) return false;
  const provincia = parseInt(cedula.slice(0, 2), 10);
  if (provincia < 1 || provincia > 24) return false;
  const digits = cedula.split("").map(Number);
  const coef = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;
  for (let i = 0; i < 9; i += 1) {
    let prod = digits[i] * coef[i];
    if (prod >= 10) prod -= 9;
    suma += prod;
  }
  const verificador = (Math.ceil(suma / 10) * 10 - suma) % 10;
  return verificador === digits[9];
};
