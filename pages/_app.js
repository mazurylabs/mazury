import 'tailwindcss/tailwind.css'
import PlausibleProvider from 'next-plausible'

import { UserDataDataProvider } from '../context/userData'
import { Web3ContextProvider } from '../context/web3Data'

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="app.mazury.xyz">
      <Web3ContextProvider>
        <UserDataDataProvider>
          <Component {...pageProps} />
        </UserDataDataProvider>
      </Web3ContextProvider>
    </PlausibleProvider>
  )
}

export default MyApp
