import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '../../../components/toast-context';
import { publicFormsService } from '../services/publicFormsService';

const contactSchema = z.object({
  nombre: z.string().min(2, 'Ingrese su nombre'),
  email: z.string().email('Correo invalido'),
  asunto: z.string().min(3, 'Asunto muy corto'),
  mensaje: z.string().min(10, 'Mensaje muy corto'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const useContactForm = () => {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const successTimerRef = useRef<number | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { nombre: '', email: '', asunto: '', mensaje: '' },
    mode: 'onSubmit',
  });

  useEffect(() => {
    setLoading(false);
    setError(null);
    setSubmitted(false);
  }, []);

  useEffect(() => {
    const subscription = form.watch(() => {
      if (submitted) setSubmitted(false);
      if (error) setError(null);
    });
    return () => subscription.unsubscribe();
  }, [form, submitted, error]);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
        successTimerRef.current = null;
      }
    };
  }, []);

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    try {
      await publicFormsService.submitContact(values);
      form.reset();
      setSubmitted(true);
      showToast({
        title: 'Mensaje enviado',
        description: 'Nuestro equipo revisara su solicitud.',
        tone: 'success',
      });
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
      successTimerRef.current = window.setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        Object.values(err?.response?.data?.errors || {})?.[0]?.[0] ||
        'No se pudo enviar el mensaje. Intente nuevamente.';
      setError(message);
      showToast({
        title: 'No se pudo enviar',
        description: message,
        tone: 'error',
      });
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    setSubmitted(false);
    try {
      await form.handleSubmit(onSubmit)(event);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    submitted,
    loading,
    error,
    handleFormSubmit,
  };
};
