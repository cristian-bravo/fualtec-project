import { ContentPageLayout } from '../components/content-page-layout';

export const TerminosPage = () => (
  <ContentPageLayout
    eyebrow="Legal y políticas"
    title="Términos y condiciones"
    subtitle="Condiciones generales de uso del portal y de los servicios digitales."
    sections={[
      {
        title: 'Uso del portal',
        body: [
          'El acceso al portal implica la aceptación de estas condiciones y el uso responsable de la informacion.',
          'El contenido puede actualizarse sin previo aviso para mantener su vigencia.',
        ],
      },
      {
        title: 'Propiedad intelectual',
        body: [
          'Los informes, documentos y contenidos técnicos son propiedad de Fualtec y sus clientes.',
          'No esta permitida la distribución sin autorización expresa.',
        ],
      },
    ]}
  />
);
