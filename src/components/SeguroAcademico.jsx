import { useUser } from '../context/UserContext'

const INCIDENTES = [
  { fecha: '2025-10-14', tipo: 'Accidente en Campus', descripcion: 'Caída en escalera — atención médica en clínica IPSS', estado: 'Cerrado', monto: '$85.000' },
  { fecha: '2026-03-02', tipo: 'Consulta Telemedicina', descripcion: 'Consulta médica general vía plataforma', estado: 'Cerrado', monto: '$0 (incluido)' },
]

export default function SeguroAcademico() {
  const { currentUser } = useUser()
  const { seguro, nombre } = currentUser

  return (
    <div className="content-area" style={{ gridTemplateColumns: '1fr 1fr' }}>

      {/* Póliza */}
      <div className="card" style={{ gridColumn: '1 / -1', display: 'flex', gap: 20, alignItems: 'center', background: 'linear-gradient(135deg, #1a1a2e, #0f3460)', color: 'white' }}>
        <div style={{ fontSize: 48 }}>🛡️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: '#74b9ff', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Seguro Académico Activo</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>{seguro.tipo}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>{seguro.cobertura}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>N° Póliza</div>
          <div style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: '#74b9ff' }}>{seguro.poliza}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>Vigente hasta {new Date(seguro.vigencia).toLocaleDateString('es-CL')}</div>
          <div style={{
            marginTop: 8, display: 'inline-block', background: '#00b894',
            color: 'white', borderRadius: 20, padding: '4px 14px',
            fontSize: 11, fontWeight: 700,
          }}>✓ ACTIVO</div>
        </div>
      </div>

      {/* Beneficios */}
      <div className="card">
        <div className="card-title">✅ Cobertura y Beneficios</div>
        {seguro.beneficios.map((b, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 0', borderBottom: '1px solid #f0f2f5',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              background: b.activo ? '#d1e7dd' : '#f8f9fa',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14,
            }}>
              {b.activo ? '✅' : '⬜'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: b.activo ? '#2d3436' : '#adb5bd' }}>{b.nombre}</div>
              <div style={{ fontSize: 11, color: b.activo ? '#00b894' : '#adb5bd', fontWeight: 700 }}>{b.monto}</div>
            </div>
            {!b.activo && (
              <span style={{ fontSize: 10, color: '#adb5bd', background: '#f0f2f5', padding: '3px 8px', borderRadius: 8 }}>No incluido</span>
            )}
          </div>
        ))}

        {seguro.beneficios.some(b => !b.activo) && (
          <div style={{ marginTop: 12, padding: '10px 12px', background: '#e8f4fd', borderRadius: 8, fontSize: 11, color: '#0f3460', fontWeight: 500 }}>
            💡 Completa tu perfil SebaPro para acceder a cobertura de micro-tareas externas.
          </div>
        )}
      </div>

      {/* Datos aseguradora */}
      <div className="card">
        <div className="card-title">🏢 Datos de la Aseguradora</div>

        {[
          { label: 'Aseguradora', value: seguro.aseguradora },
          { label: 'Tomador', value: 'Instituto Profesional San Sebastián' },
          { label: 'Asegurado', value: nombre },
          { label: 'Tipo de seguro', value: seguro.tipo },
          { label: 'Vigencia desde', value: '01/03/2026' },
          { label: 'Vigencia hasta', value: new Date(seguro.vigencia).toLocaleDateString('es-CL') },
          { label: 'Central de siniestros', value: '600 123 4567' },
          { label: 'Correo de contacto', value: 'seguros@sansebastian.cl' },
        ].map(r => (
          <div key={r.label} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '7px 0', borderBottom: '1px solid #f0f2f5', fontSize: 12,
          }}>
            <span style={{ color: '#636e72', fontWeight: 500 }}>{r.label}</span>
            <span style={{ fontWeight: 700, color: '#0f3460', textAlign: 'right', maxWidth: '60%' }}>{r.value}</span>
          </div>
        ))}

        <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button style={{
            padding: '8px 14px', borderRadius: 8, border: 'none',
            background: 'linear-gradient(135deg, #0f3460, #0984e3)',
            color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>📄 Descargar Póliza PDF</button>
          <button style={{
            padding: '8px 14px', borderRadius: 8, border: '1.5px solid #0984e3',
            background: 'white', color: '#0984e3', fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>📞 Declarar Siniestro</button>
        </div>
      </div>

      {/* Historial siniestros */}
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <div className="card-title">📋 Historial de Uso del Seguro</div>
        {INCIDENTES.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#b2bec3', fontSize: 13 }}>
            Sin incidentes registrados
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                {['Fecha', 'Tipo de Evento', 'Descripción', 'Monto Cubierto', 'Estado'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#636e72', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INCIDENTES.map((inc, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f0f2f5' }}>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 11 }}>{new Date(inc.fecha).toLocaleDateString('es-CL')}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{inc.tipo}</td>
                  <td style={{ padding: '10px 12px', color: '#636e72' }}>{inc.descripcion}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#00b894' }}>{inc.monto}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ background: '#d1e7dd', color: '#0a3622', padding: '3px 10px', borderRadius: 10, fontSize: 10, fontWeight: 700 }}>
                      {inc.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div style={{ marginTop: 12, padding: '10px 12px', background: '#f8f9fa', borderRadius: 8, fontSize: 11, color: '#636e72' }}>
          ⚠️ Para declarar un nuevo siniestro, contacta a la unidad de bienestar estudiantil o llama al 600 123 4567 (24/7).
        </div>
      </div>

    </div>
  )
}
