import { useState } from 'react'
import './index.css'
import { UserProvider, useUser } from './context/UserContext'
import {
  AcademicCapIcon, DocumentTextIcon, BookOpenIcon,
  ShieldCheckIcon, ClipboardDocumentListIcon, SparklesIcon,
} from '@heroicons/react/24/outline'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './components/Dashboard'
import Academia from './components/Academia'
import Notas from './components/Notas'
import Biblioteca from './components/Biblioteca'
import SeguroAcademico from './components/SeguroAcademico'
import Asistencia from './components/Asistencia'
import LoginScreen from './components/LoginScreen'
import LogoutScreen from './components/LogoutScreen'

const VIEW_META = {
  academia:   { Icon: AcademicCapIcon,          label: 'Academia' },
  notas:      { Icon: DocumentTextIcon,          label: 'Notas' },
  biblioteca: { Icon: BookOpenIcon,              label: 'Biblioteca' },
  seguro:     { Icon: ShieldCheckIcon,           label: 'Seguro Académico' },
  asistencia: { Icon: ClipboardDocumentListIcon, label: 'Asistencia' },
  sebapro:    { Icon: SparklesIcon,              label: 'SebaPro Connect' },
}

function AppContent() {
  const [activeView, setActiveView] = useState('sebapro')
  const [session, setSession] = useState('login') // 'login' | 'app' | 'logout'
  const { currentUser } = useUser()

  if (session === 'login') {
    return <LoginScreen onLogin={() => setSession('app')} />
  }

  if (session === 'logout') {
    return <LogoutScreen user={currentUser} onVolver={() => setSession('login')} />
  }

  return (
    <div className="app-layout">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <div className="main-content">
        <Topbar onLogout={() => setSession('logout')} />
        <div className="breadcrumb">
          <span>Portal del Alumno</span>
          <span>›</span>
          <span className="breadcrumb-active" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {(() => { const { Icon, label } = VIEW_META[activeView]; return <><Icon style={{ width: 14, height: 14 }} />{label}</> })()}
          </span>
          <span className="breadcrumb-meta">{currentUser.carrera} · {currentUser.nivel}</span>
        </div>

        {activeView === 'sebapro'    && <Dashboard />}
        {activeView === 'academia'   && <Academia />}
        {activeView === 'notas'      && <Notas />}
        {activeView === 'biblioteca' && <Biblioteca />}
        {activeView === 'seguro'     && <SeguroAcademico />}
        {activeView === 'asistencia' && <Asistencia />}
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
