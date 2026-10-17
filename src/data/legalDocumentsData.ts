export interface LegalDocument {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: 'Protección de Datos' | 'Términos y Servicios' | 'Gestión y Derechos';
  summary: string;
  lastUpdated: string;
  pendingItems?: string[];
  content: {
    sectionTitle: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
}

export const LEGAL_PENDING_ITEMS = [
  {
    field: 'Cédula de Ciudadanía del Responsable',
    placeholder: '[COMPLETAR ANTES DE PUBLICAR: Cédula de Ciudadanía No. XXXXX de XXXXX]',
    description: 'Número de documento de identidad de Eber Ruiz Zamora en calidad de persona natural responsable en Colombia.',
    urgency: 'Alta - Requerido antes del despliegue público en producción',
  },
  {
    field: 'Dirección física de correspondencia (Opcional)',
    placeholder: '[COMPLETAR ANTES DE PUBLICAR: Dirección física si decide fijar una en Cartagena, Bolívar]',
    description: 'Dirección postal física si el responsable decide fijar una sede de correspondencia presencial en Cartagena, Bolívar.',
    urgency: 'Baja - Los canales digitales (correo y WhatsApp) ya están plenamente operativos',
  },
  {
    field: 'Fecha de Entrada en Vigencia Definitiva',
    placeholder: '[COMPLETAR ANTES DE PUBLICAR: Fecha oficial de publicación]',
    description: 'Fecha formal a partir de la cual rigen los términos y políticas en el dominio web final.',
    urgency: 'Media - Al momento de activar el dominio personalizado',
  },
];

export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 'politica-tratamiento-datos',
    slug: 'politica-tratamiento-datos',
    title: 'Política de Tratamiento de Datos Personales',
    shortTitle: 'Política de Tratamiento de Datos',
    category: 'Protección de Datos',
    summary:
      'Directrices y principios aplicables a la recolección, uso y protección de datos personales de usuarios y clientes por parte de Eber Ruiz Zamora, persona natural en Cartagena, Bolívar, Colombia.',
    lastUpdated: 'Octubre 2026 (Borrador técnico conforme a Ley 1581 de 2012)',
    pendingItems: [
      'Cédula de Ciudadanía No. [COMPLETAR ANTES DE PUBLICAR: Cédula de Ciudadanía No. XXXXX de XXXXX]',
      'Fecha formal de entrada en vigencia [COMPLETAR ANTES DE PUBLICAR]',
    ],
    content: [
      {
        sectionTitle: '1. Identificación del Responsable del Tratamiento',
        paragraphs: [
          'El presente documento contiene la Política de Tratamiento de Datos Personales adoptada por Eber Ruiz Zamora, persona natural de nacionalidad colombiana, Ingeniero de Sistemas, identificado con [COMPLETAR ANTES DE PUBLICAR: Cédula de Ciudadanía No. XXXXX de XXXXX], con domicilio principal y sede de actividades independientes en la ciudad de Cartagena, Bolívar, Colombia, quien para los efectos de la Ley 1581 de 2012 y el Decreto 1074 de 2015 actúa en calidad de Responsable del Tratamiento de la información.',
          'Canales de contacto oficial para asuntos de datos personales:',
        ],
        bullets: [
          'Correo electrónico principal: ruzae1@gmail.com',
          'Correo electrónico alternativo: ruzae1@yahoo.com',
          'Canal de mensajería y WhatsApp: +57 302 310 5047',
          'Sitio web: Portafolio profesional de Eber Ruiz Zamora',
        ],
      },
      {
        sectionTitle: '2. Marco Legal Aplicable',
        paragraphs: [
          'Esta Política se fundamenta en el artículo 15 de la Constitución Política de Colombia, la Ley Estatutaria 1581 de 2012, el Decreto Reglamentario 1377 de 2013 (compilado en el Decreto Único Reglamentario 1074 de 2015), la Circular Externa 002 de 2015 de la Superintendencia de Industria y Comercio (SIC) y demás normas que las adicionen, modifiquen o complementen.',
        ],
      },
      {
        sectionTitle: '3. Transparencia sobre el Sitio Web y Datos Recolectados',
        paragraphs: [
          'Se informa a los visitantes que este sitio web es una aplicación frontal estática informativa que NO posee una base de datos centralizada propia en servidores backend para registrar o almacenar usuarios automáticamente por el solo hecho de navegar.',
          'Las únicas categorías de datos personales que son tratadas corresponden a las que el propio Titular decide suministrar voluntariamente al formular una consulta técnica, solicitud de cotización u oportunidad laboral:',
        ],
        bullets: [
          'Datos de identificación y contacto: Nombre completo y dirección de correo electrónico.',
          'Datos de contexto de la consulta: Motivo de contacto seleccionado y texto libre del mensaje redactado.',
          'Datos de comunicación voluntaria: Número de teléfono o cuenta de mensajería cuando el usuario decide continuar por WhatsApp o responder vía correo.',
          'Aclaración expresa: No se solicitan, ni se tratan a través del sitio web datos sensibles (datos de salud íntimos, origen racial, convicciones religiosas o políticas) ni datos de menores de edad.',
        ],
      },
      {
        sectionTitle: '4. Finalidades del Tratamiento',
        paragraphs: [
          'Los datos personales suministrados voluntariamente serán tratados exclusivamente para los siguientes propósitos legítimos:',
        ],
        bullets: [
          'Dar trámite, respuesta y seguimiento a las consultas profesionales, solicitudes de servicios de mantenimiento, análisis de datos o control de inventarios remitidas por el Titular.',
          'Evaluar propuestas y mantener comunicaciones sobre oportunidades de vinculación o contratación laboral presentadas por empresas u organizaciones.',
          'Elaborar y remitir propuestas técnico-económicas personalizadas a solicitud del interesado.',
          'Cumplir con deberes legales, fiscales y contables en caso de formalizarse un contrato o relación de prestación de servicios.',
          'Remitir comunicaciones profesionales o boletines informativos únicamente cuando el Titular haya otorgado su consentimiento previo, expreso y diferenciado mediante la casilla opcional habilitada.',
        ],
      },
      {
        sectionTitle: '5. Derechos de los Titulares (Habeas Data)',
        paragraphs: [
          'De conformidad con el artículo 8 de la Ley 1581 de 2012, el Titular de los datos personales tiene los siguientes derechos irrenunciables:',
        ],
        bullets: [
          'Conocer, actualizar y rectificar sus datos personales frente al Responsable.',
          'Solicitar prueba de la autorización otorgada para el tratamiento, salvo cuando la ley la exceptúe.',
          'Ser informado por el Responsable, previa solicitud, respecto del uso que se le ha dado a sus datos personales.',
          'Presentar ante la Superintendencia de Industria y Comercio (SIC) quejas por infracciones a lo dispuesto en la normatividad de protección de datos.',
          'Revocar la autorización y/o solicitar la supresión del dato cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.',
          'Acceder en forma gratuita a sus datos personales que hayan sido objeto de tratamiento.',
        ],
      },
      {
        sectionTitle: '6. Criterios de Conservación de la Información',
        paragraphs: [
          'Los datos suministrados mediante comunicaciones directas se conservarán únicamente durante el tiempo estrictamente necesario para atender la consulta formulada o mientras subsista una relación contractual o profesional.',
          'Importante: La solicitud de supresión de datos no procederá en los casos en que el Titular tenga un deber legal o contractual de permanecer en los registros del Responsable (por ejemplo, soportes de facturación o constancias tributarias exigidas por la normatividad colombiana).',
        ],
      },
      {
        sectionTitle: '7. Seguridad y Confidencialidad',
        paragraphs: [
          'Eber Ruiz Zamora aplica medidas técnicas, humanas y organizativas razonables para proteger la información contra adulteración, pérdida, consulta o acceso no autorizado. Dado que ningún sistema informático o canal de internet es absolutamente inexpugnable, no se promete una seguridad infalible ni absoluta, pero se asume un compromiso estricto de confidencialidad y diligencia profesional.',
        ],
      },
      {
        sectionTitle: '8. Procedimiento para Ejercer los Derechos',
        paragraphs: [
          'Para radicar consultas o reclamos de Habeas Data, el Titular puede escribir a ruzae1@gmail.com con copia a ruzae1@yahoo.com o al WhatsApp +57 302 310 5047, indicando su nombre, identificación, hechos de la solicitud y canal de respuesta. Los plazos de respuesta se ajustarán estrictamente a los 10 días hábiles para consultas y 15 días hábiles para reclamos estipulados en los artículos 14 y 15 de la Ley 1581 de 2012.',
        ],
      },
      {
        sectionTitle: '9. Vigencia y Modificaciones',
        paragraphs: [
          'Esta Política rige a partir de [COMPLETAR ANTES DE PUBLICAR: Fecha formal de entrada en vigencia]. Cualquier cambio sustancial será informado a través del sitio web antes de su implementación.',
        ],
      },
    ],
  },
  {
    id: 'aviso-privacidad',
    slug: 'aviso-privacidad',
    title: 'Aviso de Privacidad',
    shortTitle: 'Aviso de Privacidad',
    category: 'Protección de Datos',
    summary:
      'Documento sintético que pone en conocimiento del Titular la existencia de la Política de Tratamiento y la forma de acceder a ella antes de recolectar sus datos.',
    lastUpdated: 'Octubre 2026',
    pendingItems: ['Cédula de Ciudadanía No. [COMPLETAR ANTES DE PUBLICAR: Cédula de Ciudadanía No. XXXXX de XXXXX]'],
    content: [
      {
        sectionTitle: 'Información Básica sobre Protección de Datos',
        paragraphs: [
          'En cumplimiento de la Ley Estatutaria 1581 de 2012 y el Decreto 1074 de 2015, se informa al usuario la siguiente información sobre el tratamiento de sus datos personales:',
        ],
        bullets: [
          'Responsable del Tratamiento: Eber Ruiz Zamora, Ingeniero de Sistemas, persona natural independiente domiciliada en Cartagena, Bolívar, Colombia. C.C. [COMPLETAR ANTES DE PUBLICAR: Cédula de Ciudadanía No. XXXXX de XXXXX].',
          'Finalidad principal: Gestionar las comunicaciones, responder requerimientos de asesoría profesional y atender oportunidades laborales.',
          'Legitimación: Consentimiento previo, expreso e informado otorgado por el Titular al comunicarse de forma voluntaria.',
          'Destinatarios: Los datos no se ceden, comercializan ni transfieren a terceros sin autorización previa, salvo requerimiento de autoridad judicial competente.',
          'Derechos: Acceso, rectificación, actualización, supresión y revocatoria de la autorización conforme a la normatividad colombiana.',
          'Canal de atención: Correo ruzae1@gmail.com, ruzae1@yahoo.com y WhatsApp +57 302 310 5047.',
          'Acceso al texto completo: Puede consultar la versión íntegra en la Política de Tratamiento de Datos Personales disponible en este sitio web.',
        ],
      },
    ],
  },
  {
    id: 'autorizacion-datos',
    slug: 'autorizacion-datos',
    title: 'Modelo de Autorización para el Tratamiento de Datos Personales',
    shortTitle: 'Modelo de Autorización',
    category: 'Protección de Datos',
    summary:
      'Texto y condiciones informadas bajo las cuales el Titular consiente el uso de sus datos personales.',
    lastUpdated: 'Octubre 2026',
    content: [
      {
        sectionTitle: 'Alcance y Naturaleza de la Autorización',
        paragraphs: [
          'Al marcar la casilla correspondiente en el formulario de contacto y proceder a remitir su mensaje a través de correo electrónico o WhatsApp, el Titular declara haber leído previamente y autoriza de manera voluntaria, previa, explícita e informada a Eber Ruiz Zamora para que recolecte y trate los datos de contacto suministrados.',
          'Finalidades autorizadas:',
        ],
        bullets: [
          'Finalidad principal (Obligatoria para responder): Resolver la consulta formulada, agendar reuniones técnicas, elaborar cotizaciones solicitadas o evaluar procesos de selección laboral.',
          'Finalidad comercial secundaria (Opcional e independiente): Recepción de novedades sobre servicios de automatización de datos, soporte informático o plantillas especializadas. Esta casilla es independiente y no condiciona la respuesta a la consulta.',
        ],
      },
      {
        sectionTitle: 'Aviso sobre Evidencia Técnica en el Navegador',
        paragraphs: [
          'De conformidad con la honestidad técnica exigida por el principio de transparencia:',
          'Una casilla marcada en la interfaz del navegador del visitante no constituye por sí misma un registro informático inalterable en un servidor central mientras no se transmita la comunicación. Por ello, la evidencia de la autorización queda perfeccionada con el envío voluntario del mensaje redactado desde la cuenta de correo o número telefónico del propio Titular, donde constará su consentimiento expreso.',
        ],
      },
    ],
  },
  {
    id: 'cookies',
    slug: 'cookies',
    title: 'Política de Cookies y Tecnologías Similares',
    shortTitle: 'Política de Cookies',
    category: 'Términos y Servicios',
    summary:
      'Descripción técnica de las tecnologías utilizadas en el sitio. No se emplean cookies de rastreo publicitario ni analítica invasiva.',
    lastUpdated: 'Octubre 2026',
    content: [
      {
        sectionTitle: '1. ¿Qué tecnologías utiliza este sitio web?',
        paragraphs: [
          'Se declara de manera verificable que este sitio web NO utiliza cookies publicitarias, píxeles de remarketing (como Meta Pixel o Google Ads) ni herramientas de rastreo conductual de terceros.',
          'La aplicación ha sido desarrollada como una página web de una sola página (SPA) que no instala cookies en el navegador del usuario para fines de perfilamiento o monetización.',
        ],
      },
      {
        sectionTitle: '2. Recursos de Terceros y Tipografías',
        paragraphs: [
          'Para garantizar una lectura tipográfica óptima y un diseño accesible, el sitio vincula fuentes de texto servidas por Google Fonts (Plus Jakarta Sans y Space Grotesk). Estas peticiones descargan archivos de fuentes estándar sin almacenar cookies de seguimiento ni rastreo de identidad.',
        ],
      },
      {
        sectionTitle: '3. Enlaces a Servicios Externos',
        paragraphs: [
          'Cuando el usuario pulsa un enlace hacia WhatsApp (wa.me) o hacia su propio gestor de correo (mailto), pasa a interactuar con plataformas externas reguladas por las políticas de privacidad y cookies de sus respectivos proveedores (Meta Platforms y el proveedor del correo del usuario).',
        ],
      },
      {
        sectionTitle: '4. ¿Por qué no mostramos un banner invasivo de cookies?',
        paragraphs: [
          'Dado que este sitio no instala cookies opcionales sujetas a consentimiento previo ni realiza perfilamiento con fines comerciales o publicitarios, no es legalmente exigible ni ético abrumar al visitante con banners artificiales o selectores engañosos de cookies que no existen.',
        ],
      },
    ],
  },
  {
    id: 'terminos-condiciones',
    slug: 'terminos-condiciones',
    title: 'Términos y Condiciones de Uso del Sitio Web',
    shortTitle: 'Términos y Condiciones',
    category: 'Términos y Servicios',
    summary:
      'Reglas de navegación, propiedad intelectual, limitación de responsabilidad y condiciones de uso del portafolio.',
    lastUpdated: 'Octubre 2026',
    content: [
      {
        sectionTitle: '1. Objeto del Sitio',
        paragraphs: [
          'El presente sitio web tiene por objeto exclusivo presentar el perfil profesional, habilidades, trayectoria y catálogo de servicios de Eber Ruiz Zamora, Ingeniero de Sistemas, así como facilitar canales de contacto directo para particulares y empresas.',
          'La información contenida en el sitio no constituye una oferta contractual irrevocable ni genera por sí sola una relación jurídica de prestación de servicios entre las partes.',
        ],
      },
      {
        sectionTitle: '2. Propiedad Intelectual',
        paragraphs: [
          'Los textos explicativos, diseños, marcas distintivas (incluyendo el monograma «ER»), arquitectura de información y código fuente original de la interfaz son de autoría o uso legítimo de Eber Ruiz Zamora y se encuentran protegidos por la normatividad colombiana e internacional en materia de derecho de autor (Ley 23 de 1982 y Decisión Andina 351 de 1993).',
          'Queda prohibida su reproducción, comercialización o distribución sin la debida autorización previa y por escrito.',
        ],
      },
      {
        sectionTitle: '3. Enlaces a Sitios de Terceros',
        paragraphs: [
          'El sitio puede contener hipervínculos a plataformas de terceros (como WhatsApp o proveedores de correo electrónico). Eber Ruiz Zamora no asume responsabilidad sobre la disponibilidad, términos o políticas de seguridad de dichos sitios externos.',
        ],
      },
      {
        sectionTitle: '4. Limitación de Responsabilidad',
        paragraphs: [
          'El sitio se ofrece «tal cual» y según disponibilidad técnica. No se asume responsabilidad por interrupciones temporales del servicio derivadas de fallas en redes de telecomunicaciones o incompatibilidades en navegadores desactualizados.',
        ],
      },
    ],
  },
  {
    id: 'alcance-profesional',
    slug: 'alcance-profesional',
    title: 'Aviso de Alcance y Responsabilidad Profesional',
    shortTitle: 'Alcance Profesional',
    category: 'Términos y Servicios',
    summary:
      'Claridad sobre las condiciones de cotización, diagnóstico y contratación de los servicios profesionales de ingeniería.',
    lastUpdated: 'Octubre 2026',
    content: [
      {
        sectionTitle: '1. Carácter Informativo de los Contenidos',
        paragraphs: [
          'Las descripciones de servicios, modelos de proyectos y ejemplos de soluciones que aparecen en este sitio tienen carácter netamente orientativo y descriptivo de capacidades técnicas.',
          'No constituyen tarifas estandarizadas obligatorias ni promesas unilaterales de resultados cuantificados sin previo análisis.',
        ],
      },
      {
        sectionTitle: '2. Condiciones Particulares de cada Servicio',
        paragraphs: [
          'Cada intervención técnica (sea mantenimiento físico/lógico de computadores, automatización en Excel/Power BI o estructuración de inventarios en farmacias) se formaliza mediante una propuesta técnica particular que define:',
        ],
        bullets: [
          'Alcance detallado de las actividades a ejecutar.',
          'Tiempos estimados de entrega o cronograma de trabajo.',
          'Costos, honorarios y condiciones de pago.',
          'Obligaciones mutuas de custodia y confidencialidad sobre la información manipulada.',
        ],
      },
      {
        sectionTitle: '3. Responsabilidad Técnica en Soporte e Inventarios',
        paragraphs: [
          'En labores de soporte de computadores, el cliente es responsable de contar con respaldos previos de su información sensible a menos que la copia de seguridad forme parte expresa del servicio contratado. En inventarios de farmacias, el profesional aporta metodología, semaforización y auditoría técnica, correspondiendo a la administración del establecimiento la veracidad física de los conteos y la custodia legal de los medicamentos.',
        ],
      },
    ],
  },
  {
    id: 'procedimiento-derechos',
    slug: 'procedimiento-derechos',
    title: 'Procedimiento para Consultas, Reclamos y Ejercicio de Derechos de Habeas Data',
    shortTitle: 'Procedimiento de Reclamos',
    category: 'Gestión y Derechos',
    summary:
      'Guía paso a paso sobre cómo solicitar actualización, rectificación, supresión de datos o revocatoria de autorización conforme a los artículos 14 y 15 de la Ley 1581 de 2012.',
    lastUpdated: 'Octubre 2026',
    content: [
      {
        sectionTitle: '1. Canales Habilitados para la Radicación',
        paragraphs: [
          'Los titulares o sus causahabientes podrán formular sus peticiones a través de los siguientes canales directos:',
        ],
        bullets: [
          'Vía correo electrónico: ruzae1@gmail.com (con copia a ruzae1@yahoo.com).',
          'Vía WhatsApp / Mensajería: +57 302 310 5047.',
        ],
      },
      {
        sectionTitle: '2. Requisitos de la Solicitud',
        paragraphs: [
          'Para dar trámite expedito, la solicitud debe contener como mínimo:',
        ],
        bullets: [
          'Nombre completo y documento de identificación del Titular.',
          'Descripción clara y precisa de los hechos que motivan la consulta o reclamo (corrección de datos, solicitud de prueba, supresión de registros o revocación de consentimiento).',
          'Dirección física o electrónica para recibir notificaciones y respuestas.',
          'Documentos que respalden la solicitud (si aplica).',
        ],
      },
      {
        sectionTitle: '3. Trámite de Consultas (Artículo 14 Ley 1581)',
        paragraphs: [
          'Las consultas serán atendidas en un término máximo de diez (10) días hábiles contados a partir de la fecha de su recibo.',
          'Cuando no fuere posible atender la consulta dentro de dicho término, se informará al interesado antes del vencimiento expresando los motivos de la demora y señalando la fecha en que se atenderá, la cual no superará los cinco (5) días hábiles siguientes.',
        ],
      },
      {
        sectionTitle: '4. Trámite de Reclamos (Artículo 15 Ley 1581)',
        paragraphs: [
          'El reclamo será tramitado bajo las siguientes reglas legales:',
        ],
        bullets: [
          'Si el reclamo resulta incompleto, se requerirá al interesado dentro de los cinco (5) días siguientes a su recepción para que subsane las fallas. Transcurridos dos (2) meses sin respuesta, se entenderá desistido el reclamo.',
          'Una vez recibido el reclamo completo, se incluirá en los registros una leyenda que diga «reclamo en trámite» y el motivo del mismo.',
          'El término máximo para atender el reclamo será de quince (15) días hábiles contados a partir del día siguiente a la fecha de su recibo. Si no fuere posible atenderlo en dicho término, se informará al interesado los motivos y la fecha en que será resuelto, que no podrá superar los ocho (8) días hábiles siguientes.',
        ],
      },
      {
        sectionTitle: '5. Recurso ante la Superintendencia de Industria y Comercio',
        paragraphs: [
          'El Titular o causahabiente solo podrá acudir ante la Superintendencia de Industria y Comercio (SIC) una vez haya agotado el trámite de consulta o reclamo directo ante el Responsable del Tratamiento, de conformidad con el artículo 16 de la Ley 1581 de 2012.',
        ],
      },
    ],
  },
  {
    id: 'contacto-proteccion-datos',
    slug: 'contacto-proteccion-datos',
    title: 'Canal de Contacto para Protección de Datos Personales',
    shortTitle: 'Contacto Protección de Datos',
    category: 'Gestión y Derechos',
    summary:
      'Mesa de atención directa para resolver dudas, peticiones y requerimientos formales en materia de privacidad y tratamiento de datos.',
    lastUpdated: 'Octubre 2026',
    content: [
      {
        sectionTitle: 'Atención Directa con el Responsable',
        paragraphs: [
          'Eber Ruiz Zamora atiende de forma directa y personalizada todas las comunicaciones relativas a la privacidad y el ejercicio de los derechos de Habeas Data.',
          'Si requieres formular una petición formal o rectificar tus datos de contacto:',
        ],
        bullets: [
          'Escribe directamente a ruzae1@gmail.com con el asunto «SOLICITUD HABEAS DATA - LEY 1581».',
          'Alternativa: ruzae1@yahoo.com.',
          'Canal rápido de consulta previa: WhatsApp +57 302 310 5047.',
        ],
      },
      {
        sectionTitle: 'Modelo Sugerido de Solicitud por Correo',
        paragraphs: [
          'Puedes copiar y adaptar la siguiente estructura para remitir tu requerimiento:',
          '«Para: ruzae1@gmail.com\nAsunto: Ejercicio de derecho de Habeas Data - [Nombre del Titular]\n\nCordial saludo Eber Ruiz Zamora,\n\nYo, [Tu Nombre Completo], identificado con documento [Número de identificación], actuando en calidad de Titular de datos personales, solicito comedidamente [indicar si es: actualización / rectificación / supresión / consulta] de mis datos personales en virtud de lo establecido en la Ley 1581 de 2012.\n\nDetalle de la solicitud:\n[Describe con precisión tu solicitud]\n\nDirección de notificación:\nCorreo: [Tu correo]\nTeléfono: [Tu número]\n\nAtentamente,\n[Tu Nombre]»',
        ],
      },
    ],
  },
];
