import { useState } from 'react'

const INITIAL_TASKS = [
  {
    id: 1,
    tipo: 'Soporte TI Pyme',
    modalidad: 'Presencial Sede',
    valor: 15000,
    estado: 'pendiente',
    horas: 2,
  },
  {
    id: 2,
    tipo: 'Tutoría Contabilidad',
    modalidad: 'Remoto',
    valor: 12000,
    estado: 'ejecucion',
    horas: 1.5,
  },
  {
    id: 3,
    tipo: 'Digitalización de datos',
    modalidad: 'Presencial Sede',
    valor: 10000,
    estado: 'finalizada',
    horas: 1,
  },
  {
    id: 4,
    tipo: 'Diseño inventario Excel',
    modalidad: 'Remoto',
    valor: 18000,
    estado: 'pendiente',
    horas: 2.5,
  },
  {
    id: 5,
    tipo: 'Control asistencia evento',
    modalidad: 'Presencial Sede',
    valor: 8000,
    estado: 'congelada',
    horas: 1,
  },
]

const ESTADO_LABELS = {
  pendiente: 'Pendiente',
  ejecucion: 'En Ejecución',
  finalizada: 'Finalizada',
  congelada: '❄️ Congelada (Examen)',
}

export default function MisTareas({ onCompletarTarea, onNotify }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [showModal, setShowModal] = useState(false)
  const [nueva, setNueva] = useState({ tipo: '', modalidad: 'Remoto', valor: '' })

  const horasTotales = tasks.reduce((acc, t) => acc + (t.estado === 'finalizada' ? t.horas : 0), 0)
  const horasActivas = tasks.reduce((acc, t) => acc + (t.estado !== 'congelada' ? t.horas : 0), 0)

  const iniciarTarea = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, estado: 'ejecucion' } : t))
    onNotify('Tarea iniciada. ¡Éxito!', '🚀')
  }

  const completarTarea = (id) => {
    const tarea = tasks.find(t => t.id === id)
    setTasks(prev => prev.map(t => t.id === id ? { ...t, estado: 'finalizada' } : t))
    onCompletarTarea(tarea.valor)
  }

  const agregarTarea = () => {
    if (!nueva.tipo || !nueva.valor) return
    const t = {
      id: Date.now(),
      tipo: nueva.tipo,
      modalidad: nueva.modalidad,
      valor: parseInt(nueva.valor),
      estado: 'pendiente',
      horas: 1,
    }
    setTasks(prev => [...prev, t])
    setNueva({ tipo: '', modalidad: 'Remoto', valor: '' })
    setShowModal(false)
    onNotify('Nueva tarea agregada al tablero', '📋')
  }

  return (
    <>
      <div className="card tareas-card">
        <div className="card-title">
          📋 Mis Micro-Tareas y Horas Técnicas
        </div>

        {/* Chips de horas */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <div className="horas-chip">
            ⏱ Horas validadas este mes: {horasActivas.toFixed(1)} hrs
          </div>
          <div className="horas-chip" style={{ background: 'linear-gradient(135deg, #00b894, #00cec9)' }}>
            ✅ Completadas: {horasTotales.toFixed(1)} hrs
          </div>
        </div>

        {/* Tabla de tareas */}
        <table className="task-table">
          <thead>
            <tr>
              <th>Tipo de Servicio</th>
              <th>Modalidad</th>
              <th>Valor</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td style={{ fontWeight: 500, fontSize: 11 }}>{task.tipo}</td>
                <td style={{ color: '#636e72', fontSize: 10 }}>{task.modalidad}</td>
                <td className="credit-val">${task.valor.toLocaleString('es-CL')}</td>
                <td>
                  <span className={`badge ${task.estado}`}>
                    {ESTADO_LABELS[task.estado]}
                  </span>
                </td>
                <td>
                  {task.estado === 'pendiente' && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => iniciarTarea(task.id)}
                    >
                      Iniciar
                    </button>
                  )}
                  {task.estado === 'ejecucion' && (
                    <button
                      className="btn btn-green btn-sm"
                      onClick={() => completarTarea(task.id)}
                    >
                      Completar
                    </button>
                  )}
                  {task.estado === 'finalizada' && (
                    <span style={{ fontSize: 16 }}>✅</span>
                  )}
                  {task.estado === 'congelada' && (
                    <span style={{ fontSize: 16 }}>❄️</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            + Nueva Tarea
          </button>
        </div>
      </div>

      {/* Modal Nueva Tarea */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">📋 Agregar Nueva Micro-Tarea</div>
            <div className="form-group">
              <label>Tipo de Servicio</label>
              <input
                type="text"
                placeholder="Ej: Soporte TI, Tutoría Contabilidad..."
                value={nueva.tipo}
                onChange={e => setNueva(p => ({ ...p, tipo: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Modalidad</label>
              <select
                value={nueva.modalidad}
                onChange={e => setNueva(p => ({ ...p, modalidad: e.target.value }))}
              >
                <option>Remoto</option>
                <option>Presencial Sede</option>
                <option>Presencial Externo</option>
              </select>
            </div>
            <div className="form-group">
              <label>Valor de Compensación (CLP)</label>
              <input
                type="number"
                placeholder="Ej: 15000"
                value={nueva.valor}
                onChange={e => setNueva(p => ({ ...p, valor: e.target.value }))}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={agregarTarea}>
                Agregar Tarea
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
