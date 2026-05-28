const PROCESOS = [
  {
    titulo: '(1) Validación de Competencias',
    pasos: [
      { icon: '🎓', label: 'Habilidades del estudiante' },
      { arrow: true },
      { icon: '👨‍💼', label: 'Director de programa' },
      { arrow: true },
      { icon: '✅', label: 'Aprobado para servicio' },
    ],
    bg: 'var(--green-50)', border: 'var(--green-100)',
  },
  {
    titulo: '(2) Ejecución de Tarea y Nota de Crédito',
    pasos: [
      { icon: '📋', label: 'Tarea asignada' },
      { arrow: true },
      { icon: '👨‍💻', label: 'Ejecución' },
      { arrow: true },
      { icon: '✍️', label: 'Pyme/IPSS acepta' },
      { arrow: true },
      { icon: '📄', label: 'Nota de crédito' },
      { arrow: true },
      { icon: '🏦', label: 'Finanzas IPSS' },
    ],
    bg: '#E6F5ED', border: '#B3DFC5',
    note: '💡 El dinero nunca pasa por manos del estudiante',
  },
  {
    titulo: '(3) Seguro de Carga Académica',
    pasos: [
      { icon: '📅', label: 'Calendario académico' },
      { arrow: true },
      { icon: '❓', label: '¿Semana de exámenes?' },
      { arrow: true },
      { icon: '❄️', label: 'Congelar tareas' },
    ],
    bg: '#FFFBEB', border: '#FCD34D',
    note: '🛡️ El sistema protege automáticamente el rendimiento académico',
  },
]

export default function ProcesoConceptual() {
  return (
    <div className="card proceso-section">
      <div className="card-title">⚙️ Procesos Operativos del Sistema</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PROCESOS.map((proc, i) => (
          <div key={i} style={{ background: proc.bg, border: `1px solid ${proc.border}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-800)', marginBottom: 12 }}>
              {proc.titulo}
            </div>
            <div className="proceso-row">
              {proc.pasos.map((paso, j) =>
                paso.arrow
                  ? <span key={j} className="proceso-arrow">›</span>
                  : (
                    <div key={j} className="proceso-node">
                      <div className="proceso-icon" style={{ background: 'rgba(255,255,255,0.8)' }}>
                        {paso.icon}
                      </div>
                      <span className="proceso-node-label">{paso.label}</span>
                    </div>
                  )
              )}
            </div>
            {proc.note && (
              <div style={{ marginTop: 10, fontSize: 11, fontWeight: 600, color: 'var(--green-800)', background: 'rgba(255,255,255,0.7)', borderRadius: 6, padding: '5px 10px', display: 'inline-block' }}>
                {proc.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
