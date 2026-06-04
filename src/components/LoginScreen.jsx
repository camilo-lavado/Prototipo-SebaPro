import { useState } from 'react'
import { useUser } from '../context/UserContext'
import Avatar from './Avatar'
import { LockOpenIcon, CheckIcon } from '@heroicons/react/24/outline'

export default function LoginScreen({ onLogin }) {
  const { USERS, currentUser, setCurrentUser } = useUser()
  const [step, setStep] = useState('select') // 'select' | 'form'
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="login-screen">
      <style>{`
        @media (max-width: 480px) {
          .login-card {
            width: calc(100% - 32px);
            max-width: 400px;
            padding: 24px 20px;
          }
          .login-user-btn {
            padding: 9px 12px;
            gap: 10px;
          }
        }
      `}</style>
      {/* Logo superior */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)',
          letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4,
        }}>
          Instituto Profesional San Sebastián
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 1 }}>
          Tu conocimiento y tu esfuerzo pagan tu carrera
        </div>
      </div>

      <div className="login-card">
        <div className="login-logo">
          <img src="/logo.jpg" alt="SebaPro Connect" style={{ width: 110, height: 110, objectFit: 'contain', borderRadius: '50%' }} />
        </div>

        <div className="login-title">SebaPro Connect</div>
        <div className="login-sub">
          {step === 'select' ? 'Selecciona tu cuenta de prueba' : `Bienvenido/a, ${currentUser.nombre.split(' ')[0]}`}
        </div>

        {step === 'select' && (
          <>
            <div className="login-user-select">
              {USERS.map(u => (
                <div
                  key={u.id}
                  className={`login-user-btn ${currentUser.id === u.id ? 'selected' : ''}`}
                  onClick={() => setCurrentUser(u)}
                >
                  <Avatar user={u} size={42} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0D3320' }}>{u.nombre}</div>
                    <div style={{ fontSize: 11, color: '#4A7260', marginTop: 1 }}>
                      {u.carrera.split(' ').slice(0, 3).join(' ')} · {u.nivel}
                    </div>
                  </div>
                  {currentUser.id === u.id && (
                    <CheckIcon style={{ width: 18, height: 18, color: '#2E7D52', flexShrink: 0 }} />
                  )}
                </div>
              ))}
            </div>
            <button
              className="login-btn"
              style={{ marginTop: 20 }}
              onClick={() => setStep('form')}
            >
              Continuar →
            </button>
          </>
        )}

        {step === 'form' && (
          <form onSubmit={handleLogin}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', background: '#F0F9F4',
              borderRadius: 10, marginBottom: 18, border: '1px solid #B3DFC5',
            }}>
              <Avatar user={currentUser} size={36} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0D3320' }}>{currentUser.nombre}</div>
                <div style={{ fontSize: 11, color: '#4A7260' }}>{currentUser.rut}</div>
              </div>
              <button
                type="button"
                onClick={() => { setStep('select'); setPassword(''); setError('') }}
                style={{ marginLeft: 'auto', background: 'none', border: 'none', fontSize: 11, color: '#2E7D52', cursor: 'pointer', fontWeight: 600 }}
              >
                Cambiar
              </button>
            </div>

            <div style={{ background:'#F0F9F4', border:'1px solid #B3DFC5', borderRadius:8, padding:'9px 12px', fontSize:11, color:'#2E7D52', fontWeight:500, marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>
              <LockOpenIcon style={{ width:14, height:14, flexShrink:0 }} /> Modo demo — sin contraseña requerida
            </div>

            <button type="submit" className="login-btn">
              Ingresar →
            </button>
          </form>
        )}
      </div>

      <div style={{ marginTop: 24, fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
        Prototipo de Media Fidelidad · Mayo 2026
      </div>
    </div>
  )
}
