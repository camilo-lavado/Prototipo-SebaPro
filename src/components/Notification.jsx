export default function Notification({ icon, msg }) {
  return (
    <div className="notification">
      <span style={{ fontSize: 22 }}>{icon}</span>
      <span>{msg}</span>
    </div>
  )
}
