import { ContentPageLayout } from '../components/content-page-layout';

export const CookiesPage = () => (
  <ContentPageLayout
    eyebrow="Legal y políticas"
    title="Uso de cookies"
    subtitle="Explicamos como se usan cookies y tecnologías similares en este portal."
    sections={[
      {
        title: 'Finalidad',
        body: [
          'Utilizamos cookies para mejorar la experiencia y analizar el uso del sitio.',
          'Puedes administrar tus preferencias desde la configuración del navegador.',
        ],
      },
      {
        title: 'Preferencias',
        body: [
          'Al continuar navegando aceptas el uso de cookies esenciales para el funcionamiento del portal.',
        ],
      },
    ]}
  />
);
