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

const navigation = [
  { name: 'Your referrals', href: '/', current: true },
  { name: 'People', href: '/people', current: false },
  { name: 'Jobs', href: '/jobs', current: false },
  { name: 'Refer a friend', href: '/refer', current: false },
]

export default function Home() {
  
  const { signer } = useContext(web3Context)
  const { userData } = useContext(UserDataContext)
  const [referrals, setReferrals] = useState([])
  const [badges, setBadges] = useState([])
  const [scores, setScores] = useState([])

  const header_text = userData.ens_name ? `Welcome back, ${userData.ens_name}` : ``

  useEffect(() => {
    if(signer){
      fetchReferrals()
      fetchBadges()
    }
  }, [signer])

  async function fetchReferrals() {
    const address = await signer.getAddress()

    const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/referrals/?receiver=${address}`)
    const profileData = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/${address}`)

    const receivedReferrals = []

    for (const referral of result.data.results) {
      receivedReferrals.push(
        {
          "author_address": referral.author.eth_address,
          "author_username": referral.author.ens_name,
          "author_avatar": referral.author.avatar,
          "skills": parseReferralData(referral)
        }
      )
    }
    setReferrals(receivedReferrals)

    const scores = []

    skills.forEach(function (skill, index) {
      if(profileData.data[skill.easName] > 0){
        scores.push(
          {
            "name": skill.humanName,
            "score": profileData.data[skill.easName]
          }
        )
      }
    });

    setScores(scores.slice(0,4))

  }

  async function fetchBadges() {
    const address = await signer.getAddress()

    const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/badges/?owner=${address}`)
    const result_types = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/badge_types`)

    // todo get exactly types that are needed

    const owned_badges = []

    for (const badge of result.data.results) {
      owned_badges.push(
        {
          "image": badge.badge_type.image,
          "title": badge.badge_type.title,
          "description": badge.badge_type.description,
          "total_supply": result_types.data.results.find(type => type.title == badge.badge_type.title).total_supply
        }
      )
    }

    console.log(owned_badges)

    setBadges(owned_badges)
  }

  function parseReferralData(data) {

    const parsedData = []
    
    skills.forEach(function (skill, index) {
      if(data[skill.easName]){
        parsedData.push(skill)
      }
    });

    return parsedData
  }

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
          <div className="bg-white rounded-lg h-96 shadow flex-grow md:mr-10 overflow-y-auto mb-10 md:mb-auto">
            <ReferralList
              referrals={referrals}
            />
          </div>
        </div>
        <h2 className="text-4xl font-medium max-w-7xl w-full mx-auto pb-4 px-4 sm:px-6 lg:px-8">
          Badges
        </h2>
        <div className="max-w-7xl w-full mx-auto pb-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-6">
          {badges.map((badge) => (
            <Badge
              key={badge.title}
              image={badge.image}
              title={badge.title}
              description={badge.description}
              total_supply={badge.total_supply}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
