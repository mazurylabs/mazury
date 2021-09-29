import Shell from '../components/Shell'
import Head from 'next/head'

import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Your referrals', href: '/', current: false },
  { name: 'People', href: '/people', current: false },
  { name: 'Jobs', href: '/jobs', current: true },
  { name: 'Refer a friend', href: '/refer', current: false },
]

export default function Home() {

  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [chainId, setChainId] = useState(4)

  return (
    <div>
      <Head>
        <title>Mazury app</title>
        <link rel="icon" href="/waves.png" />
      </Head>

      <Shell
        provider={provider}
        setProvider={setProvider}
        signer={signer}
        setSigner={setSigner}
        chainId={chainId}
        setChainId={setChainId}
        navigation={navigation}
        header={"Jobs"}
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg h-96 shadow px-5 py-6 sm:px-6">
            <div className="border-gray-300 h-full px-5 py-6 md:px-16 max-w-screen-md mx-auto md:flex-row">
              <h2 className="text-3xl font-semibold mb-4">Jobs are coming</h2>
              <p className="mb-4">The feature is not active yet, but soon you will be able to see & apply for jobs at the best DAOs, web3 startups and our other partners.</p>
              <p className="mb-4">All you need to apply is your reputation score, so <button className="font-semibold text-green-500 text-opacity-80">grab your link</button> and reach out to your friends for a referral :)</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
