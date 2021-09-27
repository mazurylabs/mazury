import Shell from '../components/Shell'
import Head from 'next/head'
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Your referrals', href: '/scores', current: false },
  { name: 'People', href: '/people', current: false },
  { name: 'Jobs', href: '/jobs', current: false },
  { name: 'Refer a friend', href: '/refer', current: false },
]

export default function Home() {

  const [provider, setProvider] = useState(null)

  return (
    <div>
      <Head>
        <title>Mazury app</title>
        <link rel="icon" href="/waves.png" />
      </Head>

      <Shell
        provider={provider}
        setProvider={setProvider}
        navigation={navigation}
        header={"Welcome back, anon"}
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="border-gray-300 h-full px-5 py-6 md:px-16 max-w-screen-md mx-auto md:flex-row">
              <h2 className="text-3xl font-semibold mb-4">Work in progress</h2>
              <p className="mb-4">If you're among special ones seeing this screen please let me know what should be the UX for somebody entering the platform 🌊🌊🌊</p>
              <p className="mb-4">Go to "Refer a friend" to make a referral, go to "People" to stalk people who received at least one referral or to "Your referrals" to see who referred you.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
