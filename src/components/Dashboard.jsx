import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'

function useCountUp(target, duration = 1.2) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: v => setDisplay(Math.round(v)),
    })
    return controls.stop
  }, [target])
  return display
}
import { HandRaisedIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid'
import { useUser } from '../context/UserContext'
import EstadoFinanciero from './EstadoFinanciero'
import MisTareas from './MisTareas'
import Competencias from './Competencias'
import CalendarioAcademico from './CalendarioAcademico'
import ProcesoConceptual from './ProcesoConceptual'
import Notification from './Notification'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
}

export default function Dashboard() {
  const { currentUser } = useUser()
  const [creditoAcumulado, setCreditoAcumulado] = useState(currentUser.creditoAcumulado)
  const [prevUserId, setPrevUserId] = useState(currentUser.id)
  const [notification, setNotification] = useState(null)
  const semRef = useRef(Math.round((currentUser.creditoAcumulado / currentUser.montoCuota) * 100))

  if (currentUser.id !== prevUserId) {
    setPrevUserId(currentUser.id)
    setCreditoAcumulado(currentUser.creditoAcumulado)
    semRef.current = Math.round((currentUser.creditoAcumulado / currentUser.montoCuota) * 100)
  }

  const notify = (msg, icon = <CheckCircleIcon style={{ width: 22, height: 22, color: 'var(--green-600)' }} />) => {
    setNotification({ msg, icon })
    setTimeout(() => setNotification(null), 3800)
  }

  const addCredito = (amount) => {
    setCreditoAcumulado(prev => Math.min(prev + amount, currentUser.montoCuota))
    notify(`+$${amount.toLocaleString('es-CL')} CLP abonado a tu arancel`, <CurrencyDollarIcon style={{ width: 22, height: 22, color: '#F59E0B' }} />)
  }

  const restante = Math.max(currentUser.montoCuota - creditoAcumulado, 0)
  const porcentaje = Math.round((creditoAcumulado / currentUser.montoCuota) * 100)

  useEffect(() => {
    const prev = semRef.current
    semRef.current = porcentaje
    if (prev === 0 && porcentaje > 0) {
      const t = setTimeout(() => {
        setNotification({ msg: '¡Semáforo Amarillo activado! Tu arancel ya tiene cobertura SebaPro 🟡', icon: <span style={{ fontSize: 20 }}>🚦</span> })
        setTimeout(() => setNotification(null), 4500)
      }, 2400)
      return () => clearTimeout(t)
    }
    if (prev > 0 && prev < 100 && porcentaje >= 100) {
      const t = setTimeout(() => {
        setNotification({ msg: '¡Arancel 100% cubierto por SebaPro! Semáforo Verde activado 🟢', icon: <span style={{ fontSize: 20 }}>🎉</span> })
        setTimeout(() => setNotification(null), 4500)
      }, 2400)
      return () => clearTimeout(t)
    }
  }, [porcentaje])
  const nombre = currentUser.nombre.split(' ')[0]

  const animatedKValue = useCountUp(Math.round(creditoAcumulado / 1000))
  const animatedPorcentaje = useCountUp(porcentaje)

  return (
    <>
      <style>{`
        .greeting-header {
          flex-wrap: wrap;
          gap: 12px;
        }
        .greeting-stats {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .greeting-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
      <motion.div
        className="content-area"
        key={currentUser.id}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >

        {/* Logo prominente + Saludo */}
        <motion.div variants={itemVariants} className="greeting-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img
              src="/logo.jpg"
              alt="SebaPro Connect"
              style={{ width: 56, height: 56, objectFit: 'contain', borderRadius: 14, boxShadow: '0 2px 10px rgba(0,80,40,0.18)', background: 'white', padding: 3 }}
            />
            <div>
              <div className="greeting-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                ¡Hola, {nombre}!
                <HandRaisedIcon style={{ width: 20, height: 20, color: 'var(--green-500)' }} />
              </div>
              <div className="greeting-sub">{currentUser.carrera} · {currentUser.nivel}</div>
            </div>
          </div>
          <div className="greeting-stats">
            <div className="stat-box" style={{ minWidth: 100 }}>
              <div className="stat-box-value">
                ${animatedKValue}K
              </div>
              <div className="stat-box-label">créditos acumulados</div>
            </div>
            <div className="stat-box" style={{ minWidth: 100 }}>
              <div className="stat-box-value">{animatedPorcentaje}%</div>
              <div className="stat-box-label">arancel cubierto</div>
            </div>
          </div>
        </motion.div>

        {/* Estado financiero con donut */}
        <motion.div variants={itemVariants}>
          <EstadoFinanciero
            montoCuota={currentUser.montoCuota}
            creditoAcumulado={creditoAcumulado}
            restante={restante}
            porcentaje={porcentaje}
          />
        </motion.div>

        {/* Tareas y competencias */}
        <motion.div variants={itemVariants}><MisTareas onCompletarTarea={addCredito} onNotify={notify} /></motion.div>
        <motion.div variants={itemVariants}><Competencias /></motion.div>

        {/* Calendario */}
        <motion.div variants={itemVariants}><CalendarioAcademico onNotify={notify} /></motion.div>

        {/* Proceso */}
        <motion.div variants={itemVariants}><ProcesoConceptual /></motion.div>
      </motion.div>

      <AnimatePresence>
        {notification && <Notification key="notif" icon={notification.icon} msg={notification.msg} />}
      </AnimatePresence>
    </>
  )
}
