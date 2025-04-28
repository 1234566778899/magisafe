export const preguntasPorDimension = [
  {
    dimension: 'Controles Organizacionales',
    categoria: 'iso27001',
    preguntas: [
      { id: 1, texto: `¿Se realizan evaluaciones regulares de riesgos para identificar posibles amenazas a la seguridad informática?` },
      { id: 2, texto: `¿Se asegura la segregación de funciones para minimizar riesgos?` },
      { id: 3, texto: `¿Se cuenta con políticas de seguridad informática claramente establecidas y documentadas?` },
      { id: 4, texto: `¿Se mantienen registros de incidentes de seguridad como ciberataques?` },
      { id: 5, texto: `¿La gerencia está comprometida y tiene asignadas responsabilidades en seguridad de la información?` },
      { id: 6, texto: `¿Tienen contacto directo o indirecto con autoridades en caso de incidentes de seguridad?` },
      { id: 7, texto: `¿Realizan monitoreo de amenazas de seguridad relevantes para su empresa?` },
      { id: 8, texto: `¿Mantienen contacto con grupos de interés o especialistas en seguridad de la información?` },
      { id: 9, texto: `¿Tienen un inventario actualizado de la información y otros activos críticos?` },
      { id: 10, texto: `¿Tienen un proceso definido para la devolución de activos cuando un empleado deja la empresa?` },
      { id: 11, texto: `¿Clasifican la información según su nivel de confidencialidad?` },
      { id: 12, texto: `¿Etiquetan la información sensible para identificar su nivel de protección?` },
      { id: 13, texto: `¿Se gestiona adecuadamente la identidad y autenticación de los usuarios?` },
      { id: 14, texto: `¿Se limitan los derechos de acceso solo a lo necesario para cada usuario?` },
      { id: 15, texto: `¿Revisan los contratos con proveedores para incluir cláusulas de seguridad?` },
    ]
  },
  {
    dimension: 'Controles de Personas',
    categoria: 'iso27001',
    preguntas: [
      { id: 16, texto: `¿El personal cuenta con una formación regular sobre seguridad de la información?` },
      { id: 17, texto: `¿Se verifican los antecedentes del personal antes de otorgar acceso a datos sensibles?` },
      { id: 18, texto: `¿Se capacita al resto del personal de la empresa en temas relacionados con la ciberseguridad?` },
      { id: 19, texto: `¿Los empleados firman acuerdos de confidencialidad o no divulgación?` },
      { id: 20, texto: `¿La empresa tiene políticas para el trabajo remoto en cuanto a la seguridad de la información?` },
      { id: 21, texto: `¿Se les instruye a los empleados para que reporten eventos de seguridad de la información?` },
      { id: 22, texto: `¿Existe un proceso disciplinario en caso de incumplimientos de seguridad?` },
    ]
  },
  {
    dimension: 'Controles Físicos',
    categoria: 'iso27001',
    preguntas: [
      { id: 23, texto: `¿Se implementan controles de acceso físico para proteger áreas donde se almacena información sensible?` },
      { id: 24, texto: `¿La empresa tiene medidas de seguridad para prevenir el acceso no autorizado a equipos y datos?` },
      { id: 25, texto: `¿Los registros de acceso físico se revisan periódicamente para detectar irregularidades?` },
      { id: 26, texto: `¿Existen procedimientos de seguridad para situaciones de emergencia, como incendios o desastres naturales?` },
      { id: 27, texto: `¿Se protegen adecuadamente las áreas de trabajo y equipos de la empresa?` },
      { id: 28, texto: `¿Tienen políticas de escritorio limpio y pantalla limpia para proteger la información visible?` },
      { id: 29, texto: `¿La ubicación de equipos críticos tiene protección física adecuada?` },
      { id: 30, texto: `¿Disponen de almacenamiento seguro para medios y dispositivos de respaldo?` },
      { id: 31, texto: `¿Los equipos que ya no se usan son eliminados o reutilizados de forma segura?` },
    ]
  },
  {
    dimension: 'Controles Tecnológicos',
    categoria: 'iso27001',
    preguntas: [
      { id: 32, texto: `¿Se usan firewalls, antivirus y sistemas de detección de intrusiones para proteger las redes de la empresa?` },
      { id: 33, texto: `¿Realizan actualizaciones periódicas para gestionar vulnerabilidades?` },
      { id: 34, texto: `¿Se aplican medidas para mitigar el impacto de ataques de malware y ransomware?` },
      { id: 35, texto: `¿Tienen medidas de respaldo y recuperación de la información?` },
      { id: 36, texto: `¿Se implementa autenticación multifactor para accesos críticos?` },
      { id: 37, texto: `¿Se protegen los dispositivos de los usuarios finales con medidas de seguridad?` },
      { id: 38, texto: `¿Se otorgan derechos de acceso privilegiado solo a quienes realmente lo necesitan?` },
      { id: 39, texto: `¿Se monitorean las actividades críticas y se llevan registros de auditoría?` },
    ]
  },
  {
    dimension: 'Identificar',
    categoria: 'nist',
    preguntas: [
      { id: 40, texto: `¿La empresa mantiene un inventario actualizado de activos de información críticos?` },
      { id: 41, texto: `¿Se tiene identificado los activos críticos y los servicios que estos ofrecen en la organización?` },
      { id: 42, texto: `¿Se han identificado y clasificado los riesgos más importantes para estos activos?` },
      { id: 43, texto: `¿Se revisan periódicamente los activos y riesgos de ciberseguridad?` },
    ]
  },
  {
    dimension: 'Proteger',
    categoria: 'nist',
    preguntas: [
      { id: 44, texto: `¿Se implementan controles de acceso para proteger datos y sistemas?` },
      { id: 45, texto: `¿Se realizan copias de seguridad y se conservan los activos de clasificación más sensible?` },
      { id: 46, texto: `¿La empresa tiene políticas de contraseñas que obliguen a usarlas de manera segura?` },
      { id: 47, texto: `¿Se aplican medidas para evitar el uso indebido de dispositivos de almacenamiento portátiles?` },
      { id: 48, texto: `¿Existen políticas para gestionar el acceso a sistemas remotos?` },
    ]
  },
  {
    dimension: 'Detectar',
    categoria: 'nist',
    preguntas: [
      { id: 49, texto: `¿La empresa monitorea las redes para detectar actividades inusuales?` },
      { id: 50, texto: `¿Se utilizan herramientas de detección de intrusiones en sistemas críticos?` },
      { id: 51, texto: `¿Existen procedimientos de seguridad informática para la detección de incidentes de ciberseguridad?` },
      { id: 52, texto: `¿Se revisan los registros de acceso a sistemas regularmente para detectar actividades sospechosas?` },
    ]
  },
  {
    dimension: 'Responder',
    categoria: 'nist',
    preguntas: [
      { id: 53, texto: `¿La empresa tiene un plan documentado de respuesta ante incidentes de ciberseguridad?` },
      { id: 54, texto: `¿Cuenta con un procedimiento para la gestión de incidentes?` },
      { id: 55, texto: `¿El personal conoce los procedimientos para manejar y reportar incidentes?` },
      { id: 56, texto: `¿Se realiza un análisis posterior para mejorar la respuesta ante futuros incidentes?` },
    ]
  },
  {
    dimension: 'Recuperar',
    categoria: 'nist',
    preguntas: [
      { id: 57, texto: `¿La empresa cuenta con métodos de recuperación en caso de ataques por amenazas internas y externas?` },
      { id: 58, texto: `¿Se prueban regularmente las copias de seguridad para garantizar su disponibilidad?` },
      { id: 59, texto: `¿Se revisan las lecciones aprendidas después de un incidente para mejorar la recuperación futura?` },
    ]
  }
];