const PROCESOS = [
  {
    titulo: '(1) Validación de Competencias',
    pasos: [
      { icon: '🎓', label: 'Habilidades del Estudiante' },
      { icon: '→', arrow: true },
      { icon: '👨‍💼', label: 'Director de Programa' },
      { icon: '→', arrow: true },
      { icon: '✅', label: 'Aprobado para Servicio' },
    ],
    color: '#e8f4fd',
  },
  {
    titulo: '(2) Ejecución de Tarea y Nota de Crédito',
    pasos: [
      { icon: '📋', label: 'Tarea Asignada' },
      { icon: '→', arrow: true },
      { icon: '👨‍💻', label: 'Ejecución Estudiante' },
      { icon: '→', arrow: true },
      { icon: '✍️', label: 'Pyme/IPSS Acepta' },
      { icon: '→', arrow: true },
      { icon: '📄', label: 'Nota de Crédito Generada' },
      { icon: '→', arrow: true },
      { icon: '🏦', label: 'Transferencia a Finanzas IPSS' },
    ],
    color: '#d1e7dd',
    note: '💡 El dinero nunca pasa por manos del estudiante',
  },
  {
    titulo: '(3) Seguro de Carga Académica',
    pasos: [
      { icon: '📅', label: 'Calendario Académico' },
      { icon: '→', arrow: true },
      { icon: '❓', label: '¿Semana de Exámenes?' },
      { icon: '→', arrow: true },
      { icon: '❄️', label: 'Congelar Asignación de Tareas' },
    ],
    color: '#fff3cd',
    note: '🛡️ El sistema protege automáticamente el rendimiento académico',
  },
]

export default function ProcesoConceptual() {
  return (
    <div className="card proceso-section">
      <div className="card-title">⚙️ Procesos Operativos del Sistema</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {PROCESOS.map((proc, i) => (
          <div
            key={i}
            style={{
              background: proc.color,
              borderRadius: 10,
              padding: '12px 14px',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0f3460', marginBottom: 10 }}>
              {proc.titulo}
            </div>
            <div className="proceso-row">
              {proc.pasos.map((paso, j) => (
                paso.arrow
                  ? <span key={j} className="proceso-arrow">›</span>
                  : (
                    <div key={j} className="proceso-node">
                      <div
                        className="proceso-icon"
                        style={{ background: 'rgba(255,255,255,0.7)' }}
                      >
                        {paso.icon}
                      </div>
                      <span className="proceso-node-label">{paso.label}</span>
                    </div>
                  )
              ))}
            </div>
            {proc.note && (
              <div style={{
                marginTop: 10,
                fontSize: 11,
                fontWeight: 500,
                color: '#664d03',
                background: 'rgba(255,255,255,0.6)',
                borderRadius: 6,
                padding: '5px 10px',
                display: 'inline-block',
              }}>
                {proc.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
