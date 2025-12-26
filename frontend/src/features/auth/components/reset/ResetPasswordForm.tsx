import { ErrorMessage, Field, Form } from "formik";
import { Tooltip } from "../../../../components/ui/tooltip";

type Props = {
  showPassword: boolean;
  onTogglePassword: () => void;
  isSubmitting?: boolean;
};

export const ResetPasswordForm = ({
  showPassword,
  onTogglePassword,
  isSubmitting,
}: Props) => (
  <Form className="mt-6 flex flex-col gap-4 text-sm">
    <label className="flex flex-col gap-1">
      <span className="font-semibold text-[#0A1F44]">Nueva contrasena</span>
      <div className="relative">
        <Field
          name="password"
          type={showPassword ? "text" : "password"}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-10 text-slate-900 outline-none transition focus:border-[#0A7CC4] focus:ring-2 focus:ring-[#0A7CC4]/20"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Tooltip
            content={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
          >
            <button
              type="button"
              onClick={onTogglePassword}
              aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
              className="rounded p-1 text-slate-400 transition hover:text-slate-600"
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 6.5C7 6.5 2.73 9.61 1 14c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 9.61 17 6.5 12 6.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5a5 5 0 010 10z" />
                  <circle cx="12" cy="14" r="3" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 6.5C7 6.5 2.73 9.61 1 14c.55 1.4 1.37 2.67 2.39 3.78l-1.61 1.61 1.41 1.41 18-18-1.41-1.41-2.46 2.46C15.64 7.02 13.87 6.5 12 6.5zM12 21.5c5 0 9.27-3.11 11-7.5-.7-1.76-1.86-3.29-3.31-4.5l-2.16 2.16a5 5 0 01-6.87 6.87l-2.1 2.1c1.01.53 2.11.87 3.44.87z" />
                </svg>
              )}
            </button>
          </Tooltip>
        </div>
      </div>
      <ErrorMessage name="password" component="span" className="text-xs font-medium text-red-600" />
    </label>

    <label className="flex flex-col gap-1">
      <span className="font-semibold text-[#0A1F44]">Confirmar contrasena</span>
      <Field
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-[#0A7CC4] focus:ring-2 focus:ring-[#0A7CC4]/20"
      />
      <ErrorMessage
        name="confirmPassword"
        component="span"
        className="text-xs font-medium text-red-600"
      />
    </label>

    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full rounded-md bg-[#0A7CC4] px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#096aaa] disabled:opacity-60"
    >
      Actualizar contrasena
    </button>
  </Form>
);
