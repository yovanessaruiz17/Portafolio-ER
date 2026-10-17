import { ServiceItem, ProjectSolution } from '../types';

export const PERSONAL_INFO = {
  fullName: 'Eber Ruiz Zamora',
  shortName: 'Eber Ruiz',
  initials: 'ER',
  profession: 'Ingeniero de Sistemas',
  specialties: ['Excel Avanzado', 'Power Query', 'Power BI', 'SQL'],
  tagline: 'Soluciones prácticas y confiables para tecnología, datos e inventarios',
  experienceHighlight: '20+ años de experiencia en los sectores salud y comercial',
  whatsappRaw: '+57 302 310 5047',
  whatsappNumber: '573023105047',
  emailPrimary: 'ruzae1@gmail.com',
  emailSecondary: 'ruzae1@yahoo.com',
  location: 'Cartagena, Bolívar, Colombia',
  valueProposition:
    'Puedo ayudarte a mantener tus equipos al día, automatizar tus datos en Excel y Power BI, y controlar el inventario de tu droguería o farmacia con procesos claros y confiables.',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'mantenimiento-computadores',
    letter: 'A',
    title: 'Mantenimiento de computadores',
    tagline: 'Equipos rápidos, seguros y listos para operar sin interrupciones',
    description:
      'Diagnóstico, reparación, optimización del rendimiento y seguridad, instalación de software y configuración integral para usuarios individuales y pequeñas empresas.',
    features: [
      'Diagnóstico de hardware y detección de fallas',
      'Optimización de rendimiento y limpieza profunda de sistema',
      'Configuración de seguridad, antivirus y copias de respaldo',
      'Instalación y actualización de software y sistemas operativos',
      'Mantenimiento preventivo periódico para prolongar la vida útil',
    ],
    icon: 'MonitorCheck',
    whatsappMessage:
      'Hola Eber, me interesa consultar tus servicios de mantenimiento y optimización de computadores.',
  },
  {
    id: 'excel-powerbi-datos',
    letter: 'B',
    title: 'Excel avanzado, Power Query y Power BI',
    tagline: 'Automatización de datos y tableros interactivos para toma de decisiones',
    description:
      'Desarrollo de plantillas a la medida, automatización de procesos repetitivos, transformación y limpieza de datos, y dashboards para apoyar decisiones gerenciales y operativas.',
    features: [
      'Modelado de datos y fórmulas complejas avanzadas en Excel',
      'Extracción y transformación automatizada mediante Power Query',
      'Dashboards dinámicos e interactivos en Power BI',
      'Reducción drástica del tiempo invertido en reportes periódicos',
      'Auditoría y corrección de libros de cálculo y bases existentes',
    ],
    icon: 'BarChart3',
    whatsappMessage:
      'Hola Eber, me interesa una consultoría o desarrollo en Excel avanzado, Power Query o Power BI.',
  },
  {
    id: 'inventarios-droguerias',
    letter: 'C',
    title: 'Inventarios de droguerías y farmacias',
    tagline: 'Control estricto de existencias, semaforización de vencimientos y trazabilidad',
    description:
      'Control integral de existencias, monitoreo riguroso de vencimientos, trazabilidad de lotes, análisis de rotación de inventarios y documentación de procesos operativos farmacéuticos.',
    features: [
      'Sistemas de control de existencias y arqueo periódico',
      'Alertas tempranas y semaforización de fechas de vencimiento',
      'Trazabilidad por código, lote, laboratorio y presentación',
      'Análisis de rotación para evitar pérdidas por sobrestock o caducidad',
      'Estandarización y manuales de procesos para el equipo',
    ],
    icon: 'Pill',
    whatsappMessage:
      'Hola Eber, quisiera asesoría sobre el control y optimización de inventarios para droguería o farmacia.',
  },
  {
    id: 'estudios-empresariales',
    letter: 'D',
    title: 'Estudios empresariales',
    tagline: 'Análisis estadístico e informes ejecutivos para identificar áreas críticas',
    description:
      'Análisis estadístico de operaciones, elaboración de informes ejecutivos claros, identificación oportuna de tendencias, cuellos de botella y áreas críticas de mejora.',
    features: [
      'Análisis estadístico descriptivo e inferencial de operaciones',
      'Informes ejecutivos estructurados listos para gerencia',
      'Detección de patrones de compra, venta y estacionalidad',
      'Identificación de áreas críticas de fuga de recursos o tiempo',
      'Recomendaciones fundamentadas en datos reales y verificables',
    ],
    icon: 'FileSpreadsheet',
    whatsappMessage:
      'Hola Eber, me gustaría solicitar un estudio empresarial o análisis estadístico para mi negocio.',
  },
];

