import { ContentPageLayout } from '../components/content-page-layout';

export const TerminosPage = () => (
  <ContentPageLayout
    eyebrow="Legal y politicas"
    title="Terminos y condiciones"
    subtitle="Condiciones generales de uso del portal y de los servicios digitales."
    sections={[
      {
        title: 'Uso del portal',
        body: [
          'El acceso al portal implica la aceptacion de estas condiciones y el uso responsable de la informacion.',
          'El contenido puede actualizarse sin previo aviso para mantener su vigencia.',
        ],
      },
      {
        title: 'Propiedad intelectual',
        body: [
          'Los informes, documentos y contenidos tecnicos son propiedad de Fualtec y sus clientes.',
          'No esta permitida la distribucion sin autorizacion expresa.',
        ],
      },
    ]}
  />
);
