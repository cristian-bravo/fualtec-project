import { useCallback, useState } from "react";
import { authApi } from "@/lib/api/auth-api";
import type { CaptchaResponse } from "@/types/auth";

export const useCaptcha = () => {
  const [captcha, setCaptcha] = useState<CaptchaResponse>({ token: "", question: "" });
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await authApi.captcha();
      setCaptcha(data);
    } catch (error) {
      console.error(error);
      setCaptcha({ token: "", question: "No se pudo cargar el captcha" });
    } finally {
      setLoading(false);
    }
  }, []);

  return { captcha, loading, refresh };
};
