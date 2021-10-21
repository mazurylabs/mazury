import { skills } from "../utils/const"

import Shell from '../components/Shell'
import ChangeProfileForm from "../components/ChangeProfileForm";
import Head from 'next/head'

import axios from "axios";
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Your referrals', href: '/', current: true },
  { name: 'People', href: '/people', current: false },
  { name: 'Jobs', href: '/jobs', current: false },
  { name: 'Refer a friend', href: '/refer', current: false },
]

export default function Home() {
  
  const [chainId, setChainId] = useState(4)

  return (
    <div>
      <Head>
        <title>Mazury app</title>
        <link rel="icon" href="/waves.png" />
      </Head>

      <Shell
        chainId={chainId}
        setChainId={setChainId}
        navigation={navigation}
        header={"Your profile"}
      />
      <main className="-mt-32">
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow">
            <ChangeProfileForm />
          </div>
        </div>
      </main>
    </div>
  )
}
