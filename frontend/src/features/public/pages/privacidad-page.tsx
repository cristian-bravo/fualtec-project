import { ContentPageLayout } from '../components/content-page-layout';

export const PrivacidadPage = () => (
  <ContentPageLayout
    eyebrow="Legal y políticas"
    title="Política de privacidad"
    subtitle="Nuestro compromiso con el uso responsable de la informacion."
    sections={[
      {
        title: 'Datos personales',
        body: [
          'Recolectamos informacion necesaria para la gestión de servicios y soporte.',
          'No compartimos datos con terceros sin autorización o requerimiento legal.',
        ],
      },
      {
        title: 'Seguridad',
        body: [
          'Aplicamos medidas técnicas y organizacionales para proteger la informacion.',
          'El acceso esta limitado a personal autorizado y con fines operativos.',
        ],
      },
    ]}
  />
);
