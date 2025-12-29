import { ContentPageLayout } from '../components/content-page-layout';

export const VisionPage = () => (
  <ContentPageLayout
    eyebrow="Nuestra empresa"
    title="Nuestra visión"
    subtitle="Ser el socio tecnico lider en inspeccion NDT y gestion documental en la region Amazonica."
    sections={[
      {
        title: 'Direccion estrategica',
        body: [
          'Impulsamos innovacion y estandares de excelencia para operaciones cada vez mas seguras.',
          'Nuestro crecimiento se basa en confianza, resultados medibles y relaciones de largo plazo.',
        ],
      },
    ]}
  />
);
