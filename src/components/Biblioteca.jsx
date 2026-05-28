import { useState } from 'react'
import { useUser } from '../context/UserContext'

const RECURSOS_DIGITALES = [
  { titulo: 'Repositorio de Tesis IPSS', tipo: 'Base de datos', icono: '🗄️', acceso: 'En línea' },
  { titulo: 'EBSCO Academic Search', tipo: 'Revista científica', icono: '📰', acceso: 'En línea' },
  { titulo: 'Biblioteca Digital del MINEDUC', tipo: 'Recurso estatal', icono: '🏛️', acceso: 'En línea' },
  { titulo: 'Microsoft Learn (Campus License)', tipo: 'Cursos técnicos', icono: '💻', acceso: 'En línea' },
  { titulo: 'Statista — Estadísticas y estudios', tipo: 'Datos y reportes', icono: '📊', acceso: 'En línea' },
]

const CATALOGO = [
  { titulo: 'Administración, 14ª Ed.', autor: 'Robbins & Coulter', disponibles: 2, total: 4, seccion: 'ADM' },
  { titulo: 'Principios de Contabilidad', autor: 'Meigs & Meigs', disponibles: 0, total: 3, seccion: 'ADM' },
  { titulo: 'Gestión de Proyectos', autor: 'PMI Guide', disponibles: 1, total: 2, seccion: 'ADM' },
  { titulo: 'Computer Networks, 5th Ed.', autor: 'Tanenbaum', disponibles: 3, total: 3, seccion: 'INF' },
  { titulo: 'Clean Code', autor: 'Robert C. Martin', disponibles: 0, total: 2, seccion: 'INF' },
  { titulo: 'Estadística para Administración', autor: 'Berenson & Levine', disponibles: 2, total: 4, seccion: 'ADM' },
]

const ESTADO_STYLES = {
  activo: { bg: '#d1e7dd', color: '#0a3622', label: 'Activo' },
  'vence pronto': { bg: '#fff3cd', color: '#664d03', label: '⚠️ Vence pronto' },
  vencido: { bg: '#f8d7da', color: '#842029', label: '🔴 Vencido' },
}

function diasRestantes(fecha) {
  const diff = (new Date(fecha) - new Date('2026-05-28')) / (1000 * 60 * 60 * 24)
  return Math.round(diff)
}

