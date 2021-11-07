import axios from "axios";
import { ethers } from "ethers";
import { skills } from "../../utils/const"

import Shell from '../../components/Shell'
import UserProfile from '../../components/UserProfile'
import Badge from "../../components/Badge";
import Head from 'next/head'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Your referrals', href: '/', current: false },
  { name: 'People', href: '/people', current: true },
  { name: 'Jobs', href: '/jobs', current: false },
  { name: 'Refer a friend', href: '/refer', current: false },
]

const Person = () => {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [chainId, setChainId] = useState(4)
  const [referrals, setReferrals] = useState([])
  const [scores, setScores] = useState([])
  const [badges, setBadges] = useState([])
  const [profileData, setProfileData] = useState(null)
  
  const router = useRouter()

  useEffect(() => {
    if(profileData != null){
      fetchReferrals()
      fetchBadges()
    }
  }, [profileData])

  useEffect(() => {
    if(!router.isReady) return;
    if(router.query.slug){
      fetchProfileData(router.query.slug)
    }
  }, [router.isReady])

  async function fetchProfileData(url_address) {
    const profileData = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/${url_address}`)
    setProfileData(profileData.data)
  }

  async function fetchReferrals() {

    const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/referrals/?receiver=${profileData.eth_address}`)

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
      if(profileData[skill.easName] > 0){
        scores.push(
          {
            "name": skill.humanName,
            "score": profileData[skill.easName]
          }
        )
      }
    });

    setScores(scores)
  }

  async function fetchBadges() {

    const result_badges = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/badges/?owner=${profileData.eth_address}`)
    const result_types = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/badge_types`)

    // todo get exactly types that are needed

    const owned_badges = []

    for (const badge of result_badges.data.results) {
      owned_badges.push(
        {
          "image": badge.badge_type.image,
          "title": badge.badge_type.title,
          "description": badge.badge_type.description,
          "total_supply": result_types.data.results.find(type => type.title == badge.badge_type.title).total_supply
        }
      )
    }

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
        provider={provider}
        setProvider={setProvider}
        signer={signer}
        setSigner={setSigner}
        chainId={chainId}
        setChainId={setChainId}
        navigation={navigation}
        header={""}
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto mb-5 flex flex-row justify-end w-full px-4 sm:px-6 lg:px-8 -mt-48">
          {profileData &&
            <UserProfile
              address={profileData.eth_address}
              avatar={profileData.avatar}
              username={profileData.ens_name}
              referrals={referrals}
              scores={scores}
            />
          }
        </div>
        <div className="max-w-5xl ml-20 pb-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
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

export default Person