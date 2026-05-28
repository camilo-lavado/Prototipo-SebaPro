import { createContext, useContext, useState } from 'react'
import { USERS } from '../data/users'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(USERS[0])
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, USERS }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
