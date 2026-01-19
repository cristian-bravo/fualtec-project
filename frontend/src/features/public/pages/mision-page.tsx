import { ContentPageLayout } from '../components/content-page-layout';
import { PageHero } from '../components/page-hero';
import misionHero from '../../../assets/images/dates/mision.webp';

export const MisionPage = () => (
  <>
    <PageHero
      src={misionHero}
      alt="misión corporativa"
      eyebrow="Nuestra empresa"
      title="Nuestra misión"
      subtitle="Proveer servicios de inspección y gestión documental que garanticen seguridad y confianza operativa."
    />
    <ContentPageLayout
      eyebrow="Nuestra empresa"
      title="Nuestra misión"
      subtitle="Proveer servicios de inspección y gestión documental que garanticen seguridad y confianza operativa."
      sections={[
        {
          title: 'Propósito',
          body: [
            'Entregar soluciones técnicas confiables para la industria petrolera con foco en personas, activos y entorno.',
          ],
        },
        {
          title: 'Valor para el cliente',
          body: [
            'Acompañamos la toma de decisiones con información clara, trazable y oportuna.',
          ],
        },
      ]}
      hideHeader
    />
  </>
);
