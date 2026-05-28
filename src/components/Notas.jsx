import { useState } from 'react'
import { useUser } from '../context/UserContext'

function NotaCell({ value }) {
  if (value === null) return <span style={{ color: '#b2bec3', fontSize: 11 }}>—</span>
  const color = value >= 4.0 ? (value >= 5.5 ? '#00b894' : '#e67e22') : '#e17055'
  return <span style={{ fontWeight: 700, color, fontSize: 13 }}>{value.toFixed(1)}</span>
}

function promedioC1C2(nota) {
  return ((nota.c1 + nota.c2) / 2).toFixed(1)
}

function notaFinal(nota) {
  if (nota.examen === null) return null
  return ((nota.c1 + nota.c2) / 2 * 0.6 + nota.examen * 0.4).toFixed(1)
}

export default function Notas() {
  const { currentUser } = useUser()
  const { notas, nombre } = currentUser
  const [semestre, setSemestre] = useState('1° Semestre 2026')

  const promedioParcial = (notas.reduce((a, n) => a + (n.c1 + n.c2) / 2, 0) / notas.length).toFixed(1)
  const aprobadas = notas.filter(n => parseFloat(promedioC1C2(n)) >= 4.0).length
  const enRiesgo = notas.filter(n => parseFloat(promedioC1C2(n)) < 4.0).length

  return (
    <div className="content-area" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>

      {/* Encabezado */}
      <div className="card" style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0f3460' }}>Historial de Notas</div>
          <div style={{ fontSize: 12, color: '#636e72', marginTop: 2 }}>{nombre}</div>
        </div>
        <select
          value={semestre}
          onChange={e => setSemestre(e.target.value)}
          style={{ padding: '7px 12px', borderRadius: 8, border: '1.5px solid #dfe6e9', fontSize: 12, fontFamily: 'inherit', color: '#0f3460', fontWeight: 600, background: 'white' }}
        >
          <option>1° Semestre 2026</option>
          <option>2° Semestre 2025</option>
          <option>1° Semestre 2025</option>
        </select>
      </div>

      {/* Indicadores rápidos */}
      {[
        { label: 'Promedio parcial', value: promedioParcial, icon: '📊', bg: '#e8f4fd', color: '#0984e3' },
        { label: 'Asignaturas aprobadas', value: `${aprobadas}/${notas.length}`, icon: '✅', bg: '#d1e7dd', color: '#00b894' },
        { label: 'En riesgo de reprobación', value: enRiesgo, icon: '⚠️', bg: '#fff3cd', color: '#e67e22' },
      ].map(s => (
        <div key={s.label} className="card" style={{ textAlign: 'center', background: s.bg, border: `1.5px solid ${s.color}22` }}>
          <div style={{ fontSize: 28 }}>{s.icon}</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: s.color, margin: '4px 0' }}>{s.value}</div>
          <div style={{ fontSize: 11, color: '#636e72', fontWeight: 500 }}>{s.label}</div>
        </div>
      ))}

      {/* Tabla de notas */}
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <div className="card-title">📝 Detalle de Calificaciones — {semestre}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Asignatura', 'Certamen 1', 'Certamen 2', 'Prom. Parcial', 'Examen Final', 'Nota Final', 'Estado'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: h === 'Asignatura' ? 'left' : 'center', fontSize: 10, fontWeight: 700, color: '#636e72', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {notas.map((n, i) => {
              const prom = parseFloat(promedioC1C2(n))
              const final = notaFinal(n)
              const aprobada = prom >= 4.0
              return (
                <tr key={i} style={{ borderBottom: '1px solid #f0f2f5' }}>
                  <td style={{ padding: '11px 12px', fontWeight: 600, color: '#2d3436' }}>{n.asignatura}</td>
                  <td style={{ padding: '11px 12px', textAlign: 'center' }}><NotaCell value={n.c1} /></td>
                  <td style={{ padding: '11px 12px', textAlign: 'center' }}><NotaCell value={n.c2} /></td>
                  <td style={{ padding: '11px 12px', textAlign: 'center' }}>
                    <span style={{
                      fontWeight: 700, fontSize: 13,
                      color: prom >= 5.5 ? '#00b894' : prom >= 4.0 ? '#e67e22' : '#e17055',
                    }}>{prom.toFixed(1)}</span>
                  </td>
                  <td style={{ padding: '11px 12px', textAlign: 'center' }}><NotaCell value={n.examen} /></td>
                  <td style={{ padding: '11px 12px', textAlign: 'center' }}>
                    {final ? <NotaCell value={parseFloat(final)} /> : <span style={{ fontSize: 10, color: '#b2bec3' }}>Pendiente</span>}
                  </td>
                  <td style={{ padding: '11px 12px', textAlign: 'center' }}>
                    <span className={`badge ${n.estado === 'en riesgo' ? 'congelada' : n.estado === 'en curso' ? 'ejecucion' : 'finalizada'}`}>
                      {n.estado === 'en riesgo' ? '⚠️ En riesgo' : n.estado === 'en curso' ? 'En curso' : 'Aprobada'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div style={{ marginTop: 12, padding: '10px 12px', background: '#f8f9fa', borderRadius: 8, fontSize: 11, color: '#636e72' }}>
          💡 Ponderación: Certamen 1 (30%) + Certamen 2 (30%) + Examen Final (40%). Nota mínima de aprobación: 4.0
        </div>
      </div>

      {/* Gráfico simple de barras */}
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <div className="card-title">📈 Evolución de Notas por Asignatura</div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', padding: '10px 0', overflowX: 'auto' }}>
          {notas.map((n, i) => {
            const prom = (n.c1 + n.c2) / 2
            const heightPct = (prom / 7) * 100
            const color = prom >= 5.5 ? '#00b894' : prom >= 4.0 ? '#0984e3' : '#e17055'
            return (
              <div key={i} style={{ flex: 1, minWidth: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color }}>{prom.toFixed(1)}</span>
                <div style={{ width: '100%', maxWidth: 50, height: 120, background: '#f0f2f5', borderRadius: 6, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: `${heightPct}%`, background: color, borderRadius: '6px 6px 0 0', transition: 'height 0.6s' }} />
                </div>
                {/* C1 y C2 mini */}
                <div style={{ display: 'flex', gap: 3 }}>
                  {[n.c1, n.c2].map((c, j) => (
                    <span key={j} style={{ fontSize: 9, background: '#f0f2f5', padding: '2px 4px', borderRadius: 3, color: '#636e72', fontWeight: 600 }}>
                      C{j + 1}: {c}
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: 9, color: '#636e72', textAlign: 'center', lineHeight: 1.3, maxWidth: 80 }}>
                  {n.asignatura.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 10, justifyContent: 'center' }}>
          {[['#00b894', '≥ 5.5 Excelente'], ['#0984e3', '≥ 4.0 Aprobado'], ['#e17055', '< 4.0 Reprobado']].map(([c, l]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#636e72' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
              {l}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
