import { ContentPageLayout } from '../components/content-page-layout';
import { PageHero } from '../components/page-hero';
import visionHero from '../../../assets/images/dates/vision.webp';

export const VisionPage = () => (
  <>
    <PageHero
      src={visionHero}
      alt="Vision corporativa"
      eyebrow="Nuestra empresa"
      title="Nuestra vision"
      subtitle="Ser el socio tecnico lider en inspeccion NDT y gestion documental en la region Amazonica."
    />
    <ContentPageLayout
      eyebrow="Nuestra empresa"
      title="Nuestra vision"
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
      hideHeader
    />
  </>
);