export default function Biblioteca() {
  const { currentUser } = useUser()
  const { prestamos } = currentUser
  const [busqueda, setBusqueda] = useState('')
  const [seccion, setSeccion] = useState('Todos')

  const catalogo = CATALOGO.filter(l =>
    (seccion === 'Todos' || l.seccion === seccion) &&
    (busqueda === '' || l.titulo.toLowerCase().includes(busqueda.toLowerCase()) || l.autor.toLowerCase().includes(busqueda.toLowerCase()))
  )

  return (
    <div className="content-area" style={{ gridTemplateColumns: '1fr 1fr' }}>

      {/* Header */}
      <div className="card" style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 40 }}>📚</span>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#0f3460' }}>Biblioteca IPSS</div>
          <div style={{ fontSize: 12, color: '#636e72', marginTop: 2 }}>Sede Santiago · Jornada Vespertina · Horario: Lun–Vie 13:00–22:00 · Sáb 09:00–14:00</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: '#636e72' }}>Préstamos activos</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#0f3460' }}>
            {prestamos.filter(p => p.estado !== 'vencido').length}/{prestamos.length}
          </div>
        </div>
      </div>

      {/* Mis Préstamos */}
      <div className="card">
        <div className="card-title">📖 Mis Préstamos Actuales</div>
        {prestamos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#b2bec3', fontSize: 13 }}>Sin préstamos activos</div>
        ) : (
          prestamos.map(p => {
            const est = ESTADO_STYLES[p.estado]
            const dias = diasRestantes(p.vencimiento)
            return (
              <div key={p.id} style={{
                padding: '12px', borderRadius: 10, marginBottom: 8,
                background: est.bg, border: `1px solid ${est.color}33`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#2d3436' }}>{p.titulo}</div>
                    <div style={{ fontSize: 11, color: '#636e72', marginTop: 2 }}>{p.autor}</div>
                  </div>
                  <span style={{
                    background: est.color + '22', color: est.color,
                    fontSize: 10, fontWeight: 700, padding: '3px 9px',
                    borderRadius: 10, whiteSpace: 'nowrap',
                  }}>{est.label}</span>
                </div>
                <div style={{ marginTop: 8, display: 'flex', gap: 12, fontSize: 11 }}>
                  <span style={{ color: '#636e72' }}>📅 Vence: {new Date(p.vencimiento).toLocaleDateString('es-CL')}</span>
                  <span style={{ fontWeight: 600, color: dias < 3 ? '#e17055' : '#636e72' }}>
                    {dias < 0 ? `Vencido hace ${Math.abs(dias)} días` : dias === 0 ? 'Vence hoy' : `${dias} días restantes`}
                  </span>
                </div>
                {(p.estado === 'vence pronto' || p.estado === 'vencido') && (
                  <button style={{
                    marginTop: 8, padding: '5px 12px', borderRadius: 6, border: 'none',
                    background: '#0f3460', color: 'white', fontSize: 11, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    🔄 Renovar préstamo
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Recursos Digitales */}
      <div className="card">
        <div className="card-title">🌐 Recursos Digitales Disponibles</div>
        {RECURSOS_DIGITALES.map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 0', borderBottom: '1px solid #f0f2f5',
          }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>{r.icono}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#2d3436' }}>{r.titulo}</div>
              <div style={{ fontSize: 11, color: '#636e72', marginTop: 1 }}>{r.tipo}</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#00b894', background: '#d1e7dd', padding: '3px 8px', borderRadius: 8 }}>
              {r.acceso}
            </span>
          </div>
        ))}
      </div>

      {/* Catálogo */}
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <div className="card-title">🔍 Catálogo de Libros</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <input
            type="text"
            placeholder="Buscar título o autor..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={{
              flex: 1, padding: '8px 12px', borderRadius: 8,
              border: '1.5px solid #dfe6e9', fontSize: 13,
              fontFamily: 'inherit',
            }}
          />
          {['Todos', 'ADM', 'INF'].map(s => (
            <button
              key={s}
              onClick={() => setSeccion(s)}
              style={{
                padding: '8px 16px', borderRadius: 8, border: 'none',
                background: seccion === s ? '#0f3460' : '#f0f2f5',
                color: seccion === s ? 'white' : '#636e72',
                fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >{s === 'Todos' ? 'Todos' : s === 'ADM' ? 'Administración' : 'Informática'}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
          {catalogo.map((l, i) => (
            <div key={i} style={{ padding: '12px', border: '1.5px solid #dfe6e9', borderRadius: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#2d3436', marginBottom: 2 }}>{l.titulo}</div>
              <div style={{ fontSize: 11, color: '#636e72', marginBottom: 8 }}>{l.autor}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: l.disponibles > 0 ? '#00b894' : '#e17055', fontWeight: 600 }}>
                  {l.disponibles > 0 ? `${l.disponibles} disponible(s)` : 'No disponible'}
                </span>
                <button
                  disabled={l.disponibles === 0}
                  style={{
                    padding: '4px 10px', borderRadius: 6, border: 'none',
                    background: l.disponibles > 0 ? '#0f3460' : '#dee2e6',
                    color: l.disponibles > 0 ? 'white' : '#adb5bd',
                    fontSize: 10, fontWeight: 600, cursor: l.disponibles > 0 ? 'pointer' : 'not-allowed',
                    fontFamily: 'inherit',
                  }}
                >
                  {l.disponibles > 0 ? 'Reservar' : 'Lista espera'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
