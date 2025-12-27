import { ContentPageLayout } from '../components/content-page-layout';

export const ValoresPage = () => (
  <ContentPageLayout
    eyebrow="Nuestra empresa"
    title="Nuestros valores"
    subtitle="Guiamos cada proyecto con principios que aseguran calidad, seguridad y transparencia."
    sections={[
      {
        title: 'Seguridad',
        body: [
          'Protegemos a las personas y a los activos con procesos claros y controlados.',
        ],
      },
      {
        title: 'Calidad tecnica',
        body: [
          'Aplicamos buenas practicas y metodologias certificadas para asegurar resultados confiables.',
        ],
      },
      {
        title: 'Integridad',
        body: [
          'Actuamos con etica, trazabilidad y cumplimiento normativo en cada entrega.',
        ],
      },
      {
        title: 'Servicio',
        body: [
          'Escuchamos al cliente, entendemos su contexto y respondemos con agilidad.',
        ],
      },
    ]}
  />
);
