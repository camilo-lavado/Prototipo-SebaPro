function getSemaforoClass(pct) {
  if (pct >= 100) return 'green'
  if (pct >= 50)  return 'yellow'
  return 'red'
}

function getSemaforoLabel(pct) {
  if (pct >= 100) return '✅ Cuota 100% cubierta por SebaPro'
  if (pct >= 50)  return '⚠️ Cuota parcialmente cubierta'
  return '🔴 Cuota pendiente — sigue completando tareas'
}

export default function EstadoFinanciero({ montoCuota, creditoAcumulado, restante, porcentaje }) {
  const color = getSemaforoClass(porcentaje)

  return (
    <div className="card financial-card">
      <div className="card-title">
        💰 Mi Estado Financiero Actual
      </div>

      {/* Semáforo / barra de progreso */}
      <div className="semaforo-wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#636e72' }}>
            Progreso del Arancel Mensual
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: color === 'green' ? '#00b894' : color === 'yellow' ? '#e67e22' : '#e17055' }}>
            {porcentaje}%
          </span>
        </div>
        <div className="semaforo-track">
          <div
            className={`semaforo-fill ${color}`}
            style={{ width: `${Math.min(porcentaje, 100)}%` }}
          >
            {porcentaje >= 20 && (
              <span className="semaforo-fill-label">{porcentaje}%</span>
            )}
          </div>
        </div>
        <div className="semaforo-labels">
          <span>0%</span>
          <span style={{ fontSize: 10, color: '#636e72' }}>{getSemaforoLabel(porcentaje)}</span>
          <span>100%</span>
        </div>
      </div>

      {/* Montos */}
      <div className="amounts-grid">
        <div className="amount-box">
          <div className="amount-box-label">Monto Original de la Cuota</div>
          <div className="amount-box-value original">
            ${montoCuota.toLocaleString('es-CL')} CLP
          </div>
        </div>
        <div className="amount-box" style={{ background: '#d1e7dd' }}>
          <div className="amount-box-label">Monto Acumulado por SebaPro<br/>(Nota de Crédito Automática)</div>
          <div className="amount-box-value acumulado">
            ${creditoAcumulado.toLocaleString('es-CL')} CLP
          </div>
        </div>
        <div className="amount-box" style={{ background: '#fff3cd' }}>
          <div className="amount-box-label">Monto Restante a Pagar</div>
          <div className="amount-box-value restante">
            ${restante.toLocaleString('es-CL')} CLP
          </div>
        </div>
      </div>
    </div>
  )
}
