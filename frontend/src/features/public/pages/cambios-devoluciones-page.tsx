import { ContentPageLayout } from '../components/content-page-layout';

export const CambiosDevolucionesPage = () => (
  <ContentPageLayout
    eyebrow="Legal y políticas"
    title="Cambios y devoluciones"
    subtitle="Lineamientos para solicitudes relacionadas con servicios contratados."
    sections={[
      {
        title: 'Solicitud de cambios',
        body: [
          'Las solicitudes se gestionan por el canal oficial de soporte y se validan según el contrato.',
          'El alcance y los tiempos dependen del tipo de servicio y etapa del proyecto.',
        ],
      },
      {
        title: 'Devoluciones',
        body: [
          'Las devoluciones aplican según las condiciones pactadas y la normativa vigente.',
        ],
      },
    ]}
  />
);
