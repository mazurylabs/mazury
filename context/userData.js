import { createContext, useContext, useState } from 'react'

const UserDataContext = createContext()

export function UserDataDataProvider({ children }) {
  const [userData, setUserData] = useState({})
  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  )
}

export function useUserData() {
  const context = useContext(UserDataContext)

  if (!context)
    throw new Error('useUserData must be used inside a `UserDataDataProvider`')

  return context
}