import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ClipboardDocumentCheckIcon, ClockIcon, PlusCircleIcon,
  ComputerDesktopIcon, CalculatorIcon, FolderOpenIcon,
  TableCellsIcon, MapPinIcon, LockClosedIcon, BoltIcon,
  BuildingOffice2Icon, AcademicCapIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid'

const TASK_ICONS = {
  'Soporte TI Pyme':          { Icon: ComputerDesktopIcon,        bg: '#E6F5ED', color: '#1A5C38' },
  'Tutoría Contabilidad':     { Icon: CalculatorIcon,             bg: '#EEF2FF', color: '#3730A3' },
  'Digitalización de datos':  { Icon: FolderOpenIcon,             bg: '#FFF7ED', color: '#C2410C' },
  'Diseño inventario Excel':  { Icon: TableCellsIcon,             bg: '#F0FDF4', color: '#166534' },
  'Control asistencia evento':{ Icon: MapPinIcon,                 bg: '#FDF4FF', color: '#7E22CE' },
  'Capacitación Pyme':        { Icon: BuildingOffice2Icon,        bg: '#FEF3C7', color: '#92400E' },
  'Tutoría Matemáticas':      { Icon: AcademicCapIcon,            bg: '#E0E7FF', color: '#3730A3' },
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
  congelada:  'Congelada',
}

const KANBAN_COLUMNS = [
  { id: 'disponibles', label: 'Disponibles',  estados: ['pendiente'],               color: '#1A5C38', bg: '#E6F5ED', border: '#86EFAC' },
  { id: 'ejecucion',   label: 'En Ejecución', estados: ['ejecucion'],               color: '#1D4ED8', bg: '#EEF2FF', border: '#93C5FD' },
  { id: 'completadas', label: 'Completadas',  estados: ['finalizada', 'congelada'], color: '#6B7280', bg: '#F3F4F6', border: '#D1D5DB' },
]

