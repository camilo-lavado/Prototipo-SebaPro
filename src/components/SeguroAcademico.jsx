import { useUser } from '../context/UserContext'

const INCIDENTES = [
  { fecha:'2025-10-14', tipo:'Accidente en Campus', desc:'Caída en escalera — atención clínica IPSS', estado:'Cerrado', monto:'$85.000' },
  { fecha:'2026-03-02', tipo:'Consulta Telemedicina', desc:'Consulta médica general vía plataforma', estado:'Cerrado', monto:'$0 (incluido)' },
]

export default function SeguroAcademico() {
  const { currentUser } = useUser()
  const { seguro, nombre } = currentUser

  return (
    <div className="content-area" style={{ gridTemplateColumns:'1fr 1fr' }}>

      {/* Póliza hero */}
      <div className="col-full" style={{
        background:'linear-gradient(135deg,var(--green-900),var(--green-700))',
        borderRadius:20, padding:'22px 26px', color:'white',
        display:'flex', gap:20, alignItems:'center', boxShadow:'var(--shadow-lg)',
      }}>
        <span style={{ fontSize:48 }}>🛡️</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.5)',letterSpacing:1,textTransform:'uppercase',marginBottom:4 }}>Seguro Académico Activo</div>
          <div style={{ fontSize:20,fontWeight:900 }}>{seguro.tipo}</div>
          <div style={{ fontSize:12,color:'rgba(255,255,255,0.6)',marginTop:4 }}>{seguro.cobertura}</div>
        </div>
        <div style={{ textAlign:'right',flexShrink:0 }}>
          <div style={{ fontSize:10,color:'rgba(255,255,255,0.4)',marginBottom:2 }}>N° Póliza</div>
          <div style={{ fontFamily:'monospace',fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.85)' }}>{seguro.poliza}</div>
          <div style={{ fontSize:11,color:'rgba(255,255,255,0.4)',marginTop:6 }}>Vigente hasta {new Date(seguro.vigencia).toLocaleDateString('es-CL')}</div>
          <div style={{ marginTop:8,display:'inline-block',background:'var(--green-500)',color:'white',borderRadius:20,padding:'4px 14px',fontSize:11,fontWeight:700 }}>✓ ACTIVO</div>
        </div>
      </div>

      {/* Beneficios */}
      <div className="card">
        <div className="card-title">✅ Cobertura y Beneficios</div>
        {seguro.beneficios.map((b,i)=>(
          <div key={i} style={{ display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:'1px solid var(--green-50)' }}>
            <div style={{ width:28,height:28,borderRadius:'50%',flexShrink:0,background:b.activo?'var(--green-100)':'#F1F5F9',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14 }}>
              {b.activo?'✅':'⬜'}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13,fontWeight:600,color:b.activo?'var(--text-1)':'#94A3B8' }}>{b.nombre}</div>
              <div style={{ fontSize:11,fontWeight:700,color:b.activo?'var(--green-600)':'#94A3B8' }}>{b.monto}</div>
            </div>
            {!b.activo && <span style={{ fontSize:10,color:'#94A3B8',background:'#F1F5F9',padding:'3px 8px',borderRadius:8 }}>No incluido</span>}
          </div>
        ))}
        {seguro.beneficios.some(b=>!b.activo)&&(
          <div style={{ marginTop:12,padding:'10px 12px',background:'var(--green-50)',borderRadius:8,fontSize:11,color:'var(--green-800)',fontWeight:500 }}>
            💡 Completa tu perfil SebaPro para acceder a cobertura de micro-tareas externas.
          </div>
        )}
      </div>

      {/* Datos aseguradora */}
      <div className="card">
        <div className="card-title">🏢 Datos de la Aseguradora</div>
        {[
          ['Aseguradora',seguro.aseguradora],
          ['Tomador','Instituto Profesional San Sebastián'],
          ['Asegurado',nombre],
          ['Tipo de seguro',seguro.tipo],
          ['Vigencia desde','01/03/2026'],
          ['Vigencia hasta',new Date(seguro.vigencia).toLocaleDateString('es-CL')],
          ['Central de siniestros','600 123 4567'],
          ['Correo de contacto','seguros@sansebastian.cl'],
        ].map(([l,v])=>(
          <div key={l} style={{ display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:'1px solid var(--green-50)',fontSize:12 }}>
            <span style={{ color:'var(--text-2)',fontWeight:500 }}>{l}</span>
            <span style={{ fontWeight:700,color:'var(--green-800)',textAlign:'right',maxWidth:'60%' }}>{v}</span>
          </div>
        ))}
        <div style={{ marginTop:14,display:'flex',gap:8 }}>
          <button className="btn btn-primary btn-sm">📄 Descargar Póliza PDF</button>
          <button className="btn btn-outline btn-sm">📞 Declarar Siniestro</button>
        </div>
      </div>

      {/* Historial */}
      <div className="card col-full">
        <div className="card-title">📋 Historial de Uso del Seguro</div>
        <table className="data-table">
          <thead><tr>
            {['Fecha','Tipo de Evento','Descripción','Monto Cubierto','Estado'].map(h=><th key={h}>{h}</th>)}
          </tr></thead>
          <tbody>
            {INCIDENTES.map((inc,i)=>(
              <tr key={i}>
                <td style={{ fontFamily:'monospace',fontSize:11 }}>{new Date(inc.fecha).toLocaleDateString('es-CL')}</td>
                <td style={{ fontWeight:600 }}>{inc.tipo}</td>
                <td style={{ color:'var(--text-2)' }}>{inc.desc}</td>
                <td style={{ fontWeight:700,color:'var(--green-600)' }}>{inc.monto}</td>
                <td><span className="badge finalizada">{inc.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop:10,padding:'9px 12px',background:'var(--green-50)',borderRadius:8,fontSize:11,color:'var(--text-2)' }}>
          ⚠️ Para declarar un siniestro contacta a Bienestar Estudiantil o llama al 600 123 4567 (24/7).
        </div>
      </div>

    </div>
  )
}
