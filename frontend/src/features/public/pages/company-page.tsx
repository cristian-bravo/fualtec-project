import { ContentPageLayout } from '../components/content-page-layout';

export const CompanyPage = () => (
  <ContentPageLayout
    eyebrow="Nuestra empresa"
    title="Fualtec en el sector petrolero"
    subtitle="Somos un aliado técnico para operaciones petroleras que demandan seguridad, trazabilidad y cumplimiento."
    sections={[
      {
        title: 'Perfil corporativo',
        body: [
          'Integramos ingeniería, inspección y gestión documental para apoyar decisiones criticas en campo.',
          'Nuestro enfoque combina tecnología, personal certificado y procesos auditables.',
        ],
      },
      {
        title: 'Cobertura operativa',
        body: [
          'Atendemos proyectos en zona Oriente y operaciones de tierra firme con respuesta ágil y equipos propios.',
          'El modelo operativo se adapta al riesgo y al ciclo de vida de los activos.',
        ],
      },
      {
        title: 'Compromiso',
        body: [
          'Priorizamos la seguridad, la calidad técnica y la transparencia en cada entrega.',
        ],
      },
    ]}
  />
);
