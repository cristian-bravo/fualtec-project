import { ContentPageLayout } from '../components/content-page-layout';
import { PageHero } from '../components/page-hero';
import misionHero from '../../../assets/images/dates/mision.webp';

export const MisionPage = () => (
  <>
    <PageHero
      src={misionHero}
      alt="Mision corporativa"
      eyebrow="Nuestra empresa"
      title="Nuestra mision"
      subtitle="Proveer servicios de inspeccion y gestion documental que garanticen seguridad y confianza operativa."
    />
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
            'Acompanamos la toma de decisiones con informacion clara, trazable y oportuna.',
          ],
        },
      ]}
      hideHeader
    />
  </>
);
