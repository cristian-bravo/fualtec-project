import { ContentPageLayout } from '../components/content-page-layout';

export const ContratoDigitalPage = () => (
  <ContentPageLayout
    eyebrow="Legal y políticas"
    title="Contrato digital"
    subtitle="Información sobre acuerdos digitales, firmas electrónicas y validación documental."
    sections={[
      {
        title: 'Validez',
        body: [
          'Los acuerdos digitales tienen la misma validez que los documentos físicos cuando cumplen la normativa aplicable.',
          'Se registran fecha, hora y evidencia de aceptación para fines de auditoría.',
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
