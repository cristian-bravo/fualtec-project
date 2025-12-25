import { Field, ErrorMessage } from "formik";
import { clsx } from "clsx";

type Props = {
  question: string;
  answerName: string;
  onReload: () => void;
  isLoading?: boolean;
  containerClassName?: string;
  headerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
};

export const CaptchaCard = ({
  question,
  answerName,
  onReload,
  isLoading,
  containerClassName,
  headerClassName,
  labelClassName,
  inputClassName,
  errorClassName,
}: Props) => (
  <div className={clsx("w-full", containerClassName)}>

    <div className={clsx("flex items-center gap-3 text-sm", headerClassName)}>
      <span className={clsx("font-semibold text-slate-700", labelClassName)}>{question}</span>
      <button
        type="button"
        onClick={onReload}
        disabled={isLoading}
        className="ml-auto rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 transition hover:bg-slate-100 disabled:opacity-60"
      >
        Recargar
      </button>
    </div>
    <Field
      name={answerName}
      placeholder="Respuesta"
      className={clsx(
        "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        inputClassName
      )}
    />
    <ErrorMessage
      name={answerName}
      component="span"
      className={clsx("mt-2 block text-xs text-red-300", errorClassName)}
    />

  </div>
);
