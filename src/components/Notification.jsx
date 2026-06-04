import { motion } from 'framer-motion'
import { BellIcon } from '@heroicons/react/24/solid'

export default function Notification({ icon, msg }) {
  const IconEl = icon ?? <BellIcon style={{ width: 22, height: 22 }} />
  return (
    <motion.div
      className="notification"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      <span style={{ display: 'flex', alignItems: 'center' }}>{IconEl}</span>
      <span>{msg}</span>
    </motion.div>
  )
}
