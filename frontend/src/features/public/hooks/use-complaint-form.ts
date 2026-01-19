import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormikConfig, FormikHelpers, FormikTouched } from 'formik';
import * as yup from 'yup';
import { useToast } from '../../../components/toast-context';
import { publicFormsService } from '../services/publicFormsService';

export type TipoQueja = 'Servicio' | 'Administrativo' | 'Personal' | 'Instalaciones' | 'Otro';
export type TipoInconformidad = 'Queja' | 'Apelacion';

export type ComplaintFormValues = {
  empresa: string;
  nombre: string;
  cargo: string;
  telefono: string;
  email: string;
  direccion: string;
  fecha: string;
  tipoQueja: TipoQueja | '';
  inconformidad: TipoInconformidad | '';
  anexaDocumento: 'SI' | 'NO';
  documento?: File | null;
  relato: string;
};

const allowedDocumentTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
];

const allowedDocumentExtensions = ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'];

const isAllowedDocument = (file: File) => {
  if (file.type && allowedDocumentTypes.includes(file.type)) {
    return true;
  }
  const extension = file.name.split('.').pop()?.toLowerCase();
  return extension ? allowedDocumentExtensions.includes(extension) : false;
};

const complaintSchema = yup.object({
  empresa: yup.string().required('Ingrese la empresa.').max(255, 'Máximo 255 caracteres.'),
  nombre: yup.string().required('Ingrese el nombre.').max(255, 'Máximo 255 caracteres.'),
  cargo: yup.string().required('Ingrese el cargo.').max(255, 'Máximo 255 caracteres.'),
  telefono: yup.string().required('Ingrese el telefono.').max(60, 'Máximo 60 caracteres.'),
  email: yup
    .string()
    .email('Correo invalido.')
    .required('Ingrese el correo.')
    .max(255, 'Máximo 255 caracteres.'),
  direccion: yup.string().required('Ingrese la direccion.').max(255, 'Máximo 255 caracteres.'),
  fecha: yup.string().required('Ingrese la fecha.'),
  tipoQueja: yup
    .mixed<TipoQueja>()
    .oneOf(['Servicio', 'Administrativo', 'Personal', 'Instalaciones', 'Otro'])
    .required('Seleccione el tipo de queja.'),
  inconformidad: yup
    .mixed<TipoInconformidad>()
    .oneOf(['Queja', 'Apelacion'])
    .required('Seleccione el tipo de inconformidad.'),
  anexaDocumento: yup
    .mixed<'SI' | 'NO'>()
    .oneOf(['SI', 'NO'])
    .required('Seleccione si adjunta documento.'),
  documento: yup
    .mixed<File>()
    .nullable()
    .when('anexaDocumento', {
      is: 'SI',
      then: (schema) => schema.required('Adjunte el documento.'),
    })
    .test('doc-size', 'El documento no debe superar 10 MB.', (value) => {
      if (!value) return true;
      return value.size <= 10 * 1024 * 1024;
    })
    .test('doc-type', 'Formato de documento no permitido.', (value) => {
      if (!value) return true;
      return isAllowedDocument(value);
    }),
  relato: yup
    .string()
    .min(10, 'El relato debe tener al menos 10 caracteres.')
    .max(2000, 'El relato no debe superar 2000 caracteres.')
    .required('Ingrese el relato.'),
});

const buildFormData = (values: ComplaintFormValues) => {
  const formData = new FormData();
  formData.append('empresa', values.empresa);
  formData.append('nombre', values.nombre);
  formData.append('cargo', values.cargo);
  formData.append('telefono', values.telefono);
  formData.append('email', values.email);
  formData.append('direccion', values.direccion);
  formData.append('fecha', values.fecha);
  formData.append('tipo_queja', values.tipoQueja);
  formData.append('tipo_inconformidad', values.inconformidad);
  formData.append('anexa_documento', values.anexaDocumento);
  formData.append('relato', values.relato);

  if (values.anexaDocumento === 'SI' && values.documento) {
    formData.append('documento', values.documento);
  }

  return formData;
};

export const useComplaintForm = () => {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const successTimerRef = useRef<number | null>(null);
  const submittingRef = useRef(false);

  const initialValues = useMemo<ComplaintFormValues>(
    () => ({
      empresa: '',
      nombre: '',
      cargo: '',
      telefono: '',
      email: '',
      direccion: '',
      fecha: new Date().toISOString().slice(0, 10),
      tipoQueja: '',
      inconformidad: '',
      anexaDocumento: 'NO',
      documento: null,
      relato: '',
    }),
    []
  );

  useEffect(() => {
    setLoading(false);
    setSubmitError(null);
    setSubmitted(false);
    return () => {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
        successTimerRef.current = null;
      }
    };
  }, []);

  const onSubmit = async (
    values: ComplaintFormValues,
    actions: FormikHelpers<ComplaintFormValues>
  ) => {
    if (loading || submittingRef.current) {
      actions.setSubmitting(false);
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setSubmitError(null);
    setSubmitted(false);

    try {
      const payload = buildFormData(values);
      await publicFormsService.submitComplaint(payload);
      setSubmitted(true);
      actions.resetForm();
      showToast({
        title: 'Registro enviado',
        description: 'Hemos recibido tu solicitud y daremos seguimiento.',
        tone: 'success',
      });
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
      successTimerRef.current = window.setTimeout(() => setSubmitted(false), 4500);
    } catch (err: any) {
      const responseErrors = err?.response?.data?.errors;
      if (responseErrors && typeof responseErrors === 'object') {
        // Surface backend validation directly as field tooltips.
        const mappedErrors = {
          empresa: responseErrors.empresa,
          nombre: responseErrors.nombre,
          cargo: responseErrors.cargo,
          telefono: responseErrors.telefono,
          email: responseErrors.email,
          direccion: responseErrors.direccion,
          fecha: responseErrors.fecha,
          tipoQueja: responseErrors.tipo_queja,
          inconformidad: responseErrors.tipo_inconformidad,
          anexaDocumento: responseErrors.anexa_documento,
          documento: responseErrors.documento,
          relato: responseErrors.relato,
        } as Partial<Record<keyof ComplaintFormValues, string>>;

        actions.setErrors(mappedErrors);
        const touched = Object.keys(mappedErrors).reduce((acc, key) => {
          if (mappedErrors[key as keyof ComplaintFormValues]) {
            acc[key as keyof ComplaintFormValues] = true;
          }
          return acc;
        }, {} as FormikTouched<ComplaintFormValues>);
        actions.setTouched(touched, false);
        setSubmitError(null);
      } else {
        const message =
          err?.response?.data?.message || 'No se pudo enviar la queja o apelacion.';
        setSubmitError(message);
      }
      showToast({
        title: 'No se pudo enviar',
        description:
          err?.response?.data?.message || 'No se pudo enviar la queja o apelacion.',
        tone: 'error',
      });
    } finally {
      setLoading(false);
      submittingRef.current = false;
      actions.setSubmitting(false);
    }
  };

  const formikConfig: FormikConfig<ComplaintFormValues> = {
    initialValues,
    validationSchema: complaintSchema,
    onSubmit,
  };

  return {
    formikConfig,
    submitted,
    submitError,
    loading,
  };
};
