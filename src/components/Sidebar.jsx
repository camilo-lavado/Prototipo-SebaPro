import { motion } from 'framer-motion'
import {
  AcademicCapIcon,
  DocumentTextIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import {
  AcademicCapIcon as AcademicCapSolid,
  DocumentTextIcon as DocumentTextSolid,
  BookOpenIcon as BookOpenSolid,
  ShieldCheckIcon as ShieldCheckSolid,
  ClipboardDocumentListIcon as ClipboardSolid,
  SparklesIcon as SparklesSolid,
} from '@heroicons/react/24/solid'

const NAV_ITEMS = [
  { id: 'academia',   Icon: AcademicCapIcon,          IconSolid: AcademicCapSolid,   label: 'Academia' },
  { id: 'notas',      Icon: DocumentTextIcon,          IconSolid: DocumentTextSolid,  label: 'Notas' },
  { id: 'biblioteca', Icon: BookOpenIcon,              IconSolid: BookOpenSolid,      label: 'Biblioteca' },
  { id: 'seguro',     Icon: ShieldCheckIcon,           IconSolid: ShieldCheckSolid,   label: 'Seguro' },
  { id: 'asistencia', Icon: ClipboardDocumentListIcon, IconSolid: ClipboardSolid,     label: 'Asistencia' },
  { id: 'sebapro',    Icon: SparklesIcon,              IconSolid: SparklesSolid,      label: 'SebaPro' },
]

const SEBAPRO_ITEMS = ['sebapro']

const navVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } }
}

export default function Sidebar({ activeView, onNavigate }) {
  const mainItems = NAV_ITEMS.filter(i => !SEBAPRO_ITEMS.includes(i.id))
  const sebaproItem = NAV_ITEMS.find(i => i.id === 'sebapro')

  return (
    <div className="sidebar sidebar-mobile-nav">
      {/* Logo */}
      <motion.div className="sidebar-brand" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <div className="sidebar-logo-wrap">
          <img src="/logo2.jpg" alt="SebaPro Connect" className="sidebar-logo-img" />
        </div>
        <div className="sidebar-brand-text">
          <div className="sidebar-brand-name">IPSS</div>
          <div className="sidebar-brand-sub">Portal Alumno</div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="sidebar-divider" />

      {/* Label sección */}
      <div className="sidebar-section-label">Servicios</div>

      {/* Nav principal */}
      <motion.div className="sidebar-nav" variants={navVariants} initial="hidden" animate="show">
        {mainItems.map(item => {
          const active = activeView === item.id
          const ActiveIcon = active ? item.IconSolid : item.Icon
          return (
            <motion.div key={item.id} variants={itemVariants}>
              <button
                className={`sidebar-item ${active ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
                title={item.label}
              >
                {active && <span className="sidebar-active-bar" />}
                <div className="sidebar-item-icon">
                  <ActiveIcon style={{ width: 20, height: 20 }} />
                </div>
                <span className="sidebar-item-label">{item.label}</span>
              </button>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Divider */}
      <div className="sidebar-divider" />

      {/* SebaPro destacado al fondo */}
      {sebaproItem && (() => {
        const active = activeView === 'sebapro'
        const ActiveIcon = active ? sebaproItem.IconSolid : sebaproItem.Icon
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <button
              className={`sidebar-item sidebar-sebapro ${active ? 'active' : ''}`}
              onClick={() => onNavigate('sebapro')}
              title="SebaPro Connect"
            >
              {active && <span className="sidebar-active-bar" />}
              <div className="sidebar-item-icon sebapro-icon">
                <ActiveIcon style={{ width: 20, height: 20 }} />
              </div>
              <span className="sidebar-item-label">SebaPro</span>
            </button>
          </motion.div>
        )
      })()}

      <div style={{ height: 8 }} />
    </div>
  )
}
