import { ContentPageLayout } from '../components/content-page-layout';
import { PageHero } from '../components/page-hero';
import quienesSomosHero from '../../../assets/images/dates/quienes-somos.webp';

export const QuienesSomosPage = () => (
  <>
    <PageHero
      src={quienesSomosHero}
      alt="Equipo de inspeccion NDT"
      eyebrow="Nuestra empresa"
      title="Quiénes somos"
      subtitle="Equipo multidisciplinario con enfoque en inspeccion NDT, integridad de activos y control documental."
    />
    <ContentPageLayout
      eyebrow="Nuestra empresa"
      title="Quiénes somos"
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
      hideHeader
    />
  </>
);
