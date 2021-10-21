import 'tailwindcss/tailwind.css'

import { UserDataDataProvider } from '../context/userData'
import { Web3ContextProvider } from '../context/web3Data'

function MyApp({ Component, pageProps }) {
  return (
    <Web3ContextProvider>
      <UserDataDataProvider>
        <Component {...pageProps} />
      </UserDataDataProvider>
    </Web3ContextProvider>
  )
}

export default MyApp
