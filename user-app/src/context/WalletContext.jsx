import { createContext, useState } from "react"

export const WalletContext = createContext()

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(50000)

  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  )
}