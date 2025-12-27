import { ContentPageLayout } from '../components/content-page-layout';

export const CompanyPage = () => (
  <ContentPageLayout
    eyebrow="Nuestra empresa"
    title="Fualtec en el sector energetico"
    subtitle="Somos un aliado tecnico para operaciones petroleras que demandan seguridad, trazabilidad y cumplimiento."
    sections={[
      {
        title: 'Perfil corporativo',
        body: [
          'Integramos ingenieria, inspeccion y gestion documental para apoyar decisiones criticas en campo.',
          'Nuestro enfoque combina tecnologia, personal certificado y procesos auditables.',
        ],
      },
      {
        title: 'Cobertura operativa',
        body: [
          'Atendemos proyectos en zona Oriente y operaciones de tierra firme con respuesta agil y equipos propios.',
          'El modelo operativo se adapta al riesgo y al ciclo de vida de los activos.',
        ],
      },
      {
        title: 'Compromiso',
        body: [
          'Priorizamos la seguridad, la calidad tecnica y la transparencia en cada entrega.',
        ],
      },
    ]}
  />
);
