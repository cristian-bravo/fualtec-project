import { ContentPageLayout } from '../components/content-page-layout';

export const ContratoDigitalPage = () => (
  <ContentPageLayout
    eyebrow="Legal y politicas"
    title="Contrato digital"
    subtitle="Informacion sobre acuerdos digitales, firmas electronicas y validacion documental."
    sections={[
      {
        title: 'Validez',
        body: [
          'Los acuerdos digitales tienen la misma validez que los documentos fisicos cuando cumplen la normativa aplicable.',
          'Se registran fecha, hora y evidencia de aceptacion para fines de auditoria.',
        ],
      },
      {
        title: 'Alcance',
        body: [
          'El contrato digital cubre servicios, entregables y condiciones operativas definidas en cada proyecto.',
        ],
      },
    ]}
  />
);
