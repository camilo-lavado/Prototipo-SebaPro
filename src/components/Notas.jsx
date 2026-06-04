import { useState } from 'react'
import {
  ChartBarIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid'
import { useUser } from '../context/UserContext'

function NotaCell({ value }) {
  if (value===null) return <span style={{ color:'var(--text-3)',fontSize:11 }}>—</span>
  const color = value>=5.5?'var(--green-600)':value>=4.0?'#D97706':'#DC2626'
  return <span style={{ fontWeight:800, color, fontSize:13 }}>{value.toFixed(1)}</span>
}

function prom(n) { return ((n.c1+n.c2)/2) }

export default function Notas() {
  const { currentUser } = useUser()
  const { notas, nombre } = currentUser
  const [semestre, setSemestre] = useState('1° Semestre 2026')

  const promParcial = (notas.reduce((a,n)=>a+prom(n),0)/notas.length).toFixed(1)
  const aprobadas   = notas.filter(n=>prom(n)>=4.0).length
  const enRiesgo    = notas.filter(n=>prom(n)<4.0).length

  const kpis = [
    { label:'Promedio parcial', value:promParcial, Icon: ChartBarIcon,     bg:'var(--green-50)', border:'var(--green-100)', color:'var(--green-800)' },
    { label:'Aprobadas',        value:`${aprobadas}/${notas.length}`, Icon: CheckCircleSolid, bg:'#E6F5ED', border:'#B3DFC5', color:'var(--green-700)' },
    { label:'En riesgo',        value:enRiesgo,    Icon: ExclamationTriangleIcon, bg:'#FFFBEB', border:'#FCD34D', color:'#92400E' },
  ]

  return (
    <div className="content-area" style={{ gridTemplateColumns:'1fr 1fr 1fr' }}>

      {/* Header */}
      <div className="card col-full" style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontSize:17, fontWeight:800, color:'var(--text-1)' }}>Historial de Notas</div>
          <div style={{ fontSize:12, color:'var(--text-2)', marginTop:2 }}>{nombre}</div>
        </div>
        <select value={semestre} onChange={e=>setSemestre(e.target.value)} style={{ padding:'8px 12px', borderRadius:8, border:'1.5px solid var(--border)', fontSize:12, fontFamily:'inherit', color:'var(--green-800)', fontWeight:700, background:'white' }}>
          <option>1° Semestre 2026</option>
          <option>2° Semestre 2025</option>
          <option>1° Semestre 2025</option>
        </select>
      </div>

      {/* KPIs */}
      {kpis.map(({ label, value, Icon, bg, border, color }) => (
        <div key={label} className="card" style={{ textAlign:'center', background:bg, border:`1.5px solid ${border}` }}>
          <div style={{ display:'flex', justifyContent:'center', marginBottom:4 }}>
            <Icon style={{ width:28, height:28, color }} />
          </div>
          <div style={{ fontSize:26, fontWeight:900, color, margin:'6px 0' }}>{value}</div>
          <div style={{ fontSize:11, color:'var(--text-2)', fontWeight:600 }}>{label}</div>
        </div>
      ))}

      {/* Tabla */}
      <div className="card col-full">
        <div className="card-title">
          <DocumentTextIcon style={{ width:20, height:20, display:'inline', verticalAlign:'middle', marginRight:6 }} />
          Calificaciones — {semestre}
        </div>
        <table className="data-table">
          <thead><tr>
            {['Asignatura','C1','C2','Prom.','Examen','Final','Estado'].map(h=>(
              <th key={h} style={{ textAlign:h==='Asignatura'?'left':'center' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {notas.map((n,i)=>{
              const p = prom(n)
              return (
                <tr key={i}>
                  <td style={{ fontWeight:600 }}>{n.asignatura}</td>
                  <td style={{ textAlign:'center' }}><NotaCell value={n.c1} /></td>
                  <td style={{ textAlign:'center' }}><NotaCell value={n.c2} /></td>
                  <td style={{ textAlign:'center' }}>
                    <span style={{ fontWeight:800, fontSize:13, color:p>=5.5?'var(--green-600)':p>=4.0?'#D97706':'#DC2626' }}>{p.toFixed(1)}</span>
                  </td>
                  <td style={{ textAlign:'center' }}><NotaCell value={n.examen} /></td>
                  <td style={{ textAlign:'center' }}><span style={{ fontSize:10,color:'var(--text-3)' }}>Pendiente</span></td>
                  <td style={{ textAlign:'center' }}>
                    <span className={`badge ${n.estado==='en riesgo'?'congelada':n.estado==='en curso'?'ejecucion':'finalizada'}`}>
                      {n.estado==='en riesgo'
                        ? <><ExclamationTriangleIcon style={{ width:12, height:12, display:'inline', verticalAlign:'middle', marginRight:3 }} />Riesgo</>
                        : n.estado==='en curso' ? 'En curso' : 'Aprobada'
                      }
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div style={{ marginTop:10, padding:'9px 12px', background:'var(--green-50)', borderRadius:8, fontSize:11, color:'var(--text-2)', display:'flex', alignItems:'center', gap:5 }}>
          <LightBulbIcon style={{ width:14, height:14, flexShrink:0 }} />
          Ponderación: C1 (30%) + C2 (30%) + Examen Final (40%). Nota mínima: 4.0
        </div>
      </div>

      {/* Gráfico */}
      <div className="card col-full">
        <div className="card-title">
          <ArrowTrendingUpIcon style={{ width:20, height:20, display:'inline', verticalAlign:'middle', marginRight:6 }} />
          Evolución por Asignatura
        </div>
        <div style={{ display:'flex', gap:16, alignItems:'flex-end', padding:'8px 0', overflowX:'auto' }}>
          {notas.map((n,i)=>{
            const p=prom(n), hPct=(p/7)*100
            const color=p>=5.5?'var(--green-600)':p>=4.0?'var(--green-400)':'#EF4444'
            return (
              <div key={i} style={{ flex:1, minWidth:80, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <span style={{ fontSize:12, fontWeight:800, color }}>{p.toFixed(1)}</span>
                <div style={{ width:'100%', maxWidth:50, height:110, background:'var(--green-50)', borderRadius:8, display:'flex', flexDirection:'column', justifyContent:'flex-end', overflow:'hidden' }}>
                  <div style={{ width:'100%', height:`${hPct}%`, background:color, borderRadius:'8px 8px 0 0', transition:'height .6s' }} />
                </div>
                <div style={{ display:'flex', gap:3 }}>
                  {[n.c1,n.c2].map((c,j)=>(
                    <span key={j} style={{ fontSize:9, background:'var(--green-100)', padding:'2px 4px', borderRadius:3, color:'var(--green-800)', fontWeight:700 }}>C{j+1}: {c}</span>
                  ))}
                </div>
                <span style={{ fontSize:9, color:'var(--text-2)', textAlign:'center', lineHeight:1.3, maxWidth:80 }}>
                  {n.asignatura.split(' ').slice(0,2).join(' ')}
                </span>
              </div>
            )
          })}
        </div>
        <div style={{ display:'flex', gap:16, marginTop:10, justifyContent:'center' }}>
          {[['var(--green-600)','≥ 5.5 Excelente'],['var(--green-400)','≥ 4.0 Aprobado'],['#EF4444','< 4.0 Reprobado']].map(([c,l])=>(
            <div key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, color:'var(--text-2)' }}>
              <div style={{ width:10, height:10, borderRadius:2, background:c }} />{l}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
