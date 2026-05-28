import { useState } from 'react'
import { useUser } from '../context/UserContext'

export default function Topbar() {
  const { currentUser, setCurrentUser, USERS } = useUser()
  const [open, setOpen] = useState(false)

  return (
    <div className="topbar">
      <div className="topbar-brand">
        <span style={{ fontSize: 22 }}>🏫</span>
        <span>Instituto Profesional San Sebastián</span>
      </div>
      <div className="topbar-right">
        <span style={{ fontSize: 11, color: '#636e72' }}>Vespertino · Mayo 2026</span>

        {/* Selector de usuario */}
        <div style={{ position: 'relative' }}>
          <div
            className="user-chip"
            onClick={() => setOpen(o => !o)}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <div className="user-avatar" style={{ background: `linear-gradient(135deg, ${currentUser.color}, #0f3460)` }}>
              {currentUser.iniciales}
            </div>
            <span>{currentUser.nombre.split(' ').slice(0, 2).join(' ')}</span>
            <span style={{ fontSize: 10, color: '#b2bec3', marginLeft: 2 }}>▾</span>
          </div>

          {open && (
            <>
              {/* Backdrop */}
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 98 }}
                onClick={() => setOpen(false)}
              />
              {/* Dropdown */}
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                background: 'white', borderRadius: 12, padding: 8,
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                border: '1px solid #dfe6e9',
                zIndex: 99, minWidth: 240,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#b2bec3', textTransform: 'uppercase', letterSpacing: 0.5, padding: '4px 8px 8px' }}>
                  Usuarios de prueba
                </div>
                {USERS.map(u => (
                  <div
                    key={u.id}
                    onClick={() => { setCurrentUser(u); setOpen(false) }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 10px', borderRadius: 8, cursor: 'pointer',
                      background: currentUser.id === u.id ? '#f0f4ff' : 'transparent',
                      border: currentUser.id === u.id ? '1.5px solid #0984e3' : '1.5px solid transparent',
                      marginBottom: 4, transition: 'background 0.15s',
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg, ${u.color}, #0f3460)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: 13, fontWeight: 800,
                    }}>
                      {u.iniciales}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f3460' }}>{u.nombre}</div>
                      <div style={{ fontSize: 10, color: '#636e72' }}>{u.carrera.split(' ').slice(0, 3).join(' ')} · {u.nivel}</div>
                    </div>
                    {currentUser.id === u.id && (
                      <span style={{ fontSize: 14, color: '#0984e3' }}>✓</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
