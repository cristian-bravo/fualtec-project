import { ContentPageLayout } from '../components/content-page-layout';

export const CambiosDevolucionesPage = () => (
  <ContentPageLayout
    eyebrow="Legal y politicas"
    title="Cambios y devoluciones"
    subtitle="Lineamientos para solicitudes relacionadas con servicios contratados."
    sections={[
      {
        title: 'Solicitud de cambios',
        body: [
          'Las solicitudes se gestionan por el canal oficial de soporte y se validan segun el contrato.',
          'El alcance y los tiempos dependen del tipo de servicio y etapa del proyecto.',
        ],
      },
      {
        title: 'Devoluciones',
        body: [
          'Las devoluciones aplican segun las condiciones pactadas y la normativa vigente.',
        ],
      },
    ]}
  />
);
