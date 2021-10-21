import { createContext, useState } from 'react'

export const UserDataContext = createContext()

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
