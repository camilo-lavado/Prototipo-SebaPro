export const USERS = [
  {
    id: 'AVT001',
    nombre: 'Ana Vásquez Torres',
    iniciales: 'AV',
    carrera: 'Técnico en Administración de Empresas',
    nivel: '3° Semestre',
    jornada: 'Vespertina',
    rut: '18.432.901-5',
    color: '#8e44ad',

    // SebaPro
    montoCuota: 180000,
    creditoAcumulado: 108000,
    competencias: [
      { id: 1, nombre: 'Administración General', validada: true },
      { id: 2, nombre: 'Gestión de Inventarios', validada: true },
      { id: 3, nombre: 'Contabilidad Básica', validada: true },
      { id: 4, nombre: 'Atención al Cliente', validada: false },
      { id: 5, nombre: 'Programación Básica', validada: false },
    ],

    // Academia
    asignaturas: [
      { codigo: 'ADM301', nombre: 'Gestión de Recursos Humanos', docente: 'Prof. M. Castillo', horario: 'Lun/Mié 19:00-21:30', asistencia: 88, creditos: 4 },
      { codigo: 'ADM302', nombre: 'Contabilidad Aplicada', docente: 'Prof. R. Fuentes', horario: 'Mar/Jue 19:00-21:30', asistencia: 92, creditos: 4 },
      { codigo: 'ADM303', nombre: 'Legislación Laboral', docente: 'Prof. C. Morales', horario: 'Vie 19:00-22:30', asistencia: 75, creditos: 3 },
      { codigo: 'ADM304', nombre: 'Marketing Estratégico', docente: 'Prof. S. Navarro', horario: 'Lun 19:00-21:30', asistencia: 95, creditos: 3 },
      { codigo: 'ADM305', nombre: 'Gestión de Proyectos', docente: 'Prof. A. Herrera', horario: 'Mié 19:00-22:30', asistencia: 82, creditos: 4 },
    ],

    // Notas
    notas: [
      { asignatura: 'Gestión de Recursos Humanos', c1: 5.8, c2: 6.2, examen: null, estado: 'en curso' },
      { asignatura: 'Contabilidad Aplicada', c1: 6.5, c2: 6.8, examen: null, estado: 'en curso' },
      { asignatura: 'Legislación Laboral', c1: 4.9, c2: 5.3, examen: null, estado: 'en curso' },
      { asignatura: 'Marketing Estratégico', c1: 6.0, c2: 6.4, examen: null, estado: 'en curso' },
      { asignatura: 'Gestión de Proyectos', c1: 5.5, c2: 5.9, examen: null, estado: 'en curso' },
    ],

    // Biblioteca
    prestamos: [
      { id: 'BIB001', titulo: 'Administración, 14ª Edición', autor: 'Robbins & Coulter', vencimiento: '2026-06-05', estado: 'activo' },
      { id: 'BIB002', titulo: 'Principios de Contabilidad', autor: 'Meigs & Meigs', vencimiento: '2026-05-30', estado: 'vence pronto' },
    ],

    // Seguro
    seguro: {
      poliza: 'SEG-2024-AV1823',
      tipo: 'Seguro Escolar + SebaPro',
      cobertura: 'Accidente en dependencias, traslado y micro-tareas externas',
      vigencia: '2026-12-31',
      aseguradora: 'IPSS Protección',
      beneficios: [
        { nombre: 'Accidente en Campus', monto: '$500.000 CLP', activo: true },
        { nombre: 'Accidente en Traslado', monto: '$300.000 CLP', activo: true },
        { nombre: 'Accidente en Micro-Tarea', monto: '$400.000 CLP', activo: true },
        { nombre: 'Telemedicina IPSS', monto: 'Ilimitado', activo: true },
        { nombre: 'Apoyo Psicológico (4 sesiones)', monto: 'Sin costo', activo: false },
      ],
    },
  },
  {
    id: 'MRS045',
    nombre: 'Marco Reyes Soto',
    iniciales: 'MR',
    carrera: 'Ingeniería en Informática',
    nivel: '5° Semestre',
    jornada: 'Vespertino',
    rut: '20.187.654-3',
    color: '#16a085',

    // SebaPro
    montoCuota: 195000,
    creditoAcumulado: 45000,
    competencias: [
      { id: 1, nombre: 'Soporte TI / Hardware', validada: true },
      { id: 2, nombre: 'Configuración de Redes', validada: true },
      { id: 3, nombre: 'Programación Web (JS/HTML)', validada: false },
      { id: 4, nombre: 'Soporte de Software', validada: false },
      { id: 5, nombre: 'Base de Datos (SQL Básico)', validada: false },
    ],

    // Academia
    asignaturas: [
      { codigo: 'INF501', nombre: 'Arquitectura de Computadores', docente: 'Prof. J. Bravo', horario: 'Lun/Mié 19:00-21:30', asistencia: 91, creditos: 4 },
      { codigo: 'INF502', nombre: 'Desarrollo Web Full Stack', docente: 'Prof. P. Toro', horario: 'Mar/Jue 19:00-21:30', asistencia: 85, creditos: 5 },
      { codigo: 'INF503', nombre: 'Base de Datos Avanzadas', docente: 'Prof. L. Vera', horario: 'Vie 19:00-22:30', asistencia: 78, creditos: 4 },
      { codigo: 'INF504', nombre: 'Seguridad Informática', docente: 'Prof. E. Medina', horario: 'Lun 19:00-21:30', asistencia: 96, creditos: 3 },
      { codigo: 'INF505', nombre: 'Gestión de Proyectos TI', docente: 'Prof. D. Quiroga', horario: 'Mié 19:00-22:30', asistencia: 70, creditos: 3 },
    ],

    // Notas
    notas: [
      { asignatura: 'Arquitectura de Computadores', c1: 6.8, c2: 7.0, examen: null, estado: 'en curso' },
      { asignatura: 'Desarrollo Web Full Stack', c1: 5.6, c2: 6.1, examen: null, estado: 'en curso' },
      { asignatura: 'Base de Datos Avanzadas', c1: 4.5, c2: 4.8, examen: null, estado: 'en riesgo' },
      { asignatura: 'Seguridad Informática', c1: 6.9, c2: 6.5, examen: null, estado: 'en curso' },
      { asignatura: 'Gestión de Proyectos TI', c1: 5.0, c2: 5.4, examen: null, estado: 'en curso' },
    ],

    // Biblioteca
    prestamos: [
      { id: 'BIB011', titulo: 'Computer Networks, 5th Ed.', autor: 'Andrew Tanenbaum', vencimiento: '2026-06-10', estado: 'activo' },
      { id: 'BIB012', titulo: 'Clean Code', autor: 'Robert C. Martin', vencimiento: '2026-05-28', estado: 'vencido' },
      { id: 'BIB013', titulo: 'The Pragmatic Programmer', autor: 'Hunt & Thomas', vencimiento: '2026-06-15', estado: 'activo' },
    ],

    // Seguro
    seguro: {
      poliza: 'SEG-2024-MR4502',
      tipo: 'Seguro Escolar Básico',
      cobertura: 'Accidente en dependencias del Instituto',
      vigencia: '2026-12-31',
      aseguradora: 'IPSS Protección',
      beneficios: [
        { nombre: 'Accidente en Campus', monto: '$500.000 CLP', activo: true },
        { nombre: 'Accidente en Traslado', monto: '$300.000 CLP', activo: false },
        { nombre: 'Accidente en Micro-Tarea', monto: 'No incluido', activo: false },
        { nombre: 'Telemedicina IPSS', monto: 'Ilimitado', activo: true },
        { nombre: 'Apoyo Psicológico (4 sesiones)', monto: 'Sin costo', activo: true },
      ],
    },
  },
]
