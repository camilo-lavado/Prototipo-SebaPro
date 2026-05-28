// Donut SVG helper
function Donut({ pct, size = 110, stroke = 14 }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  const color = pct >= 100 ? '#2E7D52' : pct >= 50 ? '#3A9E68' : '#F39C12'

  return (
    <svg width={size} height={size} className="donut-svg" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E6F5ED" strokeWidth={stroke} />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)' }}
      />
    </svg>
  )
}

const LEGEND_COLORS = ['#1A5C38', '#3A9E68', '#7FDBA4']

export default function EstadoFinanciero({ montoCuota, creditoAcumulado, restante, porcentaje }) {
  const categorias = [
    { nombre: 'Micro-tareas campus', valor: Math.round(creditoAcumulado * 0.45) },
    { nombre: 'Tutorías académicas', valor: Math.round(creditoAcumulado * 0.35) },
    { nombre: 'Servicios externos', valor: Math.round(creditoAcumulado * 0.20) },
  ]

  const statusLabel = porcentaje >= 100
    ? '✅ Arancel completamente cubierto'
    : porcentaje >= 50
    ? '⚡ Más de la mitad cubierto'
    : '⏳ Sigue completando tareas'

  return (
    <div className="card col-full">
      <div className="card-title">💰 Mis Créditos</div>

      <div style={{ display: 'flex', gap: 20, alignItems: 'stretch', flexWrap: 'wrap' }}>

        {/* Tarjeta verde hero */}
        <div className="hero-card" style={{ flex: '1 1 220px', minWidth: 200 }}>
          <div className="hero-label">Total acumulado por SebaPro</div>
          <div className="hero-amount">${creditoAcumulado.toLocaleString('es-CL')}</div>
          <div className="hero-sub" style={{ marginBottom: 16 }}>Nota de crédito automática · {statusLabel}</div>
          <div className="progress-bar-wrap">
            <div className="progress-track" style={{ flex: 1 }}>
              <div className="progress-fill" style={{ width: `${Math.min(porcentaje, 100)}%` }} />
            </div>
            <span className="progress-pct">{porcentaje}%</span>
          </div>
        </div>

        {/* Donut chart */}
        <div style={{ flex: '1 1 200px', minWidth: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
          <div className="donut-wrap">
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <Donut pct={porcentaje} />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <div className="donut-pct">{porcentaje}%</div>
                <div className="donut-pct-label">cubierto</div>
              </div>
            </div>
            <div className="donut-legend">
              {categorias.map((c, i) => (
                <div key={c.nombre} className="legend-row">
                  <div className="legend-dot" style={{ background: LEGEND_COLORS[i] }} />
                  <span className="legend-name">{c.nombre}</span>
                  <span className="legend-val">${c.valor.toLocaleString('es-CL')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen numérico */}
        <div style={{ flex: '1 1 180px', minWidth: 160, display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: 0.6 }}>
            Resumen del mes
          </div>
          {[
            { label: 'Cuota mensual', val: `$${montoCuota.toLocaleString('es-CL')}`, color: 'var(--text-2)' },
            { label: 'Abonado por SebaPro', val: `$${creditoAcumulado.toLocaleString('es-CL')}`, color: 'var(--green-700)' },
            { label: 'Restante a pagar', val: `$${restante.toLocaleString('es-CL')}`, color: restante === 0 ? 'var(--green-700)' : '#C47F00' },
          ].map(r => (
            <div key={r.label} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '8px 12px', background: 'var(--green-50)',
              borderRadius: 8, alignItems: 'center',
            }}>
              <span style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 500 }}>{r.label}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: r.color }}>{r.val}</span>
            </div>
          ))}
          {restante === 0 && (
            <div style={{ background: '#E6F5ED', border: '1px solid #B3DFC5', borderRadius: 8, padding: '8px 12px', fontSize: 11, color: '#0A3622', fontWeight: 600, textAlign: 'center' }}>
              🎉 ¡Arancel completamente cubierto!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
