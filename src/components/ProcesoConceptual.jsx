import { motion } from 'framer-motion'
import {
  AcademicCapIcon,
  UserIcon,
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ComputerDesktopIcon,
  PencilSquareIcon,
  DocumentTextIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
  LockClosedIcon,
  CogIcon,
  LightBulbIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

const PROCESOS = [
  {
    titulo: '(1) Validación de Competencias',
    pasos: [
      { Icon: AcademicCapIcon, label: 'Habilidades del estudiante' },
      { arrow: true },
      { Icon: UserIcon, label: 'Director de programa' },
      { arrow: true },
      { Icon: CheckBadgeIcon, label: 'Aprobado para servicio' },
    ],
    bg: 'var(--green-50)', border: 'var(--green-100)',
  },
  {
    titulo: '(2) Ejecución de Tarea y Nota de Crédito',
    pasos: [
      { Icon: ClipboardDocumentCheckIcon, label: 'Tarea asignada' },
      { arrow: true },
      { Icon: ComputerDesktopIcon, label: 'Ejecución' },
      { arrow: true },
      { Icon: PencilSquareIcon, label: 'Pyme/IPSS acepta' },
      { arrow: true },
      { Icon: DocumentTextIcon, label: 'Nota de crédito' },
      { arrow: true },
      { Icon: BuildingLibraryIcon, label: 'Finanzas IPSS' },
    ],
    bg: '#E6F5ED', border: '#B3DFC5',
    note: { NoteIcon: LightBulbIcon, text: 'El dinero nunca pasa por manos del estudiante' },
  },
  {
    titulo: '(3) Seguro de Carga Académica',
    pasos: [
      { Icon: CalendarDaysIcon, label: 'Calendario académico' },
      { arrow: true },
      { Icon: QuestionMarkCircleIcon, label: '¿Semana de exámenes?' },
      { arrow: true },
      { Icon: LockClosedIcon, label: 'Congelar tareas' },
    ],
    bg: '#FFFBEB', border: '#FCD34D',
    note: { NoteIcon: ShieldCheckIcon, text: 'El sistema protege automáticamente el rendimiento académico' },
  },
]

export default function ProcesoConceptual() {
  return (
    <div className="card proceso-section">
      <div className="card-title">
        <CogIcon style={{ width: 18, height: 18, display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
        Procesos Operativos del Sistema
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PROCESOS.map((proc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ background: proc.bg, border: `1px solid ${proc.border}`, borderRadius: 12, padding: '14px 16px' }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-800)', marginBottom: 12 }}>
              {proc.titulo}
            </div>
            <motion.div
              className="proceso-row"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12 } }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              {proc.pasos.map((paso, j) =>
                paso.arrow
                  ? (
                    <motion.span
                      key={j}
                      className="proceso-arrow"
                      variants={{
                        hidden: { opacity: 0, x: -6 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.2 } }
                      }}
                    >›</motion.span>
                  )
                  : (
                    <motion.div
                      key={j}
                      className="proceso-node"
                      variants={{
                        hidden: { opacity: 0, scale: 0.7, y: 10 },
                        show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 16 } }
                      }}
                    >
                      <div className="proceso-icon" style={{ background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <paso.Icon className="proceso-icon-svg" style={{ width: 22, height: 22 }} />
                      </div>
                      <span className="proceso-node-label">{paso.label}</span>
                    </motion.div>
                  )
              )}
            </motion.div>
            {proc.note && (
              <div style={{ marginTop: 10, fontSize: 11, fontWeight: 600, color: 'var(--green-800)', background: 'rgba(255,255,255,0.7)', borderRadius: 6, padding: '5px 10px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <proc.note.NoteIcon style={{ width: 16, height: 16, flexShrink: 0 }} />
                {proc.note.text}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
