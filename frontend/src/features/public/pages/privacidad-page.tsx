import { ContentPageLayout } from '../components/content-page-layout';

export const PrivacidadPage = () => (
  <ContentPageLayout
    eyebrow="Legal y politicas"
    title="Politica de privacidad"
    subtitle="Nuestro compromiso con el uso responsable de la informacion."
    sections={[
      {
        title: 'Datos personales',
        body: [
          'Recolectamos informacion necesaria para la gestion de servicios y soporte.',
          'No compartimos datos con terceros sin autorizacion o requerimiento legal.',
        ],
      },
      {
        title: 'Seguridad',
        body: [
          'Aplicamos medidas tecnicas y organizacionales para proteger la informacion.',
          'El acceso esta limitado a personal autorizado y con fines operativos.',
        ],
      },
    ]}
  />
);