export default function MisTareas({ onCompletarTarea, onNotify }) {
  const [tasks, setTasks]                       = useState(INITIAL_TASKS)
  const [showModal, setShowModal]               = useState(false)
  const [nueva, setNueva]                       = useState({ tipo: '', modalidad: 'Remoto · Plataforma IPSS', valor: '' })
  const [conformidadTarea, setConformidadTarea] = useState(null)

  const horasCompletadas = tasks.reduce((a, t) => a + (t.estado === 'finalizada' ? t.horas : 0), 0)

  const iniciar   = id => { setTasks(p => p.map(t => t.id === id ? { ...t, estado: 'ejecucion' } : t)); onNotify('Tarea iniciada. ¡Éxito!') }
  const completar = id => { const t = tasks.find(x => x.id === id); setConformidadTarea(t) }

  const confirmarConformidad = () => {
    setTasks(p => p.map(x => x.id === conformidadTarea.id ? { ...x, estado: 'finalizada' } : x))
    onCompletarTarea(conformidadTarea.valor)
    onNotify('Conformidad registrada. Nota de Crédito emitida automáticamente.')
    setConformidadTarea(null)
  }

  const agregar = () => {
    if (!nueva.tipo || !nueva.valor) return
    setTasks(p => [...p, { id: Date.now(), tipo: nueva.tipo, modalidad: nueva.modalidad, valor: parseInt(nueva.valor), estado: 'pendiente', horas: 1 }])
    setNueva({ tipo: '', modalidad: 'Remoto · Plataforma IPSS', valor: '' })
    setShowModal(false)
    onNotify('Nueva tarea agregada')
  }

  return (
    <>
      <style>{`
        .kanban-board {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .kanban-col {
          flex: 1;
          min-width: 0;
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .kanban-col-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2px;
        }
        .kanban-col-title {
          font-weight: 700;
          font-size: 13px;
        }
        .kanban-count-badge {
          font-size: 11px;
          font-weight: 700;
          border-radius: 99px;
          padding: 2px 8px;
          min-width: 22px;
          text-align: center;
        }
        .kanban-task-card {
          background: #fff;
          border-radius: 10px;
          padding: 11px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          gap: 8px;
          border: 1px solid #E5E7EB;
        }
        .kanban-task-card.congelada {
          opacity: 0.68;
        }
        .kanban-task-top {
          display: flex;
          align-items: flex-start;
          gap: 9px;
        }
        .kanban-task-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
        }
        .kanban-task-info {
          flex: 1;
          min-width: 0;
        }
        .kanban-task-title {
          font-weight: 700;
          font-size: 12px;
          color: #111827;
          line-height: 1.3;
        }
        .kanban-task-meta {
          font-size: 11px;
          color: #6B7280;
          margin-top: 2px;
        }
        .kanban-task-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px;
        }
        .kanban-task-value {
          font-weight: 800;
          font-size: 13px;
          color: #1A5C38;
          line-height: 1.1;
        }
        .kanban-task-value span {
          font-weight: 500;
          font-size: 10px;
          color: #6B7280;
          display: block;
        }
        .kanban-empty {
          font-size: 12px;
          color: #9CA3AF;
          text-align: center;
          padding: 14px 0;
        }
        @media (max-width: 700px) {
          .kanban-board { flex-direction: column; overflow-x: hidden; }
          .kanban-col   { min-width: 0; width: 100%; box-sizing: border-box; }
        }
      `}</style>

      <div className="card tareas-card">
        <div className="card-title"><ClipboardDocumentCheckIcon style={{ width: 20, height: 20, display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Trabajos Disponibles</div>

        {/* Chip horas validadas */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="horas-chip" style={{ background: '#E6F5ED', color: '#1A5C38', fontWeight: 700, fontSize: 12, whiteSpace: 'normal', wordBreak: 'break-word' }}>
            <ClockIcon style={{ width: 16, height: 16, display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Horas técnicas validadas en el mes actual: <strong>{horasCompletadas.toFixed(0)} Horas</strong>
          </div>
        </div>

        {/* Kanban board */}
        <div className="kanban-board">
          {KANBAN_COLUMNS.map(col => {
            const colTasks = tasks.filter(t => col.estados.includes(t.estado))
            return (
              <div
                key={col.id}
                className="kanban-col"
                style={{ background: col.bg, border: `1.5px solid ${col.border}` }}
              >
                <div className="kanban-col-header">
                  <span className="kanban-col-title" style={{ color: col.color }}>{col.label}</span>
                  <span className="kanban-count-badge" style={{ background: col.color, color: '#fff' }}>
                    {colTasks.length}
                  </span>
                </div>

                {colTasks.length === 0 && <div className="kanban-empty">Sin tareas</div>}

                {colTasks.map((task, index) => {
                  const ts = TASK_ICONS[task.tipo] || { Icon: BoltIcon, bg: '#F0F9F4', color: '#1A5C38' }
                  const TaskIcon = task.estado === 'congelada' ? LockClosedIcon : ts.Icon
                  const iconColor = task.estado === 'congelada' ? '#6B7280' : ts.color
                  return (
                    <motion.div
                      key={task.id}
                      layout
                      layoutId={String(task.id)}
                      className={`kanban-task-card${task.estado === 'congelada' ? ' congelada' : ''}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.13)' }}
                      transition={{ layout: { duration: 0.3 }, duration: 0.18, delay: index * 0.05, type: 'tween' }}
                    >
                      <div className="kanban-task-top">
                        <div className="kanban-task-icon" style={{ background: ts.bg }}>
                          <TaskIcon style={{ width: 18, height: 18, color: iconColor }} />
                        </div>
                        <div className="kanban-task-info">
                          <div className="kanban-task-title">{task.tipo}</div>
                          <div className="kanban-task-meta">{task.modalidad}</div>
                        </div>
                      </div>

                      <div className="kanban-task-footer">
                        <div>
                          <div className="kanban-task-value">
                            ${task.valor.toLocaleString('es-CL')}
                            <span>nota de crédito</span>
                          </div>
                          <span className={`badge ${task.estado}`} style={{ marginTop: 4, display: 'inline-flex' }}>
                            {ESTADO_LABEL[task.estado]}
                          </span>
                        </div>
                        <div>
                          {task.estado === 'pendiente'  && <motion.button whileTap={{ scale: 0.93 }} className="btn btn-primary btn-sm" onClick={() => iniciar(task.id)}>Postular</motion.button>}
                          {task.estado === 'ejecucion'  && <motion.button whileTap={{ scale: 0.93 }} className="btn btn-primary btn-sm" style={{ background: 'var(--green-500)' }} onClick={() => completar(task.id)}>Entregar ✓</motion.button>}
                          {task.estado === 'finalizada' && <CheckCircleSolid style={{ width: 22, height: 22, color: '#16a34a' }} />}
                          {task.estado === 'congelada'  && <span style={{ fontSize: 20 }}>❄️</span>}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )
          })}
        </div>

        <button
          className="btn btn-outline btn-sm"
          style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}
          onClick={() => setShowModal(true)}
        >
          <PlusCircleIcon style={{ width: 16, height: 16, display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Agregar tarea
        </button>
      </div>

      {/* Modal conformidad */}
      {conformidadTarea && (
        <div className="modal-overlay" onClick={() => setConformidadTarea(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title"><CheckCircleSolid style={{ width: 22, height: 22, display: 'inline', verticalAlign: 'middle', marginRight: 6, color: '#16a34a' }} /> Conformidad del Servicio</div>
            <p style={{ marginBottom: 12, color: '#374151', fontSize: 14 }}>
              El cliente debe confirmar la entrega del servicio para que la Nota de Crédito sea emitida automáticamente a tu cuenta de finanzas.
            </p>
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: '#166534', fontSize: 14 }}>{conformidadTarea.tipo}</div>
              <div style={{ color: '#15803D', fontSize: 13, marginTop: 4 }}>
                Compensación: <strong>${conformidadTarea.valor.toLocaleString('es-CL')}</strong>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setConformidadTarea(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={confirmarConformidad}>🏢 Firma Pyme / Cliente</button>
              <button className="btn btn-primary" style={{ background: '#6D28D9' }} onClick={confirmarConformidad}>🏫 Registro IPSS</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal nueva tarea */}
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
