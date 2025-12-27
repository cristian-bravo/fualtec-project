import { ContentPageLayout } from '../components/content-page-layout';

export const QuienesSomosPage = () => (
  <ContentPageLayout
    eyebrow="Nuestra empresa"
    title="Quienes somos"
    subtitle="Equipo multidisciplinario con enfoque en inspeccion NDT, integridad de activos y control documental."
    sections={[
      {
        title: 'Nuestro equipo',
        body: [
          'Contamos con especialistas certificados en ensayos no destructivos, integridad y HSE.',
          'La experiencia en campo nos permite responder con precision y criterio tecnico.',
        ],
      },
      {
        title: 'Nuestro enfoque',
        body: [
          'Combinamos analisis tecnico, cumplimiento normativo y una comunicacion clara con el cliente.',
          'Cada proyecto se documenta de forma trazable para auditorias internas y externas.',
        ],
      },
    ]}
  />
);
