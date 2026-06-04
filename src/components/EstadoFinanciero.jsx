import { motion, useMotionValue, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BanknotesIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline'

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

function semaforoColor(pct) {
  if (pct >= 100) return { color: '#2E7D52', bg: '#E6F5ED', label: 'Verde', Icon: CheckCircleIcon, text: 'Cuota 100% cubierta por SebaPro' }
  if (pct > 0)   return { color: '#D97706', bg: '#FFFBEB', label: 'Amarillo', Icon: ExclamationTriangleIcon, text: 'Cuota parcialmente cubierta' }
  return                 { color: '#DC2626', bg: '#FEF2F2', label: 'Rojo', Icon: XCircleIcon, text: 'Cuota pendiente completa' }
}

// Semáforo real: carcasa oscura con 3 luces apiladas
function Semaforo({ pct }) {
  const isRojo     = pct === 0
  const isAmarillo = pct > 0 && pct < 100
  const isVerde    = pct >= 100

  const luz = (activa, colorOn, colorOff, label) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      {activa ? (
        <motion.div
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: colorOn,
            border: `2px solid ${colorOn}`,
          }}
          animate={{ boxShadow: [
            `0 0 10px 2px ${colorOn}60`,
            `0 0 22px 6px ${colorOn}99`,
            `0 0 10px 2px ${colorOn}60`,
          ]}}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : (
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: colorOff,
          border: '2px solid #374151',
        }} />
      )}
      <span style={{ fontSize: 8, fontWeight: 700, color: activa ? colorOn : '#4B5563', letterSpacing: 0.5, textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>
        Semáforo
      </div>
      {/* Carcasa */}
      <div style={{
        background: '#1F2937',
        borderRadius: 20,
        padding: '14px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        boxShadow: '0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        border: '2px solid #374151',
      }}>
        {luz(isRojo,     '#EF4444', '#450a0a', 'Rojo')}
        {luz(isAmarillo, '#F59E0B', '#451a03', 'Amarillo')}
        {luz(isVerde,    '#22C55E', '#052e16', 'Verde')}
      </div>
      {/* Pie */}
      <div style={{ width: 8, height: 14, background: '#374151', borderRadius: 2 }} />
      <div style={{ width: 28, height: 4, background: '#374151', borderRadius: 2 }} />
    </div>
  )
}

// Donut SVG helper
function Donut({ pct, size = 110, stroke = 14 }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  const color = pct >= 100 ? '#2E7D52' : pct > 0 ? '#D97706' : '#DC2626'

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

const SEMAFORO_STYLE = `
  .semaforo-widget {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
  }
  @media (max-width: 768px) {
    .semaforo-widget { display: none; }
  }
`

export default function EstadoFinanciero({ montoCuota, creditoAcumulado, restante, porcentaje }) {
  const animatedMontoCuota = useCountUp(montoCuota)
  const animatedCreditoAcumulado = useCountUp(creditoAcumulado)
  const animatedRestante = useCountUp(restante)
  const animatedHeroAmount = useCountUp(creditoAcumulado)

  const categorias = [
    { nombre: 'Micro-tareas campus', valor: Math.round(creditoAcumulado * 0.45) },
    { nombre: 'Tutorías académicas', valor: Math.round(creditoAcumulado * 0.35) },
    { nombre: 'Servicios externos', valor: Math.round(creditoAcumulado * 0.20) },
  ]

  const semaforo = semaforoColor(porcentaje)

  return (
    <><style>{SEMAFORO_STYLE}</style>
    <div className="card col-full">
      <div className="card-title"><BanknotesIcon style={{ width: 20, height: 20, display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Mi Estado Financiero · Semáforo del Arancel</div>

      {/* Banner semáforo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        padding: '10px 14px', borderRadius: 10, marginBottom: 16,
        background: semaforo.bg, border: `1.5px solid ${semaforo.color}40`,
        transition: 'background 0.5s',
      }}>
        <semaforo.Icon style={{ width: 26, height: 26, color: semaforo.color, flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: semaforo.color }}>{semaforo.label.toUpperCase()}</div>
          <div style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 500 }}>{semaforo.text}</div>
        </div>
      </div>

      {/* Fila superior: semáforo + hero + donut */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'stretch', flexWrap: 'wrap', marginBottom: 14 }}>

        {/* Semáforo */}
        <div className="semaforo-widget">
          <Semaforo pct={porcentaje} />
        </div>

        {/* Tarjeta verde hero */}
        <div className="hero-card" style={{ flex: '1 1 200px', minWidth: 180 }}>
          <div className="hero-label">Total acumulado por SebaPro</div>
          <div className="hero-amount">${animatedHeroAmount.toLocaleString('es-CL')}</div>
          <div className="hero-sub" style={{ marginBottom: 16 }}>Nota de Crédito Automática</div>
          <div className="progress-bar-wrap">
            <div className="progress-track" style={{ flex: 1 }}>
              <motion.div
                className="progress-fill"
                style={{ background: semaforo.color }}
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(porcentaje, 100)}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
            <span className="progress-pct">{porcentaje}%</span>
          </div>
        </div>

        {/* Donut — solo el gráfico, sin leyenda */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ position: 'relative' }}>
            <Donut pct={porcentaje} />
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <motion.div
                key={porcentaje}
                className="donut-pct"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.4 }}
              >{porcentaje}%</motion.div>
              <div className="donut-pct-label">cubierto</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fila inferior: leyenda + resumen */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

        {/* Leyenda de categorías */}
        <div style={{ background: 'var(--green-50)', borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 }}>
            Desglose por tipo
          </div>
          {categorias.map((c, i) => (
            <div key={c.nombre} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: LEGEND_COLORS[i], flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>{c.nombre}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-800)' }}>${c.valor.toLocaleString('es-CL')}</span>
            </div>
          ))}
        </div>

        {/* Resumen numérico */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: 0.6 }}>
            Resumen del mes
          </div>
          {[
            { label: 'Monto original cuota', val: `$${animatedMontoCuota.toLocaleString('es-CL')}`, color: 'var(--text-2)' },
            { label: 'Abonado por SebaPro',  val: `$${animatedCreditoAcumulado.toLocaleString('es-CL')}`, color: 'var(--green-700)' },
            { label: 'Restante a pagar',      val: `$${animatedRestante.toLocaleString('es-CL')}`, color: restante === 0 ? 'var(--green-700)' : semaforo.color },
          ].map(r => (
            <div key={r.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 12px', background: 'var(--green-50)', borderRadius: 8, gap: 8,
            }}>
              <span style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 500, flex: 1, minWidth: 0 }}>{r.label}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: r.color, flexShrink: 0 }}>{r.val}</span>
            </div>
          ))}
          {restante === 0 && (
            <div style={{ background: '#E6F5ED', border: '1px solid #B3DFC5', borderRadius: 8, padding: '8px 12px', fontSize: 11, color: '#0A3622', fontWeight: 600, textAlign: 'center' }}>
              ¡Arancel completamente cubierto!
            </div>
          )}
        </div>
      </div>{/* fin grid inferior */}
    </div>
    </>
  )
}
