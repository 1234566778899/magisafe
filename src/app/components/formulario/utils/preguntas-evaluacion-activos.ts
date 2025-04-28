export const preguntasEvaluacionActivos = [
  {
    categoria: 'Gobierno y Cumplimiento',
    preguntas: [
      {
        id: 1,
        texto:
          '¿Cuenta con una política de seguridad que establece cómo proteger la información de la empresa?',
        controles: [
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.GV',
            texto: '5.1 Políticas de Seguridad de la Información',
          },
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.RM',
            texto: '5.1 Políticas de Seguridad de la Información',
          },
        ],
      },
      {
        id: 2,
        texto:
          '¿La alta dirección de su empresa asume y supervisa responsabilidades en temas de seguridad de la información?',
        controles: [
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.GV',
            texto: '5.4 Responsabilidades de la Gerencia',
          },
        ],
      },
      {
        id: 3,
        texto:
          '¿Se identifica y cumple con las obligaciones legales y contractuales relacionadas con la protección de la información, como la Ley de Protección de Datos Personales y otros requisitos aplicables?',
        controles: [
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.BE',
            texto: '5.31 Requisitos Legales, Estatutarios, Reglamentarios y Contractuales',
          },
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.RM',
            texto: '5.31 Requisitos Legales, Estatutarios, Reglamentarios y Contractuales',
          },
        ],
      },
      {
        id: 4,
        texto:
          '¿Tienen cláusulas contractuales que obliguen a los proveedores a cumplir con medidas de seguridad?',
        controles: [
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.BE',
            texto: '5.19 Seguridad de la Información en las Relaciones con Proveedores',
          },
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.SC',
            texto: '5.19 Seguridad de la Información en las Relaciones con Proveedores',
          },
        ],
      },
      {
        id: 5,
        texto:
          '¿Se han establecido canales o contactos oficiales con autoridades relevantes en caso de incidentes?',
        controles: [
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.GV',
            texto: '5.5 Contacto con Autoridades',
          },
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.SC',
            texto: '5.5 Contacto con Autoridades',
          },
        ],
      },
    ],
  },
  {
    categoria: 'Gestión de Información',
    preguntas: [
      {
        id: 6,
        texto:
          '¿Llevan un inventario de activos informáticos como documentos y equipos clave de la empresa?',
        controles: [
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.AM',
            texto: 'A.5.9: Inventario de Información y Otros Activos Asociados',
          },
        ],
      },
      {
        id: 7,
        texto:
          '¿Existen reglas claras sobre qué pueden hacer los empleados con la información o recursos de la empresa?',
        controles: [
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.AM',
            texto: 'A.5.10: Uso Aceptable de la Información y Otros Activos Asociados',
          },
        ],
      },
      {
        id: 8,
        texto:
          '¿La información de la empresa está clasificada de forma que se proteja según su sensibilidad?',
        controles: [
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.AM',
            texto: 'A.5.12: Clasificación de la Información',
          },
        ],
      },
      {
        id: 9,
        texto:
          '¿Etiquetan los documentos y archivos según su nivel de confidencialidad o uso permitido?',
        controles: [
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.GV',
            texto: '5.13 Etiquetado de Información',
          },
        ],
      },
      {
        id: 10,
        texto:
          '¿Se realizan copias de respaldo con regularidad y se verifica su recuperación cuando es necesario?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.DS',
            texto: '8.13 Copia de Seguridad de la Información',
          },
        ],
      },
      {
        id: 11,
        texto:
          '¿Se borra, elimina o destruye de forma segura la información antes de desechar o reutilizar un equipo?',
        controles: [
          {
            funcion: 'RECUPERAR',
            categoriaNIST: 'RC.CO',
            texto: '7.14 Eliminación Segura o Reutilización del Equipo',
          },
        ],
      },
      {
        id: 12,
        texto:
          '¿Existe un proceso para asegurar que los activos tecnológicos y documentos se devuelven al finalizar una relación laboral o contrato?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.IP',
            texto: '5.11 Devolución de Activos',
          },
        ],
      }
    ],
  },
  {
    categoria: 'Seguridad Física y Ambiental',
    preguntas: [
      {
        id: 13,
        texto:
          '¿Las instalaciones están protegidas mediante controles físicos como acceso restringido, cerraduras o vigilancia?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.AC',
            texto: '7.1 Perímetros de Seguridad Física',
          },
        ],
      },
      {
        id: 14,
        texto:
          '¿Las oficinas y áreas de trabajo están físicamente protegidas contra accesos no autorizados?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.MA',
            texto: '7.3 Protección de Oficinas, Habitaciones e Instalaciones',
          },
        ],
      },
      {
        id: 15,
        texto:
          '¿Monitorean con cámaras u otros sistemas las zonas físicas sensibles o de alto riesgo?',
        controles: [
          {
            funcion: 'DETECTAR',
            categoriaNIST: 'DE.CM',
            texto: '7.4 Monitoreo de Seguridad Física',
          },
        ],
      },
      {
        id: 16,
        texto:
          '¿La empresa está preparada frente a amenazas físicas o ambientales como incendios, inundaciones, cortes de energía o acceso no autorizado a las instalaciones?',
        controles: [
          {
            funcion: 'DETECTAR',
            categoriaNIST: 'DE.CM',
            texto: '7.5 Protección contra Amenazas Físicas y Ambientales',
          },
        ],
      },
      {
        id: 17,
        texto:
          '¿Tienen prácticas para evitar dejar información visible en escritorios o pantallas desatendidas?',
        controles: [
          {
            funcion: 'DETECTAR',
            categoriaNIST: 'DE.CM',
            texto: '7.7 Limpiar Escritorio y Limpiar Pantalla',
          },
        ],
      },
    ]
  },
  {
    categoria: 'Seguridad Tecnológica y Accesos',
    preguntas: [
      {
        id: 18,
        texto:
          '¿Tienen definidos y aplicados niveles de acceso según el rol del usuario?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.AC',
            texto: '5.15 Control de Acceso',
          },
        ],
      },
      {
        id: 19,
        texto:
          '¿Controlan quién puede acceder a qué información según roles y responsabilidades?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.AC',
            texto: '5.18 Derechos de Acceso',
          },
        ],
      },
      {
        id: 20,
        texto:
          '¿El acceso a la información digital está restringido únicamente al personal autorizado?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.AC',
            texto: '8.3 Restricción de Acceso a la Información',
          },
        ],
      },
      {
        id: 21,
        texto:
          '¿Se utilizan métodos seguros de autenticación como contraseñas fuertes, doble factor u otros?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.AC',
            texto: '5.17 Información de Autenticación',
          },
        ],
      },
      {
        id: 22,
        texto:
          '¿Se utilizan métodos robustos de autenticación para acceder a sistemas importantes?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.PT',
            texto: '8.5 Autenticación Segura',
          },
        ],
      },
      {
        id: 23,
        texto:
          '¿Las redes empresariales cuentan con medidas para evitar accesos no autorizados o ataques externos?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.PT',
            texto: '8.21 Seguridad de los Servicios de Red',
          },
        ],
      },
      {
        id: 24,
        texto:
          '¿Los dispositivos de trabajo (PC, laptops, tablets) cuentan con protecciones y configuraciones de seguridad adecuadas?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.PT',
            texto: '8.1 Dispositivos Terminales de Usuario',
          },
        ],
      },
      {
        id: 25,
        texto:
          '¿Tienen herramientas para detectar y bloquear software malicioso en tiempo real?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.DS',
            texto: '8.7 Protección contra Malware',
          },
          {
            funcion: 'RESPONDER',
            categoriaNIST: 'RS.MI',
            texto: '8.7 Protección contra Malware',
          },
        ],
      },
      {
        id: 26,
        texto:
          '¿Revisan regularmente sus sistemas para detectar vulnerabilidades o brechas de seguridad?',
        controles: [
          {
            funcion: 'DETECTAR',
            categoriaNIST: 'DE.CM',
            texto: '8.8 Gestión de Vulnerabilidades Técnicas',
          },
        ],
      },
      {
        id: 27,
        texto:
          '¿Se aplican medidas correctivas cuando se detectan vulnerabilidades en sus sistemas?',
        controles: [
          {
            funcion: 'DETECTAR',
            categoriaNIST: 'DE.CM',
            texto: '8.8 Gestión de Vulnerabilidades Técnicas',
          },
        ],
      },
    ]
  },
  {
    categoria: 'Gestión de Personas y Cultura',
    preguntas: [
      {
        id: 28,
        texto:
          '¿El personal recibe capacitaciones en buenas prácticas de seguridad de la información?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.AT',
            texto: '6.3 Concientización, Educación y Capacitación sobre Seguridad de la Información',
          },
        ],
      },
      {
        id: 29,
        texto:
          '¿Se aplica un proceso disciplinario si alguien incumple las normas de seguridad?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.AT',
            texto: '6.4 Proceso Disciplinario',
          },
        ],
      },
      {
        id: 30,
        texto:
          '¿El personal firma y cumple con acuerdos de confidencialidad respecto al manejo de la información?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.AT',
            texto: '6.6 Acuerdos de Confidencialidad o No Divulgación',
          },
        ],
      },
      {
        id: 31,
        texto:
          '¿Se han definido medidas de seguridad específicas para quienes trabajan desde casa u otros lugares?',
        controles: [
          {
            funcion: 'PROTEGER',
            categoriaNIST: 'PR.AT',
            texto: '6.7 Trabajo Remoto',
          },
        ],
      },
      {
        id: 32,
        texto:
          '¿Separan funciones del personal para evitar conflictos de interés o abusos (por ejemplo, aprobar y ejecutar pagos)?',
        controles: [
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.GV',
            texto: '5.3 Segregación de Funciones',
          },
        ],
      },
      {
        id: 33,
        texto:
          '¿Colaboran con gremios, asociaciones u otros grupos para intercambiar buenas prácticas en ciberseguridad?',
        controles: [
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.GV',
            texto: '5.6 Contacto con Grupos de Interés Especial',
          },
          {
            funcion: 'IDENTIFICAR',
            categoriaNIST: 'ID.SC',
            texto: '5.6 Contacto con Grupos de Interés Especial',
          },
        ],
      },
    ]
  },
  {
    categoria: 'Gestión de Incidentes y Mejora',
    preguntas: [
      {
        id: 34,
        texto:
          '¿Existe un plan documentado que indique cómo actuar ante incidentes de seguridad?',
        controles: [
          {
            funcion: 'DETECTAR',
            categoriaNIST: 'DE.AE',
            texto: '5.24 Planificación y Preparación de la Gestión de Incidentes de Seguridad de la Información',
          },
          {
            funcion: 'RESPONDER',
            categoriaNIST: 'RS.CO',
            texto: '5.24 Planificación y Preparación de la Gestión de Incidentes de Seguridad de la Información',
          },
          {
            funcion: 'RESPONDER',
            categoriaNIST: 'RS.RP',
            texto: '5.24 Planificación y Preparación de la Gestión de Incidentes de Seguridad de la Información',
          }
        ],
      },
      {
        id: 35,
        texto:
          '¿Tienen establecido un procedimiento para responder rápidamente ante un incidente de seguridad?',
        controles: [
          {
            funcion: 'DETECTAR',
            categoriaNIST: 'DE.AE',
            texto: '5.26 Respuesta a Incidentes de Seguridad de la Información',
          },
          {
            funcion: 'RESPONDER',
            categoriaNIST: 'RS.AN',
            texto: '5.26 Respuesta a Incidentes de Seguridad de la Información',
          },
          {
            funcion: 'RESPONDER',
            categoriaNIST: 'RS.MI',
            texto: '5.26 Respuesta a Incidentes de Seguridad de la Información',
          },
          {
            funcion: 'RESPONDER',
            categoriaNIST: 'RS.RP',
            texto: '5.26 Respuesta a Incidentes de Seguridad de la Información',
          },
          {
            funcion: 'RECUPERAR',
            categoriaNIST: 'RC.RP',
            texto: '5.26 Respuesta a Incidentes de Seguridad de la Información',
          },
        ],
      },
      {
        id: 36,
        texto:
          '¿Se documentan y analizan los eventos o anomalías de seguridad que ocurren en la empresa?',
        controles: [
          {
            funcion: 'DETECTAR',
            categoriaNIST: 'DE.DP',
            texto: '6.8 Informes de Eventos de Seguridad de la Información',
          },
          {
            funcion: 'RESPONDER',
            categoriaNIST: 'RS.COP',
            texto: '6.8 Informes de Eventos de Seguridad de la Información',
          },
        ],
      },
      {
        id: 37,
        texto:
          '¿Se documentan los aprendizajes obtenidos tras un incidente para aplicarlos en futuras acciones?',
        controles: [
          {
            funcion: 'RESPONDER',
            categoriaNIST: 'RS.AN',
            texto: '5.27 Aprender de los Incidentes de Seguridad de la Información',
          },
          {
            funcion: 'RESPONDER',
            categoriaNIST: 'RS.IM',
            texto: '5.27 Aprender de los Incidentes de Seguridad de la Información',
          },
          {
            funcion: 'RESPONDER',
            categoriaNIST: 'RS.MI',
            texto: '5.27 Aprender de los Incidentes de Seguridad de la Información',
          },
          {
            funcion: 'RECUPERAR',
            categoriaNIST: 'RC.IM',
            texto: '5.27 Aprender de los Incidentes de Seguridad de la Información',
          },
          {
            funcion: 'RECUPERAR',
            categoriaNIST: 'RC.RP',
            texto: '5.27 Aprender de los Incidentes de Seguridad de la Información',
          },
        ],
      },
    ]
  }
];