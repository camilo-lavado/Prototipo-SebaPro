import { useState } from 'react'
import { useUser } from '../context/UserContext'
import Avatar from './Avatar'
import { CheckIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

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
        <span className="topbar-meta">Vespertino · Junio 2026</span>

        <div style={{ position: 'relative' }}>
          <div className="user-chip" onClick={() => setOpen(o => !o)}>
            <div
              className="user-avatar"
                style={{ background: `linear-gradient(135deg, ${currentUser.color}, #1A5C38)` }}
            >
              <Avatar user={currentUser} size={32} />
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
                    <Avatar user={u} size={36} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0D3320' }}>{u.nombre}</div>
                      <div style={{ fontSize: 10, color: '#4A7260' }}>
                        {u.carrera.split(' ').slice(0, 3).join(' ')} · {u.nivel}
                      </div>
                    </div>
                    {currentUser.id === u.id && <CheckIcon style={{ width: 16, height: 16, color: '#2E7D52', flexShrink: 0 }} />}
                  </div>
                ))}

                <div style={{ borderTop: '1px solid #E2EDE8', marginTop: 6, paddingTop: 6 }}>
                  <button
                    onClick={() => { setOpen(false); onLogout() }}
                    style={{
                      width: '100%', padding: '9px', borderRadius: 8, border: 'none',
                      background: '#FEE2E2', color: '#B91C1C', fontSize: 12,
                      fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }}
                  >
                    <ArrowRightOnRectangleIcon style={{ width: 14, height: 14 }} />
                    Cerrar sesión
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
