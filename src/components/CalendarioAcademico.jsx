import { useState } from 'react'

const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

// Días de examen en mayo 2026
const EXAM_DAYS = [19, 20, 21, 26, 27, 28]
// Días congelados (sin tareas)
const FROZEN_DAYS = [18, 19, 20, 21, 22, 25, 26, 27, 28, 29]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  // 0=Dom, convertimos a Lun=0
  const d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1
}

export default function CalendarioAcademico({ onNotify }) {
  const [mes, setMes] = useState(4)  // Mayo = índice 4
  const [anio] = useState(2026)
  const hoy = 28  // día actual simulado

  const totalDias = getDaysInMonth(anio, mes)
  const primerDia = getFirstDayOfMonth(anio, mes)
  const isExamMes = mes === 4  // solo mayo tiene exámenes simulados

  const celdas = []
  for (let i = 0; i < primerDia; i++) {
    celdas.push(null)
  }
  for (let d = 1; d <= totalDias; d++) {
    celdas.push(d)
  }

  const getClass = (d) => {
    if (!d) return 'empty'
    if (d === hoy && mes === 4) return 'today'
    if (isExamMes && EXAM_DAYS.includes(d)) return 'exam'
    if (isExamMes && FROZEN_DAYS.includes(d)) return 'frozen'
    return ''
  }

  const semanaCongelada = isExamMes && FROZEN_DAYS.includes(hoy)

  return (
    <div className="card calendar-card" style={{ gridColumn: '1 / -1' }}>
      <div className="card-title">
        📅 Calendario Académico
      </div>

      <div className="calendar-header">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setMes(p => Math.max(p - 1, 0))}
        >
          ‹
        </button>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f3460' }}>
          {MESES[mes]} {anio}
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setMes(p => Math.min(p + 1, 11))}
        >
          ›
        </button>
      </div>

      <div className="cal-grid">
        {DIAS_SEMANA.map(d => (
          <div key={d} className="cal-hdr">{d}</div>
        ))}
        {celdas.map((d, i) => (
          <div key={i} className={`cal-day ${getClass(d)}`}>
            {d || ''}
          </div>
        ))}
      </div>

      <div className="exam-legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ background: '#0984e3' }} />
          <span>Hoy</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: '#fee2e2' }} />
          <span>Semana exámenes</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: '#fef3c7' }} />
          <span>Tareas congeladas</span>
        </div>
      </div>

      {semanaCongelada && (
        <div className="seguro-alert">
          <span style={{ fontSize: 20 }}>🛡️</span>
          <div>
            <strong>Seguro de Carga Académica activado</strong>
            <br />
            Esta semana es de exámenes. La postulación a nuevas tareas está congelada automáticamente. ¡Concéntrate en tus notas!
          </div>
        </div>
      )}
    </div>
  )
}
