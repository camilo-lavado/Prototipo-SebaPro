import { useUser } from '../context/UserContext'

function AsistBar({ pct }) {
  const color = pct >= 85 ? 'var(--green-600)' : pct >= 75 ? '#F59E0B' : '#EF4444'
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      <div style={{ flex:1, height:7, background:'var(--green-100)', borderRadius:4, overflow:'hidden' }}>
        <div style={{ width:`${pct}%`, height:'100%', background:color, borderRadius:4, transition:'width .6s' }} />
      </div>
      <span style={{ fontSize:11, fontWeight:700, color, minWidth:32 }}>{pct}%</span>
    </div>
  )
}

export default function Academia() {
  const { currentUser } = useUser()
  const { asignaturas, nombre, carrera, nivel, rut } = currentUser
  const promAsist = Math.round(asignaturas.reduce((a,s)=>a+s.asistencia,0)/asignaturas.length)
  const totalCred = asignaturas.reduce((a,s)=>a+s.creditos,0)

  return (
    <div className="content-area" style={{ gridTemplateColumns:'1fr 1fr 1fr' }}>

      {/* Ficha */}
      <div className="card col-full" style={{ display:'flex', gap:20, alignItems:'center' }}>
        <div style={{
          width:68, height:68, borderRadius:'50%', flexShrink:0,
          background:`linear-gradient(135deg, ${currentUser.color}, var(--green-800))`,
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'white', fontSize:24, fontWeight:900,
        }}>{currentUser.iniciales}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:18, fontWeight:800, color:'var(--text-1)' }}>{nombre}</div>
          <div style={{ fontSize:13, color:'var(--text-2)', marginTop:2 }}>{carrera} · {nivel}</div>
          <div style={{ fontSize:11, color:'var(--text-3)', marginTop:2 }}>RUT {rut} · Jornada {currentUser.jornada}</div>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          {[['📚',asignaturas.length,'Asignaturas'],['🏅',totalCred,'Créditos'],[`${promAsist}%`,null,'Asistencia prom.']].map(([v,n,l])=>(
            <div key={l} className="stat-box" style={{ minWidth:90 }}>
              <div className="stat-box-value">{n ?? v}</div>
              <div className="stat-box-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla asignaturas */}
      <div className="card col-full">
        <div className="card-title">📚 Asignaturas del Semestre Actual</div>
        <table className="data-table">
          <thead><tr>
            {['Código','Asignatura','Docente','Horario','Cred.','Asistencia'].map(h=>(
              <th key={h}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {asignaturas.map(a=>(
              <tr key={a.codigo}>
                <td style={{ fontFamily:'monospace', color:'var(--green-700)', fontWeight:700, fontSize:11 }}>{a.codigo}</td>
                <td style={{ fontWeight:600 }}>{a.nombre}</td>
                <td style={{ color:'var(--text-2)' }}>{a.docente}</td>
                <td style={{ color:'var(--text-2)', fontSize:11 }}>{a.horario}</td>
                <td style={{ textAlign:'center', fontWeight:700, color:'var(--green-800)' }}>{a.creditos}</td>
                <td style={{ minWidth:130 }}><AsistBar pct={a.asistencia} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alertas */}
      <div className="card">
        <div className="card-title">⚠️ Alertas Académicas</div>
        {asignaturas.filter(a=>a.asistencia<80).length===0 ? (
          <div style={{ textAlign:'center', padding:'20px 0', color:'var(--green-600)' }}>
            <div style={{ fontSize:36 }}>✅</div>
            <div style={{ fontWeight:700, marginTop:8, fontSize:13 }}>Sin alertas activas</div>
            <div style={{ fontSize:11, color:'var(--text-2)', marginTop:4 }}>Asistencia en buen estado</div>
          </div>
        ) : asignaturas.filter(a=>a.asistencia<80).map(a=>(
          <div key={a.codigo} style={{ display:'flex', gap:10, padding:'10px 12px', background:'#FFFBEB', borderRadius:8, border:'1px solid #FCD34D', marginBottom:8 }}>
            <span style={{ fontSize:18 }}>⚠️</span>
            <div>
              <div style={{ fontWeight:600, fontSize:12 }}>{a.nombre}</div>
              <div style={{ fontSize:11, color:'#78350F', marginTop:2 }}>Asistencia: {a.asistencia}% — Mínimo: 80%</div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="card">
        <div className="card-title">📊 Resumen del Período</div>
        {[
          ['Año académico','2026'],['Semestre','1° sem. 2026'],
          ['Fecha inicio','03/03/2026'],['Fecha término','11/07/2026'],
          ['Semanas de clases','18 semanas'],['Próximos exámenes','19 – 28 mayo'],
        ].map(([l,v])=>(
          <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid var(--green-50)', fontSize:12 }}>
            <span style={{ color:'var(--text-2)', fontWeight:500 }}>{l}</span>
            <span style={{ fontWeight:700, color:'var(--green-800)' }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Progreso semestre */}
      <div className="card">
        <div className="card-title">🗓 Progreso del Semestre</div>
        {(()=>{
          const total=18, curr=11, pct=Math.round(curr/total*100)
          return (<>
            <div style={{ fontSize:12, color:'var(--text-2)', marginBottom:8 }}>Semana {curr} de {total} — {pct}% completado</div>
            <div style={{ height:12, background:'var(--green-100)', borderRadius:6, overflow:'hidden', marginBottom:14 }}>
              <div style={{ width:`${pct}%`, height:'100%', background:'linear-gradient(90deg,var(--green-700),var(--green-500))', borderRadius:6 }} />
            </div>
            {[['Certamen 1',4,true],['Certamen 2',9,true],['Exámenes finales',14,false],['Cierre de actas',18,false]].map(([h,s,done])=>(
              <div key={h} style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 0', borderBottom:'1px solid var(--green-50)', fontSize:12 }}>
                <span>{done?'✅':'🔲'}</span>
                <span style={{ flex:1, fontWeight:done?700:400, color:done?'var(--green-800)':'var(--text-2)' }}>{h}</span>
                <span style={{ fontSize:10, color:'var(--text-3)' }}>Sem. {s}</span>
              </div>
            ))}
          </>)
        })()}
      </div>

    </div>
  )
}
