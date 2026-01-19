import { ContentPageLayout } from '../components/content-page-layout';
import { PageHero } from '../components/page-hero';
import valoresHero from '../../../assets/images/dates/valores.webp';

export const ValoresPage = () => (
  <>
    <PageHero
      src={valoresHero}
      alt="Valores corporativos"
      eyebrow="Nuestra empresa"
      title="Nuestros valores"
      subtitle="Guiamos cada proyecto con principios que aseguran calidad, seguridad y transparencia."
    />
    <ContentPageLayout
      eyebrow="Nuestra empresa"
      title="Nuestros valores"
      subtitle="Guiamos cada proyecto con principios que aseguran calidad, seguridad y transparencia."
      sections={[
        {
          title: 'Seguridad',
          body: [
            'Protegemos a las personas y a los activos con procesos claros y controlados.',
          ],
        },
        {
          title: 'Calidad técnica',
          body: [
            'Aplicamos buenas practicas y metodologías certificadas para asegurar resultados confiables.',
          ],
        },
        {
          title: 'Integridad',
          body: [
            'Actuamos con ética, trazabilidad y cumplimiento normativo en cada entrega.',
          ],
        },
        {
          title: 'Servicio',
          body: [
            'Escuchamos al cliente, entendemos su contexto y respondemos con agilidad.',
          ],
        },
      ]}
      hideHeader
    />
  </>
);