export const SKILLS_LIST = [
  {
    name: 'Excel Avanzado',
    category: 'Datos y Productividad',
    detail: 'Fórmulas dinámicas, tablas dinámicas, validaciones, auditoría y modelado funcional.',
    levelBadge: 'Experto',
  },
  {
    name: 'Power Query',
    category: 'Transformación ETL',
    detail: 'Extracción, limpieza, combinación y transformación automatizada de múltiples fuentes.',
    levelBadge: 'Avanzado',
  },
  {
    name: 'Power BI',
    category: 'Business Intelligence',
    detail: 'Modelado relacional DAX, visualizaciones ejecutivas, KPIs y dashboards gerenciales.',
    levelBadge: 'Avanzado',
  },
  {
    name: 'SQL',
    category: 'Bases de Datos',
    detail: 'Consultas, filtros, uniones relacionales (JOINs), agregaciones y extracción estructurada.',
    levelBadge: 'Sólido',
  },
  {
    name: 'Control de Inventarios',
    category: 'Operaciones Especializadas',
    detail: 'Gestión de existencias, control de vencimientos, rotación y procesos farmacéuticos.',
    levelBadge: 'Especialista',
  },
  {
    name: 'Soporte Informático',
    category: 'Infraestructura y Equipos',
    detail: 'Diagnóstico de hardware/software, redes locales, optimización y seguridad de estaciones.',
    levelBadge: '20+ Años',
  },
];

export const EXPERIENCE_SECTORS = [
  {
    title: 'Sector Salud y Farmacéutico',
    focus: 'Droguerías, farmacias y puntos de dispensación',
    description:
      'Amplia experiencia en la gestión rigurosa de medicamentos y suministros médicos. Conocimiento profundo de la sensibilidad de las fechas de caducidad, trazabilidad de lotes, almacenamiento adecuado y normas de auditoría en el control de existencias.',
    bulletPoints: [
      'Implementación de metodologías de semaforización preventiva de vencimientos.',
      'Control de mermas y minimización de pérdidas por medicamentos caducados.',
      'Soporte a sistemas de facturación e inventario en punto de venta.',
      'Acompañamiento en tomas físicas de inventario y conciliación.',
    ],
  },
  {
    title: 'Sector Comercial y Empresarial',
    focus: 'Pequeñas y medianas empresas, áreas administrativas y operativas',
    description:
      'Sólida trayectoria apoyando la continuidad operativa comercial: desde la estabilización de equipos de cómputo y redes locales hasta la transformación de hojas de cálculo desordenadas en sistemas confiables de información y toma de decisiones.',
    bulletPoints: [
      'Automatización de reportes manuales que ahorran horas de trabajo semanal.',
      'Mantenimiento correctivo y preventivo de estaciones de trabajo.',
      'Diseño de plantillas estándar para compras, ventas y presupuestos.',
      'Informes gerenciales para visibilizar rentabilidad y tendencias.',
    ],
  },
];

