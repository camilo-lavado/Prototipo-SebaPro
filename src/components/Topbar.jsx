import { useState } from 'react'
import { useUser } from '../context/UserContext'

export default function Topbar({ onLogout }) {
  const { currentUser, setCurrentUser, USERS } = useUser()
  const [open, setOpen] = useState(false)

  return (
    <div className="topbar">
      <div className="topbar-brand">
        <img src="/logo2.jpg" alt="SebaPro Connect" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6, background: 'white', padding: 2, flexShrink: 0 }} />
        <span className="topbar-brand-text">SebaPro Connect</span>
      </div>

      <div className="topbar-right">
        <span className="topbar-meta">Vespertino · Mayo 2026</span>

        <div style={{ position: 'relative' }}>
          <div className="user-chip" onClick={() => setOpen(o => !o)}>
            <div
              className="user-avatar"
              style={{ background: `linear-gradient(135deg, ${currentUser.color}, #1A5C38)` }}
            >
              {currentUser.iniciales}
            </div>
            <span>{currentUser.nombre.split(' ').slice(0, 2).join(' ')}</span>
            <span style={{ fontSize: 10, opacity: 0.5 }}>▾</span>
          </div>

          {open && (
            <>
              <div style={{ position: 'fixed', inset: 0, zIndex: 98 }} onClick={() => setOpen(false)} />
              <div style={{
                position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                background: 'white', borderRadius: 16, padding: 10,
                boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
                border: '1px solid #E2EDE8', zIndex: 99, minWidth: 250,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#8AADA0', textTransform: 'uppercase', letterSpacing: 0.6, padding: '4px 8px 10px' }}>
                  Usuarios de prueba
                </div>
                {USERS.map(u => (
                  <div
                    key={u.id}
                    onClick={() => { setCurrentUser(u); setOpen(false) }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px', borderRadius: 10, cursor: 'pointer',
                      background: currentUser.id === u.id ? '#F0F9F4' : 'transparent',
                      border: currentUser.id === u.id ? '1.5px solid #3A9E68' : '1.5px solid transparent',
                      marginBottom: 4, transition: 'background 0.15s',
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg, ${u.color}, #1A5C38)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: 13, fontWeight: 800,
                    }}>
                      {u.iniciales}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0D3320' }}>{u.nombre}</div>
                      <div style={{ fontSize: 10, color: '#4A7260' }}>
                        {u.carrera.split(' ').slice(0, 3).join(' ')} · {u.nivel}
                      </div>
                    </div>
                    {currentUser.id === u.id && <span style={{ color: '#2E7D52', fontSize: 16 }}>✓</span>}
                  </div>
                ))}

                <div style={{ borderTop: '1px solid #E2EDE8', marginTop: 6, paddingTop: 6 }}>
                  <button
                    onClick={() => { setOpen(false); onLogout() }}
                    style={{
                      width: '100%', padding: '9px', borderRadius: 8, border: 'none',
                      background: '#FEE2E2', color: '#B91C1C', fontSize: 12,
                      fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    ← Cerrar sesión
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
