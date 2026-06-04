import { useState } from 'react'
import { useUser } from '../context/UserContext'
import DemoModal from './DemoModal'
import {
  CircleStackIcon,
  NewspaperIcon,
  BuildingLibraryIcon,
  ComputerDesktopIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  ArrowPathIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

const RECURSOS = [
  { titulo:'Repositorio de Tesis IPSS',      tipo:'Base de datos',    Icon: CircleStackIcon },
  { titulo:'EBSCO Academic Search',           tipo:'Revista científica',Icon: NewspaperIcon },
  { titulo:'Biblioteca Digital MINEDUC',      tipo:'Recurso estatal',  Icon: BuildingLibraryIcon },
  { titulo:'Microsoft Learn (Campus License)',tipo:'Cursos técnicos',  Icon: ComputerDesktopIcon },
  { titulo:'Statista — Estadísticas',         tipo:'Datos y reportes', Icon: ChartBarIcon },
]

const CATALOGO = [
  { titulo:'Administración, 14ª Ed.', autor:'Robbins & Coulter', disponibles:2, seccion:'ADM' },
  { titulo:'Principios de Contabilidad', autor:'Meigs & Meigs',  disponibles:0, seccion:'ADM' },
  { titulo:'Gestión de Proyectos',      autor:'PMI Guide',        disponibles:1, seccion:'ADM' },
  { titulo:'Computer Networks, 5th Ed.',autor:'Tanenbaum',        disponibles:3, seccion:'INF' },
  { titulo:'Clean Code',                autor:'R.C. Martin',      disponibles:0, seccion:'INF' },
  { titulo:'Estadística p/Administración',autor:'Berenson & Levine',disponibles:2,seccion:'ADM'},
]

const EST = {
  activo:        { bg:'#E6F5ED', color:'#0A3622', label:'Activo', Icon: null },
  'vence pronto':{ bg:'#FFFBEB', color:'#78350F', label:'Vence pronto', Icon: ExclamationTriangleIcon },
  vencido:       { bg:'#FEE2E2', color:'#991B1B', label:'Vencido', Icon: XCircleIcon },
}

function diasRestantes(f) { return Math.round((new Date(f)-new Date('2026-05-28'))/(86400000)) }

export default function Biblioteca() {
  const { currentUser } = useUser()
  const [busq, setBusq]     = useState('')
  const [sec,  setSec]      = useState('Todos')
  const [demo, setDemo]     = useState(null)

  const catalogo = CATALOGO.filter(l=>
    (sec==='Todos'||l.seccion===sec) &&
    (busq===''||l.titulo.toLowerCase().includes(busq.toLowerCase())||l.autor.toLowerCase().includes(busq.toLowerCase()))
  )

  return (
    <div className="content-area" style={{ gridTemplateColumns:'1fr 1fr' }}>
      <DemoModal open={!!demo} onClose={() => setDemo(null)} feature={demo} />

      {/* Header */}
      <div className="card col-full" style={{ display:'flex', alignItems:'center', gap:16 }}>
        <div style={{ width:56,height:56,borderRadius:16,background:'var(--green-100)',display:'flex',alignItems:'center',justifyContent:'center' }}>
          <BookOpenIcon style={{ width:28,height:28,color:'var(--green-700)' }} />
        </div>
        <div>
          <div style={{ fontSize:17,fontWeight:800,color:'var(--text-1)' }}>Biblioteca IPSS</div>
          <div style={{ fontSize:12,color:'var(--text-2)',marginTop:2 }}>Sede Santiago · Lun–Vie 13:00–22:00 · Sáb 09:00–14:00</div>
        </div>
        <div style={{ marginLeft:'auto',textAlign:'right' }}>
          <div style={{ fontSize:11,color:'var(--text-2)' }}>Préstamos activos</div>
          <div style={{ fontSize:26,fontWeight:900,color:'var(--green-800)' }}>
            {currentUser.prestamos.filter(p=>p.estado!=='vencido').length}/{currentUser.prestamos.length}
          </div>
        </div>
      </div>

      {/* Mis préstamos */}
      <div className="card">
        <div className="card-title"><BookOpenIcon style={{ width:16,height:16,display:'inline',verticalAlign:'middle',marginRight:6 }} />Mis Préstamos</div>
        {currentUser.prestamos.map(p=>{
          const est=EST[p.estado], dias=diasRestantes(p.vencimiento)
          return (
            <div key={p.id} style={{ padding:12,borderRadius:10,marginBottom:8,background:est.bg,border:`1px solid ${est.color}33` }}>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start' }}>
                <div>
                  <div style={{ fontWeight:700,fontSize:13,color:'var(--text-1)' }}>{p.titulo}</div>
                  <div style={{ fontSize:11,color:'var(--text-2)',marginTop:2 }}>{p.autor}</div>
                </div>
                <span style={{ fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:10,background:`${est.color}22`,color:est.color,whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:4 }}>
                  {est.Icon && <est.Icon style={{ width:12,height:12 }} />}{est.label}
                </span>
              </div>
              <div style={{ marginTop:8,display:'flex',gap:12,fontSize:11 }}>
                <span style={{ color:'var(--text-2)',display:'flex',alignItems:'center',gap:4 }}>
                  <CalendarDaysIcon style={{ width:14,height:14,display:'inline' }} />
                  {new Date(p.vencimiento).toLocaleDateString('es-CL')}
                </span>
                <span style={{ fontWeight:600,color:dias<3?'#DC2626':'var(--text-2)' }}>
                  {dias<0?`Vencido hace ${Math.abs(dias)} días`:dias===0?'Vence hoy':`${dias} días restantes`}
                </span>
              </div>
              {(p.estado==='vence pronto'||p.estado==='vencido')&&(
                <button className="btn btn-primary btn-sm" style={{ marginTop:8,display:'flex',alignItems:'center',gap:6 }} onClick={() => setDemo('Renovar préstamo')}>
                  <ArrowPathIcon style={{ width:14,height:14 }} />Renovar
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Recursos digitales */}
      <div className="card">
        <div className="card-title"><GlobeAltIcon style={{ width:16,height:16,display:'inline',verticalAlign:'middle',marginRight:6 }} />Recursos Digitales</div>
        {RECURSOS.map((r,i)=>(
          <div key={i} style={{ display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:'1px solid var(--green-50)' }}>
            <r.Icon style={{ width:20,height:20,flexShrink:0,color:'var(--green-700)' }} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13,fontWeight:600,color:'var(--text-1)' }}>{r.titulo}</div>
              <div style={{ fontSize:11,color:'var(--text-2)',marginTop:1 }}>{r.tipo}</div>
            </div>
            <span style={{ fontSize:10,fontWeight:700,color:'var(--green-700)',background:'var(--green-100)',padding:'3px 8px',borderRadius:8 }}>En línea</span>
          </div>
        ))}
      </div>

      {/* Catálogo */}
      <div className="card col-full">
        <div className="card-title"><MagnifyingGlassIcon style={{ width:16,height:16,display:'inline',verticalAlign:'middle',marginRight:6 }} />Catálogo</div>
        <div style={{ display:'flex',gap:10,marginBottom:14 }}>
          <input type="text" placeholder="Buscar título o autor..." value={busq} onChange={e=>setBusq(e.target.value)}
            style={{ flex:1,padding:'9px 12px',borderRadius:8,border:'1.5px solid var(--border)',fontSize:13,fontFamily:'inherit',color:'var(--text-1)',background:'var(--green-50)' }} />
          {['Todos','ADM','INF'].map(s=>(
            <button key={s} onClick={()=>setSec(s)} className={`btn ${sec===s?'btn-primary':'btn-secondary'} btn-sm`}>
              {s==='Todos'?'Todos':s==='ADM'?'Administración':'Informática'}
            </button>
          ))}
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:10 }}>
          {catalogo.map((l,i)=>(
            <div key={i} style={{ padding:14,border:'1.5px solid var(--border)',borderRadius:12,background:l.disponibles>0?'white':'var(--green-50)' }}>
              <div style={{ fontSize:13,fontWeight:700,color:'var(--text-1)',marginBottom:2 }}>{l.titulo}</div>
              <div style={{ fontSize:11,color:'var(--text-2)',marginBottom:10 }}>{l.autor}</div>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                <span style={{ fontSize:11,fontWeight:700,color:l.disponibles>0?'var(--green-600)':'#DC2626' }}>
                  {l.disponibles>0?`${l.disponibles} disponible(s)`:'No disponible'}
                </span>
                <button
                  className={`btn btn-sm ${l.disponibles>0?'btn-primary':'btn-secondary'}`}
                  style={{ opacity:l.disponibles===0?0.5:1 }}
                  onClick={() => setDemo(l.disponibles>0 ? 'Reservar libro' : 'Lista de espera')}
                >
                  {l.disponibles>0?'Reservar':'Lista espera'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
