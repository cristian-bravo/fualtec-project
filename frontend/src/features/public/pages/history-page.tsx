import { ContentPageLayout } from '../components/content-page-layout';
import { PageHero } from '../components/page-hero';
import historyHero from '../../../assets/images/dates/nuestra-historia.webp';

export const HistoryPage = () => (
  <>
    <PageHero
      src={historyHero}
      alt="Nuestra historia corporativa"
      eyebrow="Nuestra empresa"
      title="Nuestra historia"
      subtitle="Mas de dos decadas acompanando operaciones petroleras con soluciones tecnicas confiables."
    />
    <ContentPageLayout
      eyebrow="Nuestra empresa"
      title="Nuestra historia"
      subtitle="Mas de dos decadas acompanando operaciones petroleras con soluciones tecnicas confiables."
      sections={[
        {
          title: 'Trayectoria',
          body: [
            'Desde 2001, Fualtec ha apoyado a operadores del sector con inspeccion, integridad y gestion documental.',
            'La experiencia acumulada nos permite responder con precision en proyectos de alta criticidad.',
          ],
        },
        {
          title: 'Evolucion',
          body: [
            'Nuestro equipo integra especialistas en HSE, NDT y control de calidad para cubrir todo el ciclo del activo.',
            'Cada entrega refleja un compromiso constante con seguridad y cumplimiento normativo.',
          ],
        },
      ]}
      hideHeader
    />
  </>
);
