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
import LoginScreen from './components/LoginScreen'

const VIEW_LABELS = {
  academia: '🎓 Academia',
  notas:    '📝 Notas',
  biblioteca: '📚 Biblioteca',
  seguro:   '🛡️ Seguro Académico',
  sebapro:  '🌳 SebaPro Connect',
}

function AppContent() {
  const [activeView, setActiveView] = useState('sebapro')
  const [loggedIn, setLoggedIn] = useState(false)
  const { currentUser } = useUser()

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />
  }

  return (
    <div className="app-layout">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <div className="main-content">
        <Topbar onLogout={() => setLoggedIn(false)} />
        <div className="breadcrumb">
          <span>Portal del Alumno</span>
          <span>›</span>
          <span className="breadcrumb-active">{VIEW_LABELS[activeView]}</span>
          <span className="breadcrumb-meta">{currentUser.carrera} · {currentUser.nivel}</span>
        </div>

        {activeView === 'sebapro'    && <Dashboard />}
        {activeView === 'academia'   && <Academia />}
        {activeView === 'notas'      && <Notas />}
        {activeView === 'biblioteca' && <Biblioteca />}
        {activeView === 'seguro'     && <SeguroAcademico />}
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
