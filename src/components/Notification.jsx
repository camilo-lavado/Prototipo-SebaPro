import { BellIcon } from '@heroicons/react/24/solid'

export default function Notification({ icon, msg }) {
  const IconEl = icon ?? <BellIcon style={{ width: 22, height: 22 }} />
  return (
    <div className="notification">
      <span style={{ display: 'flex', alignItems: 'center' }}>{IconEl}</span>
      <span>{msg}</span>
    </div>
  )
}
