export const WHATSAPP_PHONE = '593994342217';

export const services = [
  {
    id: 1,
    slug: 'ultrasonido-arreglo-de-fases',
    title: 'Ultrasonido arreglo de fases (Phased Array)',
    short:
      'Evaluación visual y dimensional de tuberías, recipientes y estructuras críticas.',
    full: 
    'Inspección por ultrasonido con arreglo de fases (Phased Array) orientada a la detección, caracterización y dimensionamiento de discontinuidades internas y superficiales en componentes y estructuras. El servicio incluye la planificación del barrido, configuración de equipos avanzados, análisis de señales, interpretación de imágenes sectoriales y comparación con criterios normativos aplicables, permitiendo una evaluación precisa de la integridad del material y la generación de registros técnicos trazables.',
    standards:
      'ASME V, Art. 9 (2021) – Visual Examination',
    whatsappMessage:
      'Hola, me interesa cotizar el servicio de Inspección Visual y Dimensional (Sector Hidrocarburos). ¿Podrían indicarme disponibilidad y requisitos?',
    image: new URL(
      '../../../assets/images/services/fualtec_ndt_amazonia.webp',
      import.meta.url
    ).toString(),
  },

  {
    id: 2,
    slug: 'inspeccion-con-ultrasonido',
    title: 'Inspección con ultrasonido (medición de espesores)',
    short:
      'Método de ensayo no destructivo que determina el espesor de materiales mediante ondas ultrasónicas.',
    full: 
    'Inspección por ultrasonido para medición de espesores enfocada en la evaluación de pérdida de pared, corrosión y variaciones de espesor en tuberías, recipientes, estructuras metálicas y componentes industriales. El proceso contempla el uso de equipos calibrados, verificación de condiciones de superficie, toma sistemática de lecturas y contraste con valores de diseño y criterios técnicos, dejando evidencia documentada para el control de integridad del activo.', 
    standards:
      'ASTM E-797 (2021) – Measuring Thickness by Manual Ultrasonic Pulse-Echo Contact Method',
    whatsappMessage:
      'Hola, me interesa cotizar Ultrasonido (UT) – Medición de Espesores (Sector Hidrocarburos). ¿Podrían enviarme una propuesta?',
    image: new URL(
      '../../../assets/images/services/ultrasonic-thickness-measurement-hidrocarburos.webp',
      import.meta.url
    ).toString(),
  },

  {
    id: 3,
    slug: 'inspeccion-con-partículas-magnética',
    title: 'Inspección con partículas magnética',
    short:
      'Método de ensayo no destructivo para detectar discontinuidades superficiales y subsuperficiales en materiales ferromagnéticos mediante la aplicación de un campo magnético.',
    full: 
    'Inspección mediante partículas magnéticas destinada a la detección de discontinuidades superficiales y subsuperficiales en materiales ferromagnéticos. El servicio comprende la preparación de superficie, aplicación de campos magnéticos adecuados, uso de partículas secas o húmedas, evaluación visual de indicaciones y análisis de resultados conforme a criterios normativos, con el fin de identificar defectos que puedan afectar la seguridad y desempeño del componente.',

    standards:
      'ASME V Art. 7 (2021) / ASTM E 709 (2021) – Magnetic Particle Testing',
    whatsappMessage:
      'Hola, me interesa cotizar Partículas Magnéticas (MT) (Sector Hidrocarburos). ¿Qué información necesitan para iniciar?',
    image: new URL(
      '../../../assets/images/services/magnetic-particle-testing-industrial.webp',
      import.meta.url
    ).toString(),
  },

  {
    id: 4,
    slug: 'inspeccion-por-liquidos-penetrantes',
    title: 'Inspección por líquidos penetrantes',
    short:
      'Método de ensayo no destructivo que permite detectar discontinuidades superficiales mediante la aplicación de un líquido penetrante..',
    full: 
    'Inspección por líquidos penetrantes orientada a la identificación de discontinuidades superficiales abiertas en materiales no porosos. El proceso incluye limpieza previa, aplicación controlada del penetrante, remoción del exceso, revelado y evaluación visual de indicaciones, permitiendo detectar fisuras, poros o defectos superficiales. Los resultados se documentan y comparan con criterios de aceptación para asegurar la integridad del componente inspeccionado.',
    standards:
      'ASME V Art. 6 (2021) / ASTM E165 (2018) – Liquid Penetrant Examination',
    whatsappMessage:
      'Hola, me interesa cotizar Líquidos Penetrantes (PT) (Sector Hidrocarburos). ¿Podemos coordinar una visita técnica?',
    image: new URL(
      '../../../assets/images/services/fualtec_helmet_logo.webp',
      import.meta.url
    ).toString(),
  },

  {
    id: 5,
    slug: 'inspeccion-visual-dimensional',
    title: 'Inspección visual dimensional',
    short:
      'Verificación visual y de medidas para confirmar que un componente cumple con las dimensiones y condiciones especificadas.',
    full:
    'Inspección visual y dimensional orientada a verificar el cumplimiento de medidas, geometría, alineación y estado superficial de componentes, equipos y estructuras. El servicio contempla la evaluación directa en campo, el uso de instrumentos de medición calibrados (cintas métricas, calibradores, micrómetros, reglas y galgas), y la comparación de resultados con planos, especificaciones técnicas y tolerancias establecidas. Asimismo, se identifican deformaciones, desgastes, daños visibles, desviaciones dimensionales y condiciones fuera de norma que puedan comprometer la integridad, seguridad o funcionalidad del activo, dejando registro técnico y evidencias documentales del proceso de inspección.',
    standards:
      'ASME V, Art. 9 (2021) – Visual Examination',
    whatsappMessage:
      'Hola, me interesa cotizar Inspección Visual y Dimensional (Sector Industrial). ¿Qué tiempos de ejecución manejan?',
    image: new URL(
      '../../../assets/images/services/inspection-visual-dimensional-industrial.webp',
      import.meta.url
    ).toString(),
  },
];
