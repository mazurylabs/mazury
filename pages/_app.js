import 'tailwindcss/tailwind.css'

import { UserDataDataProvider } from '../context/userData'

function MyApp({ Component, pageProps }) {
  return (
    <UserDataDataProvider>
      <Component {...pageProps} />
    </UserDataDataProvider>
  )
}

export default MyApp
