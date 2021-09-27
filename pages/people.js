import Shell from '../components/Shell'
import Head from 'next/head'
import PeopleList from '../components/PeopleList'
import PeopleSearch from '../components/PeopleSearch'

import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Your scores', href: '/scores', current: false },
  { name: 'People', href: '/people', current: true },
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
        header={"People"}
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto mb-5 flex flex-row justify-end w-full px-4 sm:px-6 lg:px-8 -mt-48">
          <div className="w-64">
            <PeopleSearch />
          </div>
        </div>
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow">
            <PeopleList />
          </div>
        </div>
      </main>
    </div>
  )
}
