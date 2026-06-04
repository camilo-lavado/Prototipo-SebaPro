// Siluetas SVG diferenciadas por género
function SiluetaFemenina({ color }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Cabello */}
      <ellipse cx="20" cy="12" rx="8.5" ry="9" fill={color} opacity="0.9" />
      <path d="M11.5 13 Q10 20 12 24 Q11 22 11.5 13Z" fill={color} opacity="0.85" />
      <path d="M28.5 13 Q30 20 28 24 Q29 22 28.5 13Z" fill={color} opacity="0.85" />
      {/* Cara */}
      <ellipse cx="20" cy="13" rx="6.5" ry="7.5" fill="white" opacity="0.25" />
      {/* Cuerpo femenino */}
      <path d="M13 26 Q13 23 20 22 Q27 23 27 26 L29 38 H11 Z" fill={color} opacity="0.85" />
      {/* Detalle cintura */}
      <path d="M14 29 Q20 27.5 26 29" stroke="white" strokeWidth="0.5" opacity="0.2" />
    </svg>
  )
}

function SiluetaMasculina({ color }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Cabello corto */}
      <ellipse cx="20" cy="12.5" rx="7.5" ry="7.5" fill={color} opacity="0.9" />
      <rect x="12.5" y="8" width="15" height="6" rx="2" fill={color} opacity="0.85" />
      {/* Cara */}
      <ellipse cx="20" cy="13.5" rx="6" ry="7" fill="white" opacity="0.22" />
      {/* Cuerpo cuadrado/masculino */}
      <path d="M11 26 Q11 23 20 22 Q29 23 29 26 L31 38 H9 Z" fill={color} opacity="0.85" />
      {/* Hombros anchos */}
      <path d="M11 26 L9 32" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
      <path d="M29 26 L31 32" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
    </svg>
  )
}

export default function Avatar({ user, size = 40, fontSize = 14 }) {
  const gradientId = `grad-${user.id}`
  const isFem = user.genero === 'femenino'

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      flexShrink: 0,
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${user.color}, #1A5C38)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {isFem
        ? <SiluetaFemenina color="rgba(255,255,255,0.9)" />
        : <SiluetaMasculina color="rgba(255,255,255,0.9)" />
      }
    </div>
  )
}