export const SOLUTIONS_SAMPLES: ProjectSolution[] = [
  {
    id: 'dashboard-ventas',
    title: 'Dashboard Interactivo de Ventas y Rendimiento',
    category: 'Power BI & Excel',
    shortDescription:
      'Tablero de control ejecutivo para monitorear ingresos, márgenes brutos, categorías más rentables y desempeño por período.',
    fullDescription:
      'Modelo de solución diseñado para consolidar registros de ventas de múltiples fuentes o puntos de venta. Permite a los directivos y dueños de negocio filtrar por fechas, vendedores, familias de productos y sedes, obteniendo visibilidad inmediata de la rentabilidad real.',
    challengeSolved:
      'Elimina el cruce manual de hojas de cálculo al cierre de mes y proporciona métricas actualizadas en segundos.',
    tools: ['Power BI', 'Power Query', 'DAX', 'Excel'],
    features: [
      'Filtros interactivos por año, mes, categoría y sucursal',
      'Cálculo automático de margen bruto porcentual y neto',
      'Comparativo intermensual y detección de productos estrella',
      'Alertas visuales ante caídas de ventas por encima del umbral esperado',
    ],
    metrics: [
      { label: 'Tiempo de consolidación', value: '-85%' },
      { label: 'Actualización de datos', value: '1 clic' },
      { label: 'Visibilidad de métricas', value: '100%' },
    ],
  },
  {
    id: 'reporte-inventario-sql',
    title: 'Reporte Automatizado de Inventarios',
    category: 'Power Query & SQL',
    shortDescription:
      'Flujo de extracción y transformación que unifica el catálogo de almacén con las ventas para calcular existencias críticas.',
    fullDescription:
      'Solución conceptual orientada a conectar bases de datos SQL o archivos de existencias con Power Query. Calcula automáticamente el punto de reorden, los días de inventario disponible y resalta los artículos con sobrestock o quiebre inminente.',
    challengeSolved:
      'Evita que el negocio se quede sin existencias de alta rotación o inmovilice capital de trabajo innecesario.',
    tools: ['SQL', 'Power Query', 'Excel Avanzado'],
    features: [
      'Conexión directa o por lotes a bases relacionales SQL',
      'Cálculo de rotación mensual y días de cobertura de stock',
      'Indicadores automáticos de pedido sugerido por producto',
      'Formato condicional inteligente para rápida lectura de bodega',
    ],
    metrics: [
      { label: 'Cálculo de reposición', value: 'Inmediato' },
      { label: 'Prevención de quiebres', value: 'Alta efectividad' },
      { label: 'Errores de digitación', value: 'Reducidos a cero' },
    ],
  },
  {
    id: 'vencimientos-farmacia',
    title: 'Sistema de Control y Análisis de Vencimientos',
    category: 'Especializado en Salud y Farmacias',
    shortDescription:
      'Matriz de semaforización y trazabilidad por lotes para farmacias y droguerías, garantizando alerta anticipada a 90, 60 y 30 días.',
    fullDescription:
      'Estructura de gestión diseñada específicamente bajo las necesidades del sector farmacéutico. Monitorea cada lote de medicamento según su fecha límite de consumo, agrupando los productos en riesgo para activar promociones, devoluciones al laboratorio o canjes a tiempo.',
    challengeSolved:
      'Mitiga las pérdidas financieras por caducidad no detectada y asegura el cumplimiento de estándares sanitarios.',
    tools: ['Excel Avanzado', 'Fórmulas Dinámicas', 'Validación de Datos', 'Control de Procesos'],
    features: [
      'Semaforización visual: Verde (vigente), Amarillo (próximo), Rojo (crítico)',
      'Filtro rápido por laboratorio y principio activo',
      'Cálculo del costo total en riesgo de vencimiento por mes',
      'Planilla estandarizada para conteos físicos y auditorías',
    ],
    metrics: [
      { label: 'Pérdidas por vencimiento', value: 'Mitigación radical' },
      { label: 'Anticipación de alertas', value: '90 - 60 - 30 días' },
      { label: 'Trazabilidad de lotes', value: 'Total' },
    ],
  },
  {
    id: 'automatizacion-informes',
    title: 'Automatización y Consolidación de Informes Mensuales',
    category: 'Productividad y Procesos',
    shortDescription:
      'Mecanismo de unificación de reportes dispersos que reduce horas de copiado y pegado a un solo clic de actualización.',
    fullDescription:
      'Plantilla corporativa estructurada con Power Query que toma carpetas con extractos bancarios, reportes de nómina o ventas diarias y genera un informe ejecutivo consolidado con tablas resumen y gráficos limpios.',
    challengeSolved:
      'Elimina el trabajo repetitivo propenso a errores humanos cada inicio de mes en oficinas y negocios.',
    tools: ['Power Query', 'Excel', 'VBA / Fórmulas Matriciales'],
    features: [
      'Consolidación automática de archivos colocados en una carpeta',
      'Detección y corrección de fechas, textos y formatos numéricos',
      'Generación de resumen ejecutivo con métricas listas para presentar',
      'Documentación paso a paso para que cualquier usuario lo use sin dificultad',
    ],
    metrics: [
      { label: 'Ahorro de tiempo', value: 'Horas a minutos' },
      { label: 'Consistencia de datos', value: '100% verificable' },
      { label: 'Facilidad de uso', value: 'Sin código para el usuario' },
    ],
  },
];

export const VALUE_PROPOSITION_PATHS = {
  client: {
    badge: 'Para Negocios, Farmacias y Profesionales',
    title: 'Necesito un servicio profesional',
    description:
      'Si necesitas resolver problemas informáticos en tus equipos, modernizar tus reportes de Excel o poner bajo estricto control el inventario de tu negocio o droguería.',
    highlights: [
      'Atención personalizada y trato directo con el ingeniero.',
      'Soluciones prácticas adaptadas al tamaño y realidad de tu operación.',
      'Sin costos ocultos ni complicaciones técnicas innecesarias.',
      'Soporte ágil vía WhatsApp y correo electrónico.',
    ],
    ctaText: 'Solicitar cotización o servicio',
    actionId: 'contacto',
  },
  recruiter: {
    badge: 'Para Empresas y Reclutadores',
    title: 'Busco una oportunidad laboral',
    description:
      'Si representas a una organización de los sectores salud, comercial o tecnológico interesada en incorporar experiencia consolidada, honestidad y criterio técnico.',
    highlights: [
      'Más de dos décadas de trayectoria continua y responsable.',
      'Capacidad probada de trabajo autónomo y en equipo.',
      'Criterio sólido para la toma de decisiones basada en datos.',
      'Disponibilidad para evaluación de perfil y entrevistas.',
    ],
    ctaText: 'Conectar por oportunidad laboral',
    actionId: 'contacto',
  },
};
