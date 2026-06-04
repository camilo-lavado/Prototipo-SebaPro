import { useUser } from '../context/UserContext'
import { CheckCircleIcon, XCircleIcon, DocumentTextIcon, ExclamationTriangleIcon, ClipboardDocumentCheckIcon, ChartBarIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolid, XCircleIcon as XCircleSolid } from '@heroicons/react/24/solid'

const REGISTROS = [
  { asignatura: 'Fundamentos de Programación', fecha: '02/06/2026', estado: 'presente' },
  { asignatura: 'Matemáticas Aplicadas',        fecha: '02/06/2026', estado: 'presente' },
  { asignatura: 'Inglés Técnico',               fecha: '01/06/2026', estado: 'ausente' },
  { asignatura: 'Fundamentos de Programación', fecha: '28/05/2026', estado: 'presente' },
  { asignatura: 'Gestión de Proyectos TI',      fecha: '27/05/2026', estado: 'justificada' },
  { asignatura: 'Matemáticas Aplicadas',        fecha: '27/05/2026', estado: 'presente' },
  { asignatura: 'Base de Datos',                fecha: '26/05/2026', estado: 'presente' },
  { asignatura: 'Inglés Técnico',               fecha: '25/05/2026', estado: 'presente' },
  { asignatura: 'Gestión de Proyectos TI',      fecha: '24/05/2026', estado: 'ausente' },
  { asignatura: 'Base de Datos',                fecha: '23/05/2026', estado: 'presente' },
]

const ESTADO_CONFIG = {
  presente:   { Icon: (props) => <CheckCircleSolid {...props} />,  label: 'Presente',    color: 'var(--green-600)', bg: '#F0FDF4' },
  ausente:    { Icon: (props) => <XCircleSolid {...props} />,      label: 'Ausente',     color: '#EF4444',          bg: '#FEF2F2' },
  justificada:{ Icon: (props) => <DocumentTextIcon {...props} />,  label: 'Justificada', color: '#F59E0B',          bg: '#FFFBEB' },
}

export default function Asistencia() {
  const { currentUser } = useUser()
  const { asignaturas } = currentUser

  const totalClases = 92
  const asistidas   = 80
  const pct = Math.round(asistidas / totalClases * 100)

  const indicadorColor = pct >= 85 ? 'var(--green-600)' : pct >= 70 ? '#F59E0B' : '#EF4444'
  const indicadorBg    = pct >= 85 ? '#F0FDF4'          : pct >= 70 ? '#FFFBEB' : '#FEF2F2'
  const indicadorTexto = pct >= 85 ? 'Asistencia regular' : pct >= 70 ? 'Asistencia en riesgo' : 'Asistencia crítica'

  const IndicadorIcon = pct >= 85
    ? (props) => <CheckCircleSolid {...props} />
    : (props) => <ExclamationTriangleIcon {...props} />

  return (
    <div className="content-area" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>

      {/* Resumen del mes */}
      <div className="card col-full" style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          width: 96, height: 96, borderRadius: '50%', flexShrink: 0,
          background: `conic-gradient(${indicadorColor} ${pct * 3.6}deg, var(--green-100) 0deg)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column',
          }}>
            <span style={{ fontSize: 20, fontWeight: 900, color: indicadorColor }}>{pct}%</span>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)' }}>Resumen — Junio 2026</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>
            {asistidas} clases asistidas de {totalClases} totales
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            marginTop: 10, padding: '4px 12px', borderRadius: 20,
            background: indicadorBg, color: indicadorColor,
            fontWeight: 700, fontSize: 12,
          }}>
            <IndicadorIcon style={{ width: 14, height: 14 }} /> {indicadorTexto}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { Icon: (p) => <CheckCircleSolid {...p} />, iconColor: 'var(--green-600)', val: asistidas, lbl: 'Presentes' },
            { Icon: (p) => <XCircleSolid {...p} />,     iconColor: '#EF4444',          val: REGISTROS.filter(r => r.estado === 'ausente').length * 4, lbl: 'Ausencias' },
            { Icon: (p) => <DocumentTextIcon {...p} />, iconColor: '#3B82F6',           val: REGISTROS.filter(r => r.estado === 'justificada').length * 2, lbl: 'Justificadas' },
          ].map(({ Icon, iconColor, val, lbl }) => (
            <div key={lbl} className="stat-box" style={{ minWidth: 80, textAlign: 'center' }}>
              <div className="stat-box-value" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Icon style={{ width: 16, height: 16, color: iconColor }} /> {val}
              </div>
              <div className="stat-box-label">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla de registros */}
      <div className="card col-full">
        <div className="card-title">
          <ClipboardDocumentCheckIcon style={{ width: 18, height: 18, display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
          Últimas Clases Registradas
        </div>
        <table className="data-table">
          <thead>
            <tr>
              {['Asignatura', 'Fecha', 'Estado'].map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {REGISTROS.map((r, i) => {
              const cfg = ESTADO_CONFIG[r.estado]
              return (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{r.asignatura}</td>
                  <td style={{ color: 'var(--text-2)', fontSize: 12 }}>{r.fecha}</td>
                  <td>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '3px 10px', borderRadius: 12,
                      background: cfg.bg, color: cfg.color,
                      fontWeight: 700, fontSize: 12,
                    }}>
                      <cfg.Icon style={{ width: 16, height: 16 }} /> {cfg.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Asistencia por asignatura */}
      <div className="card" style={{ gridColumn: 'span 2' }}>
        <div className="card-title">
          <ChartBarIcon style={{ width: 18, height: 18, display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
          Asistencia por Asignatura
        </div>
        {asignaturas.map(a => {
          const color = a.asistencia >= 85 ? 'var(--green-600)' : a.asistencia >= 70 ? '#F59E0B' : '#EF4444'
          return (
            <div key={a.codigo} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>{a.nombre}</span>
                <span style={{ fontWeight: 700, color }}>{a.asistencia}%</span>
              </div>
              <div style={{ height: 8, background: 'var(--green-100)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${a.asistencia}%`, height: '100%', background: color, borderRadius: 4, transition: 'width .6s' }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Política de asistencia */}
      <div className="card">
        <div className="card-title">
          <BookmarkIcon style={{ width: 18, height: 18, display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
          Política de Asistencia
        </div>
        {[
          ['Mínimo obligatorio', '75%'],
          ['Riesgo académico',   '< 85%'],
          ['Inhabilitación',     '< 75%'],
          ['Semestre actual',    '1° sem. 2026'],
          ['Total semanas',      '18 semanas'],
          ['Clases por semana',  '5 asignaturas'],
        ].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--green-50)', fontSize: 12 }}>
            <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>{l}</span>
            <span style={{ fontWeight: 700, color: 'var(--green-800)' }}>{v}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
