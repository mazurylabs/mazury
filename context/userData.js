import { createContext, useState } from 'react'

export const UserDataContext = createContext()

export function UserDataDataProvider({ children }) {
  const [userData, setUserData] = useState({})
  const [loadingUserData, setLoadingUserData] = useState({})
  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        loadingUserData,
        setLoadingUserData
      }}
    >
      {children}
    </UserDataContext.Provider>
  )
}
