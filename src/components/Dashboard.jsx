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

  // Resetea el crédito al cambiar de usuario
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

  return (
    <>
      <div className="content-area">
        <div className="sebapro-header">
          <div className="logo-circle">🌳</div>
          <div className="sebapro-header-text">
            <h1>SEBAPRO CONNECT</h1>
            <p>TU CONOCIMIENTO Y TU ESFUERZO PAGAN TU CARRERA</p>
          </div>
          <div className="header-badge">Vespertino · Activo</div>
        </div>

        <EstadoFinanciero
          montoCuota={currentUser.montoCuota}
          creditoAcumulado={creditoAcumulado}
          restante={restante}
          porcentaje={porcentaje}
        />

        <MisTareas onCompletarTarea={addCredito} onNotify={notify} />
        <Competencias />
        <CalendarioAcademico onNotify={notify} />
        <ProcesoConceptual />
      </div>

      {notification && (
        <Notification icon={notification.icon} msg={notification.msg} />
      )}
    </>
  )
}
