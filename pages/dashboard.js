import { skills } from "../utils/const"

import Shell from '../components/Shell'
import ReferralList from '../components/ReferralList'
import ScoresList from '../components/ScoresList'
import Head from 'next/head'

import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { web3Context } from "../context/web3Data"
import { UserDataContext } from "../context/userData"
import Badge from "../components/Badge"
import DashboardTile from "../components/DashboardTile"

const navigation = [
  { name: 'Your referrals', href: '/', current: false },
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'People', href: '/people', current: false },
  { name: 'Refer a friend', href: '/refer', current: false },
]

export default function Home() {
  
  const { signer } = useContext(web3Context)
  const { userData } = useContext(UserDataContext)
  const [referrals, setReferrals] = useState([])
  const [badges, setBadges] = useState([])
  const [scores, setScores] = useState([])

  const header_text = userData.ens_name ? `Welcome back, ${userData.ens_name}` : ``

  return (
    <div>
      <Head>
        <title>Mazury app</title>
        <link rel="icon" href="/waves.png" />
      </Head>

      <Shell
        navigation={navigation}
        header={header_text}
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
          <div className="flex flex-row justify-center w-full">
            <DashboardTile
              href="/people?q=top_aave_gov"
              title="Top aave governance"
            />
            <DashboardTile
              href="/people?q=referred_by_fabric"
              title="Referred by Fabric"
            />
            <DashboardTile
              href="/people?q=open"
              title="Open to opportunities"
            />
            <DashboardTile
              href="/people?q=verified_with_twitter"
              title="Verified with twitter"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
