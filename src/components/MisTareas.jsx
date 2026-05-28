import { useState } from 'react'

const TASK_ICONS = {
  'Soporte TI Pyme':         { icon: '💻', bg: '#E6F5ED', color: '#1A5C38' },
  'Tutoría Contabilidad':    { icon: '📊', bg: '#EEF2FF', color: '#3730A3' },
  'Digitalización de datos': { icon: '📂', bg: '#FFF7ED', color: '#C2410C' },
  'Diseño inventario Excel': { icon: '📋', bg: '#F0FDF4', color: '#166534' },
  'Control asistencia evento':{ icon: '📌', bg: '#FDF4FF', color: '#7E22CE' },
}

const INITIAL_TASKS = [
  { id: 1, tipo: 'Soporte TI Pyme',          modalidad: 'Presencial · Sede Centro', valor: 15000, estado: 'pendiente',  horas: 2   },
  { id: 2, tipo: 'Tutoría Contabilidad',      modalidad: 'Remoto · Plataforma IPSS', valor: 12000, estado: 'ejecucion', horas: 1.5 },
  { id: 3, tipo: 'Digitalización de datos',   modalidad: 'Presencial · Sede Centro', valor: 10000, estado: 'finalizada',horas: 1   },
  { id: 4, tipo: 'Diseño inventario Excel',   modalidad: 'Remoto · Plataforma IPSS', valor: 18000, estado: 'pendiente', horas: 2.5 },
  { id: 5, tipo: 'Control asistencia evento', modalidad: 'Presencial · Sede Centro', valor:  8000, estado: 'congelada', horas: 1   },
]

const ESTADO_LABEL = {
  pendiente:  'Disponible',
  ejecucion:  'En ejecución',
  finalizada: 'Completada',
  congelada:  '❄️ Congelada',
}

export default function MisTareas({ onCompletarTarea, onNotify }) {
  const [tasks, setTasks]       = useState(INITIAL_TASKS)
  const [showModal, setShowModal] = useState(false)
  const [nueva, setNueva]       = useState({ tipo: '', modalidad: 'Remoto · Plataforma IPSS', valor: '' })

  const horasCompletadas = tasks.reduce((a, t) => a + (t.estado === 'finalizada' ? t.horas : 0), 0)
  const horasActivas     = tasks.reduce((a, t) => a + (t.estado !== 'congelada'  ? t.horas : 0), 0)

  const iniciar   = id => { setTasks(p => p.map(t => t.id === id ? { ...t, estado: 'ejecucion'  } : t)); onNotify('Tarea iniciada. ¡Éxito!', '🚀') }
  const completar = id => { const t = tasks.find(x => x.id === id); setTasks(p => p.map(x => x.id === id ? { ...x, estado: 'finalizada' } : x)); onCompletarTarea(t.valor) }

  const agregar = () => {
    if (!nueva.tipo || !nueva.valor) return
    setTasks(p => [...p, { id: Date.now(), tipo: nueva.tipo, modalidad: nueva.modalidad, valor: parseInt(nueva.valor), estado: 'pendiente', horas: 1 }])
    setNueva({ tipo: '', modalidad: 'Remoto · Plataforma IPSS', valor: '' })
    setShowModal(false)
    onNotify('Nueva tarea agregada', '📋')
  }

  return (
    <>
      <div className="card tareas-card">
        <div className="card-title">📋 Trabajos Disponibles</div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          <div className="horas-chip">⏱ {horasActivas.toFixed(1)} hrs en curso</div>
          <div className="horas-chip light">✅ {horasCompletadas.toFixed(1)} hrs completadas</div>
        </div>

        {tasks.map(task => {
          const style = TASK_ICONS[task.tipo] || { icon: '⚡', bg: '#F0F9F4', color: '#1A5C38' }
          return (
            <div key={task.id} className="task-card">
              <div className="task-card-icon" style={{ background: style.bg }}>
                {style.icon}
              </div>
              <div className="task-card-body">
                <div className="task-card-title">{task.tipo}</div>
                <div className="task-card-meta">{task.modalidad}</div>
                <div className="task-card-footer">
                  <div>
                    <div className="task-card-value">
                      ${task.valor.toLocaleString('es-CL')}
                      <span>nota de crédito</span>
                    </div>
                    <span className={`badge ${task.estado}`} style={{ marginTop: 4, display: 'inline-flex' }}>
                      {ESTADO_LABEL[task.estado]}
                    </span>
                  </div>
                  <div>
                    {task.estado === 'pendiente'  && <button className="btn btn-primary btn-sm" onClick={() => iniciar(task.id)}>Postular</button>}
                    {task.estado === 'ejecucion'  && <button className="btn btn-primary btn-sm" style={{ background: 'var(--green-500)' }} onClick={() => completar(task.id)}>Entregar ✓</button>}
                    {task.estado === 'finalizada' && <span style={{ fontSize: 22 }}>✅</span>}
                    {task.estado === 'congelada'  && <span style={{ fontSize: 22 }}>❄️</span>}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <button className="btn btn-outline btn-sm" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }} onClick={() => setShowModal(true)}>
          + Agregar tarea
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">📋 Nueva Micro-Tarea</div>
            <div className="form-group">
              <label>Tipo de Servicio</label>
              <input type="text" placeholder="Ej: Soporte TI, Tutoría..." value={nueva.tipo} onChange={e => setNueva(p => ({ ...p, tipo: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Modalidad</label>
              <select value={nueva.modalidad} onChange={e => setNueva(p => ({ ...p, modalidad: e.target.value }))}>
                <option>Remoto · Plataforma IPSS</option>
                <option>Presencial · Sede Centro</option>
                <option>Presencial · Externo</option>
              </select>
            </div>
            <div className="form-group">
              <label>Valor (CLP)</label>
              <input type="number" placeholder="Ej: 15000" value={nueva.valor} onChange={e => setNueva(p => ({ ...p, valor: e.target.value }))} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={agregar}>Agregar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
