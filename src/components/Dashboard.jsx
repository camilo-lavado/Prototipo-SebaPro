import { useState } from 'react'
import { useUser } from '../context/UserContext'
import EstadoFinanciero from './EstadoFinanciero'
import MisTareas from './MisTareas'
import Competencias from './Competencias'
import CalendarioAcademico from './CalendarioAcademico'
import ProcesoConceptual from './ProcesoConceptual'
import Notification from './Notification'

export default function Dashboard() {
  const { currentUser } = useUser()
  const [creditoAcumulado, setCreditoAcumulado] = useState(currentUser.creditoAcumulado)
  const [prevUserId, setPrevUserId] = useState(currentUser.id)
  const [notification, setNotification] = useState(null)

  if (currentUser.id !== prevUserId) {
    setPrevUserId(currentUser.id)
    setCreditoAcumulado(currentUser.creditoAcumulado)
  }

  const notify = (msg, icon = '✅') => {
    setNotification({ msg, icon })
    setTimeout(() => setNotification(null), 3500)
  }

  const addCredito = (amount) => {
    setCreditoAcumulado(prev => Math.min(prev + amount, currentUser.montoCuota))
    notify(`+$${amount.toLocaleString('es-CL')} CLP abonado a tu arancel`, '💰')
  }

  const restante = Math.max(currentUser.montoCuota - creditoAcumulado, 0)
  const porcentaje = Math.round((creditoAcumulado / currentUser.montoCuota) * 100)
  const nombre = currentUser.nombre.split(' ')[0]

  return (
    <>
      <div className="content-area">

        {/* Saludo */}
        <div className="greeting-header">
          <div>
            <div className="greeting-title">¡Hola, {nombre}! 👋</div>
            <div className="greeting-sub">{currentUser.carrera} · {currentUser.nivel}</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="stat-box" style={{ minWidth: 100 }}>
              <div className="stat-box-value">
                ${(creditoAcumulado / 1000).toFixed(0)}K
              </div>
              <div className="stat-box-label">créditos acumulados</div>
            </div>
            <div className="stat-box" style={{ minWidth: 100 }}>
              <div className="stat-box-value">{porcentaje}%</div>
              <div className="stat-box-label">arancel cubierto</div>
            </div>
          </div>
        </div>

        {/* Estado financiero con donut */}
        <EstadoFinanciero
          montoCuota={currentUser.montoCuota}
          creditoAcumulado={creditoAcumulado}
          restante={restante}
          porcentaje={porcentaje}
        />

        {/* Tareas y competencias */}
        <MisTareas onCompletarTarea={addCredito} onNotify={notify} />
        <Competencias />

        {/* Calendario */}
        <CalendarioAcademico onNotify={notify} />

        {/* Proceso */}
        <ProcesoConceptual />
      </div>

      {notification && <Notification icon={notification.icon} msg={notification.msg} />}
    </>
  )
}
