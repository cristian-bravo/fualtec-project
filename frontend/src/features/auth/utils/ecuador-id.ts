const isValidProvince = (value: string): boolean => {
  const provincia = parseInt(value.slice(0, 2), 10);
  return provincia >= 1 && provincia <= 24;
};

const computeMod11Check = (digits: number[], coef: number[]): number => {
  let suma = 0;
  for (let i = 0; i < coef.length; i += 1) {
    suma += digits[i] * coef[i];
  }
  const mod = suma % 11;
  const verificador = 11 - mod;
  if (verificador === 11) return 0;
  if (verificador === 10) return -1;
  return verificador;
};

const isValidCedula = (cedula: string): boolean => {
  if (!/^\d{10}$/.test(cedula)) return false;
  if (!isValidProvince(cedula)) return false;
  const thirdDigit = parseInt(cedula[2], 10);
  if (thirdDigit < 0 || thirdDigit > 5) return false;
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

const hasValidEstablishment = (suffix: string): boolean =>
  /^\d+$/.test(suffix) && parseInt(suffix, 10) > 0;

const isValidNaturalRuc = (ruc: string): boolean => {
  const cedula = ruc.slice(0, 10);
  const suffix = ruc.slice(10);
  return isValidCedula(cedula) && hasValidEstablishment(suffix);
};

const isValidPrivateRuc = (ruc: string): boolean => {
  if (!hasValidEstablishment(ruc.slice(10))) return false;
  const digits = ruc.split("").map(Number);
  const coef = [4, 3, 2, 7, 6, 5, 4, 3, 2];
  const verificador = computeMod11Check(digits, coef);
  return verificador !== -1 && verificador === digits[9];
};

const isValidPublicRuc = (ruc: string): boolean => {
  if (!hasValidEstablishment(ruc.slice(9))) return false;
  const digits = ruc.split("").map(Number);
  const coef = [3, 2, 7, 6, 5, 4, 3, 2];
  const verificador = computeMod11Check(digits, coef);
  return verificador !== -1 && verificador === digits[8];
};

export const isValidEcuadorId = (cedulaOrRuc: string): boolean => {
  const value = cedulaOrRuc.trim();
  if (/^\d{10}$/.test(value)) {
    return isValidCedula(value);
  }
  if (!/^\d{13}$/.test(value)) return false;
  if (!isValidProvince(value)) return false;
  const thirdDigit = parseInt(value[2], 10);
  if (thirdDigit >= 0 && thirdDigit <= 5) {
    return isValidNaturalRuc(value);
  }
  if (thirdDigit === 6) {
    return isValidPublicRuc(value);
  }
  if (thirdDigit === 9) {
    return isValidPrivateRuc(value);
  }
  return false;
};
