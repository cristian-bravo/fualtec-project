import { useEffect, useRef, useState } from 'react';
import type { FormikConfig, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useToast } from '../../../components/toast-context';
import { publicFormsService } from '../services/publicFormsService';

export type SatisfactionFormValues = {
  nombre: string;
  email: string;
  servicio: string;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  p5: number;
  comentarios: string;
  mensajeFinal?: string;
};

const parseNum = () =>
  yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? NaN : Number(originalValue)))
    .min(1)
    .max(5)
    .required('Requerido');

const satisfactionSchema = yup.object({
  nombre: yup.string().required('Ingrese su nombre'),
  email: yup.string().email('Correo invalido').required('Ingrese un correo'),
  servicio: yup.string().required('Seleccione un servicio'),
  p1: parseNum(),
  p2: parseNum(),
  p3: parseNum(),
  p4: parseNum(),
  p5: parseNum(),
  comentarios: yup.string().max(500, 'Máximo 500 caracteres'),
  mensajeFinal: yup.string().max(500, 'Máximo 500 caracteres').optional(),
});

const initialValues: SatisfactionFormValues = {
  nombre: '',
  email: '',
  servicio: '',
  p1: 3,
  p2: 3,
  p3: 3,
  p4: 3,
  p5: 3,
  comentarios: '',
  mensajeFinal: '',
};

export const useSatisfactionForm = () => {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const successTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
        successTimerRef.current = null;
      }
    };
  }, []);

  const onSubmit = async (
    values: SatisfactionFormValues,
    actions: FormikHelpers<SatisfactionFormValues>
  ) => {
    if (loading) {
      actions.setSubmitting(false);
      return;
    }
    setLoading(true);
    setSubmitError(null);
    setSubmitted(false);
    try {
      await publicFormsService.submitSatisfaction({
        nombre: values.nombre,
        email: values.email,
        servicio: values.servicio,
        p1: values.p1,
        p2: values.p2,
        p3: values.p3,
        p4: values.p4,
        p5: values.p5,
        comentarios: values.comentarios || null,
        mensaje_final: values.mensajeFinal || null,
      });

      actions.resetForm();
      setSubmitted(true);
      showToast({
        title: 'Evaluacion enviada',
        description: 'Gracias por compartir tu experiencia.',
        tone: 'success',
      });

      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
      successTimerRef.current = window.setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      const responseErrors = err?.response?.data?.errors;
      if (responseErrors && typeof responseErrors === 'object') {
        // Map server validation errors to field tooltips.
        actions.setErrors({
          nombre: responseErrors.nombre,
          email: responseErrors.email,
          servicio: responseErrors.servicio,
          p1: responseErrors.p1,
          p2: responseErrors.p2,
          p3: responseErrors.p3,
          p4: responseErrors.p4,
          p5: responseErrors.p5,
          comentarios: responseErrors.comentarios,
          mensajeFinal: responseErrors.mensaje_final,
        });
        setSubmitError(null);
      } else {
        const message =
          err?.response?.data?.message ||
          'No se pudo enviar la evaluación.';
        setSubmitError(message);
      }
      showToast({
        title: 'No se pudo enviar',
        description:
          err?.response?.data?.message ||
          'No se pudo enviar la evaluación.',
        tone: 'error',
      });
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  const formikConfig: FormikConfig<SatisfactionFormValues> = {
    initialValues,
    validationSchema: satisfactionSchema,
    onSubmit,
  };

  return {
    formikConfig,
    submitted,
    submitError,
    loading,
  };
};
