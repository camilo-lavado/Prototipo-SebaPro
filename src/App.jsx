import { useState } from 'react'
import './index.css'
import { UserProvider, useUser } from './context/UserContext'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './components/Dashboard'
import Academia from './components/Academia'
import Notas from './components/Notas'
import Biblioteca from './components/Biblioteca'
import SeguroAcademico from './components/SeguroAcademico'

const VIEW_LABELS = {
  academia: '🎓 Academia',
  notas: '📝 Notas',
  biblioteca: '📚 Biblioteca',
  seguro: '🛡️ Seguro Académico',
  sebapro: '🌳 SebaPro Connect',
  programing: '💻 Programación',
}

function AppContent() {
  const [activeView, setActiveView] = useState('sebapro')
  const { currentUser } = useUser()

  return (
    <div className="app-layout">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <div className="main-content">
        <Topbar />

        {/* Breadcrumb */}
        <div style={{
          padding: '8px 20px', background: '#f8f9fa',
          borderBottom: '1px solid #dfe6e9',
          fontSize: 12, color: '#636e72', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span>Portal del Alumno</span>
          <span>›</span>
          <span style={{ color: '#0f3460', fontWeight: 600 }}>{VIEW_LABELS[activeView]}</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#b2bec3' }}>
            {currentUser.carrera} · {currentUser.nivel}
          </span>
        </div>

        {activeView === 'sebapro'   && <Dashboard />}
        {activeView === 'academia'  && <Academia />}
        {activeView === 'notas'     && <Notas />}
        {activeView === 'biblioteca' && <Biblioteca />}
        {activeView === 'seguro'    && <SeguroAcademico />}
        {activeView === 'programing' && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: '#636e72' }}>
            <span style={{ fontSize: 48 }}>🚧</span>
            <p style={{ fontSize: 14, fontWeight: 600 }}>Módulo en desarrollo</p>
            <p style={{ fontSize: 12 }}>Próximamente disponible</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}
