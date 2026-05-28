import { useUser } from '../context/UserContext'

function AsistenciaBar({ pct }) {
  const color = pct >= 85 ? '#00b894' : pct >= 75 ? '#fdcb6e' : '#e17055'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 8, background: '#e9ecef', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.6s' }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, minWidth: 32 }}>{pct}%</span>
    </div>
  )
}

export default function Academia() {
  const { currentUser } = useUser()
  const { asignaturas, nombre, carrera, nivel, rut } = currentUser

  const promedioAsistencia = Math.round(asignaturas.reduce((a, s) => a + s.asistencia, 0) / asignaturas.length)
  const totalCreditos = asignaturas.reduce((a, s) => a + s.creditos, 0)

  return (
    <div className="content-area" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>

      {/* Ficha Estudiante */}
      <div className="card" style={{ gridColumn: '1 / -1', display: 'flex', gap: 24, alignItems: 'center' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, ${currentUser.color}, #0f3460)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 24, fontWeight: 800,
        }}>
          {currentUser.iniciales}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0f3460' }}>{nombre}</div>
          <div style={{ fontSize: 13, color: '#636e72', marginTop: 2 }}>{carrera} · {nivel}</div>
          <div style={{ fontSize: 11, color: '#b2bec3', marginTop: 2 }}>RUT {rut} · Jornada {currentUser.jornada}</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { label: 'Asignaturas', value: asignaturas.length },
            { label: 'Créditos', value: totalCreditos },
            { label: 'Asistencia prom.', value: `${promedioAsistencia}%` },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '10px 18px', background: '#f8f9fa', borderRadius: 10 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0f3460' }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#636e72', fontWeight: 500, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Estado del Semestre */}
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <div className="card-title">📚 Asignaturas del Semestre Actual</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Código', 'Asignatura', 'Docente', 'Horario', 'Créditos', 'Asistencia'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#636e72', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {asignaturas.map(a => (
              <tr key={a.codigo} style={{ borderBottom: '1px solid #f0f2f5' }}>
                <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 11, color: '#0984e3', fontWeight: 600 }}>{a.codigo}</td>
                <td style={{ padding: '10px 12px', fontWeight: 600, color: '#2d3436' }}>{a.nombre}</td>
                <td style={{ padding: '10px 12px', color: '#636e72' }}>{a.docente}</td>
                <td style={{ padding: '10px 12px', color: '#636e72', fontSize: 11 }}>{a.horario}</td>
                <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: '#0f3460' }}>{a.creditos}</td>
                <td style={{ padding: '10px 12px', minWidth: 130 }}>
                  <AsistenciaBar pct={a.asistencia} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Semáforo Asistencia */}
      <div className="card">
        <div className="card-title">⚠️ Alertas Académicas</div>
        {asignaturas.filter(a => a.asistencia < 80).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#00b894' }}>
            <div style={{ fontSize: 32 }}>✅</div>
            <div style={{ fontWeight: 600, marginTop: 8, fontSize: 13 }}>Sin alertas activas</div>
            <div style={{ fontSize: 11, color: '#636e72', marginTop: 4 }}>Asistencia en buen estado</div>
          </div>
        ) : (
          asignaturas.filter(a => a.asistencia < 80).map(a => (
            <div key={a.codigo} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              padding: '10px 12px', background: '#fff3cd', borderRadius: 8, marginBottom: 8,
              border: '1px solid #ffc107',
            }}>
              <span style={{ fontSize: 18 }}>⚠️</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 12 }}>{a.nombre}</div>
                <div style={{ fontSize: 11, color: '#664d03', marginTop: 2 }}>
                  Asistencia: {a.asistencia}% — Mínimo requerido: 80%
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resumen rápido */}
      <div className="card">
        <div className="card-title">📊 Resumen del Período</div>
        {[
          { label: 'Año académico', value: '2026' },
          { label: 'Semestre', value: '1° semestre 2026' },
          { label: 'Fecha inicio', value: '03 de marzo 2026' },
          { label: 'Fecha término', value: '11 de julio 2026' },
          { label: 'Semanas de clases', value: '18 semanas' },
          { label: 'Próximos exámenes', value: '19 – 28 de mayo' },
        ].map(r => (
          <div key={r.label} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '7px 0', borderBottom: '1px solid #f0f2f5',
            fontSize: 12,
          }}>
            <span style={{ color: '#636e72', fontWeight: 500 }}>{r.label}</span>
            <span style={{ fontWeight: 700, color: '#0f3460' }}>{r.value}</span>
          </div>
        ))}
      </div>

      {/* Progreso del período */}
      <div className="card">
        <div className="card-title">🗓 Progreso del Semestre</div>
        {(() => {
          const total = 18, transcurridas = 11
          const pct = Math.round((transcurridas / total) * 100)
          return (
            <>
              <div style={{ fontSize: 12, color: '#636e72', marginBottom: 10 }}>
                Semana {transcurridas} de {total} — {pct}% completado
              </div>
              <div style={{ height: 16, background: '#e9ecef', borderRadius: 8, overflow: 'hidden', marginBottom: 14 }}>
                <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #0f3460, #0984e3)', borderRadius: 8 }} />
              </div>
              <div style={{ fontSize: 11, color: '#636e72', fontWeight: 500 }}>Hitos del semestre:</div>
              {[
                { hito: 'Certamen 1', semana: 4, done: true },
                { hito: 'Certamen 2', semana: 9, done: true },
                { hito: 'Exámenes finales', semana: 14, done: false },
                { hito: 'Cierre de actas', semana: 18, done: false },
              ].map(h => (
                <div key={h.hito} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 0', fontSize: 12, borderBottom: '1px solid #f0f2f5',
                }}>
                  <span>{h.done ? '✅' : '🔲'}</span>
                  <span style={{ flex: 1, color: h.done ? '#0a3622' : '#636e72', fontWeight: h.done ? 600 : 400 }}>{h.hito}</span>
                  <span style={{ fontSize: 10, color: '#b2bec3' }}>Sem. {h.semana}</span>
                </div>
              ))}
            </>
          )
        })()}
      </div>

    </div>
  )
}
