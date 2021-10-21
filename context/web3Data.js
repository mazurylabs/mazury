import { createContext, useState } from 'react'

export const web3Context = createContext()

export function Web3ContextProvider({ children }) {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [chainId, setChainId] = useState(4)
  const [web3Modal, setWeb3Modal] = useState(null)

  return (
    <web3Context.Provider
      value={{
        provider,
        setProvider,
        signer,
        setSigner,
        chainId,
        setChainId,
        web3Modal,
        setWeb3Modal,
      }}
    >
      {children}
    </web3Context.Provider>
  )
}