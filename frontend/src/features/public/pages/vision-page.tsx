import { ContentPageLayout } from '../components/content-page-layout';
import { PageHero } from '../components/page-hero';
import visionHero from '../../../assets/images/dates/vision.webp';

export const VisionPage = () => (
  <>
    <PageHero
      src={visionHero}
      alt="Visión corporativa"
      eyebrow="Nuestra empresa"
      title="Nuestra visión"
      subtitle="Ser el socio técnico líder en inspección NDT y gestión documental en la region Amazónica."
    />
    <ContentPageLayout
      eyebrow="Nuestra empresa"
      title="Nuestra visión"
      subtitle="Ser el socio técnico líder en inspección NDT y gestión documental en la region Amazónica."
      sections={[
        {
          title: 'Dirección estratégica',
          body: [
            'Impulsamos innovación y estándares de excelencia para operaciones cada vez más seguras.',
            'Nuestro crecimiento se basa en confianza, resultados medibles y relaciones de largo plazo.',
          ],
        },
      ]}
      hideHeader
    />
  </>
);
