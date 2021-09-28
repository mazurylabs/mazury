import Shell from '../components/Shell'
import ReferralList from '../components/ReferralList'
import ScoresList from '../components/ScoresList'
import Head from 'next/head'

import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Your referrals', href: '/scores', current: true },
  { name: 'People', href: '/people', current: false },
  { name: 'Jobs', href: '/jobs', current: false },
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
        header={"Your referrals & scores"}
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
          <div className="bg-white rounded-lg h-96 shadow flex-grow md:mr-10 overflow-y-auto mb-10 md:mb-auto">
            <ReferralList />
          </div>
          <div className="bg-white rounded-lg h-96 shadow px-5 py-2 sm:px-6 md:w-80 lg:w-96">
            <ScoresList />
          </div>
        </div>
      </main>
    </div>
  )
}
