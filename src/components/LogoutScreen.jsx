import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

export default function LogoutScreen({ user, onVolver }) {
  useEffect(() => {
    const t = setTimeout(() => onVolver(), 3500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0D3320 0%, #1A5C38 55%, #216B42 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 32,
    }}>
      {/* Logo grande */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
        style={{
          width: 140, height: 140, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          border: '3px solid rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 32,
          boxShadow: '0 0 60px rgba(82,201,132,0.2)',
        }}
      >
        <img
          src="/logo.jpg"
          alt="SebaPro Connect"
          style={{ width: 118, height: 118, borderRadius: '50%', objectFit: 'contain' }}
        />
      </motion.div>

      {/* Texto */}
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
        Instituto Profesional San Sebastián
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
        style={{ fontSize: 26, fontWeight: 900, color: '#ffffff', marginBottom: 8, textAlign: 'center' }}
      >
        ¡Hasta pronto, {user?.nombre?.split(' ')[0]}!
      </motion.div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', textAlign: 'center', maxWidth: 320, lineHeight: 1.6, marginBottom: 40 }}>
        Tu sesión ha sido cerrada de forma segura. Tus créditos y avances están guardados.
      </div>

      {/* Barra de progreso de redirección */}
      <div style={{ width: 200, height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 99, marginBottom: 24, overflow: 'hidden' }}>
        <div style={{
          height: '100%', background: '#52C984', borderRadius: 99,
          animation: 'logout-progress 3.5s linear forwards',
        }} />
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 32 }}>
        Redirigiendo al inicio de sesión…
      </div>

      {/* Botón manual */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        onClick={onVolver}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.8)', borderRadius: 12, padding: '10px 22px',
          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      >
        <ArrowRightOnRectangleIcon style={{ width: 16, height: 16 }} />
        Volver al inicio
      </motion.button>

      <style>{`
        @keyframes logout-progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  )
}
