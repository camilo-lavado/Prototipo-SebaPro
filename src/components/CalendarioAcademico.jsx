import { useState } from 'react'

const DIAS  = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const EXAM_DAYS   = [19,20,21,26,27,28]
const FROZEN_DAYS = [18,19,20,21,22,25,26,27,28,29]

function firstDay(y, m) { const d = new Date(y,m,1).getDay(); return d===0?6:d-1 }
function daysIn(y,m)    { return new Date(y,m+1,0).getDate() }

export default function CalendarioAcademico({ onNotify }) {
  const [mes, setMes] = useState(4)
  const anio = 2026, hoy = 28

  const blanks = firstDay(anio, mes)
  const total  = daysIn(anio, mes)
  const celdas = [...Array(blanks).fill(null), ...Array.from({length:total},(_,i)=>i+1)]

  const isExamMes   = mes === 4
  const semCongelada = isExamMes && FROZEN_DAYS.includes(hoy)

  const getClass = d => {
    if (!d) return 'empty'
    if (d === hoy && mes === 4) return 'today'
    if (isExamMes && EXAM_DAYS.includes(d))   return 'exam'
    if (isExamMes && FROZEN_DAYS.includes(d)) return 'frozen'
    return ''
  }

  return (
    <div className="card col-full" style={{ gridColumn: '1 / -1' }}>
      <div className="card-title">📅 Calendario Académico</div>

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 12 }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setMes(p=>Math.max(p-1,0))}>‹</button>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-800)' }}>{MESES[mes]} {anio}</span>
        <button className="btn btn-secondary btn-sm" onClick={() => setMes(p=>Math.min(p+1,11))}>›</button>
      </div>

      <div className="cal-grid">
        {DIAS.map(d  => <div key={d}  className="cal-hdr">{d}</div>)}
        {celdas.map((d,i) => <div key={i} className={`cal-day ${getClass(d)}`}>{d||''}</div>)}
      </div>

      <div className="exam-legend">
        {[['var(--green-700)','Hoy'],['#FCA5A5','Semana de exámenes'],['#FDE68A','Tareas congeladas']].map(([c,l])=>(
          <div key={l} className="legend-item">
            <div className="legend-dot-sm" style={{ background: c }} />
            <span>{l}</span>
          </div>
        ))}
      </div>

      {semCongelada && (
        <div className="seguro-alert" style={{ marginTop: 12 }}>
          <span style={{ fontSize: 22 }}>🛡️</span>
          <div>
            <strong>Seguro de Carga Académica activado</strong><br />
            Semana de exámenes. La postulación a tareas está congelada automáticamente. ¡Concéntrate en tus notas!
          </div>
        </div>
      )}
    </div>
  )
}
