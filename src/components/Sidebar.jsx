const NAV_ITEMS = [
  { id: 'academia', icon: '🎓', label: 'Academia' },
  { id: 'notas',    icon: '📝', label: 'Notas' },
  { id: 'biblioteca', icon: '📚', label: 'Bibliot.' },
  { id: 'seguro',   icon: '🛡️', label: 'Seguro' },
  { id: 'sebapro',  icon: '🌳', label: 'SebaPro' },
]

export default function Sidebar({ activeView, onNavigate }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo" title="SebaPro Connect">
        <img src="/logo2.jpg" alt="SebaPro Connect" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 8, background: 'white', padding: 2 }} />
      </div>
      {NAV_ITEMS.map(item => (
        <div
          key={item.id}
          className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
          title={item.label}
        >
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
