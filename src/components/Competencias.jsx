import { useState } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '../context/UserContext'
import { TrophyIcon, EllipsisHorizontalCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
}
const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.22, ease: 'easeOut' } }
}

export default function Competencias() {
  const { currentUser } = useUser()
  const [competencias, setCompetencias] = useState(currentUser.competencias)
  const [prevUserId, setPrevUserId] = useState(currentUser.id)
  const [showModal, setShowModal] = useState(false)
  const [nuevaComp, setNuevaComp] = useState('')
  const [solicitudEnviada, setSolicitudEnviada] = useState(false)

  // Resetea al cambiar usuario
  if (currentUser.id !== prevUserId) {
    setPrevUserId(currentUser.id)
    setCompetencias(currentUser.competencias)
  }

  const validadas = competencias.filter(c => c.validada).length

  const solicitarValidacion = () => {
    setSolicitudEnviada(true)
    setShowModal(false)
    setTimeout(() => setSolicitudEnviada(false), 4000)
  }

  const agregarComp = () => {
    if (!nuevaComp.trim()) return
    setCompetencias(prev => [
      ...prev,
      { id: Date.now(), nombre: nuevaComp.trim(), validada: false }
    ])
    setNuevaComp('')
    setShowModal(false)
  }

  return (
    <>
      <div className="card competencias-card">
        <div className="card-title"><TrophyIcon style={{ width: 20, height: 20, display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Validación de Competencias</div>

        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 10, color: '#636e72', fontWeight: 500 }}>
            Estudiantes validados: {validadas} de {competencias.length} competencias activas
          </span>
        </div>

        <motion.div variants={listVariants} initial="hidden" animate="show">
          {competencias.map(comp => (
            <motion.div
              key={comp.id}
              variants={itemVariants}
              className={`comp-item ${comp.validada ? 'validada' : 'pendiente'}`}
              whileHover={{ backgroundColor: '#F0F9F4', x: 3 }}
            >
              <span>{comp.nombre}</span>
              <div className={`comp-check ${comp.validada ? 'ok' : 'pending'}`}>
                {comp.validada
                  ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                    >
                      <CheckIcon style={{ width: 14, height: 14, color: '#16a34a' }} />
                    </motion.div>
                  )
                  : <EllipsisHorizontalCircleIcon style={{ width: 14, height: 14, color: '#9CA3AF' }} />
                }
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            + Declarar Habilidad
          </button>
          <button className="btn btn-secondary btn-sm" onClick={solicitarValidacion}>
            <EnvelopeIcon style={{ width: 16, height: 16, display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Solicitar Validación
          </button>
        </div>

        {solicitudEnviada && (
          <div className="seguro-alert" style={{ marginTop: 10, background: '#d1e7dd', border: '1px solid #00b894', color: '#0a3622' }}>
            ✅ Solicitud enviada al Director de Carrera. Recibirás notificación cuando sea aprobada.
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title"><TrophyIcon style={{ width: 20, height: 20, display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Declarar Nueva Competencia</div>
            <div className="form-group">
              <label>Nombre de la Habilidad Técnica</label>
              <input
                type="text"
                placeholder="Ej: Soporte de redes, Diseño web..."
                value={nuevaComp}
                onChange={e => setNuevaComp(e.target.value)}
              />
            </div>
            <p style={{ fontSize: 11, color: '#636e72', marginTop: 4 }}>
              Una vez enviada, el Director de Carrera revisará tu perfil y calificaciones para aprobar la competencia.
            </p>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={agregarComp}>Declarar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
