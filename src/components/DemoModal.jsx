import { XMarkIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

export default function DemoModal({ open, onClose, feature = 'Esta función' }) {
  if (!open) return null
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white', borderRadius: 20, padding: '32px 28px',
          maxWidth: 360, width: '100%', textAlign: 'center',
          boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14,
            background: '#F3F4F6', border: 'none', borderRadius: 8,
            width: 30, height: 30, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <XMarkIcon style={{ width: 16, height: 16, color: '#6B7280' }} />
        </button>

        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'linear-gradient(135deg, #E6F5ED, #B3DFC5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <RocketLaunchIcon style={{ width: 30, height: 30, color: '#1A5C38' }} />
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: '#3A9E68', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
          Demo Visual
        </div>

        <div style={{ fontSize: 17, fontWeight: 800, color: '#0D3320', marginBottom: 10, lineHeight: 1.3 }}>
          {feature}
        </div>

        <div style={{ fontSize: 13, color: '#4A7260', lineHeight: 1.6, marginBottom: 24 }}>
          Esta funcionalidad está planificada para la versión de producción del sistema SebaPro Connect.
        </div>

        <div style={{
          background: '#F0F9F4', border: '1px solid #B3DFC5',
          borderRadius: 10, padding: '10px 16px',
          fontSize: 11, color: '#2E7D52', fontWeight: 600,
          marginBottom: 20,
        }}>
          Próximamente disponible en el portal IPSS
        </div>

        <button
          onClick={onClose}
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Entendido
        </button>
      </div>
    </div>
  )
}
