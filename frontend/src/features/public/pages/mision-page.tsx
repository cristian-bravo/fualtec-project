import { ContentPageLayout } from '../components/content-page-layout';

export const MisionPage = () => (
  <ContentPageLayout
    eyebrow="Nuestra empresa"
    title="Nuestra mision"
    subtitle="Proveer servicios de inspeccion y gestion documental que garanticen seguridad y confianza operativa."
    sections={[
      {
        title: 'Proposito',
        body: [
          'Entregar soluciones tecnicas confiables para la industria petrolera con foco en personas, activos y entorno.',
        ],
      },
      {
        title: 'Valor para el cliente',
        body: [
          'Acompaniamos la toma de decisiones con informacion clara, trazable y oportuna.',
        ],
      },
    ]}
  />
);
