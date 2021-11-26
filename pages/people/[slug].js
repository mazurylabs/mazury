import axios from "axios";
import { ethers } from "ethers";
import { skills } from "../../utils/const"

import Shell from '../../components/Shell'
import UserProfile from '../../components/UserProfile'
import Badge from "../../components/Badge";
import Head from 'next/head'
import Footer from "../../components/Footer";

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', current: false },
  { name: 'My profile', href: '/me', current: false },
  { name: 'People', href: '/people', current: true },
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
  const [poaps, setPoaps] = useState([])
  const [loading, setLoading] = useState(true)
  
  const router = useRouter()

  useEffect(() => {
    if(profileData != null){
      fetchReferrals()
      fetchBadges()
      fetchPaops()
      setLoading(false)
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

  async function fetchPaops() {
    const result = await axios.get(`https://api.poap.xyz/actions/scan/${profileData.eth_address}`)

    setPoaps(result.data)
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
          "skills": parseReferralData(referral),
          "content": referral.content
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
      {!loading
      ?
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto mb-5 flex flex-row justify-end w-full px-4 sm:px-6 lg:px-8 -mt-48">
          {profileData &&
            <UserProfile
              address={profileData.eth_address}
              avatar={profileData.avatar}
              username={profileData.ens_name}
              referrals={referrals}
              scores={scores}
              bio={profileData.bio}
              email={profileData.email}
              twitter={profileData.twitter}
            />
          }
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
        <h2 className="text-4xl font-medium max-w-7xl w-full mx-auto pb-4 px-4 sm:px-6 lg:px-8">
          POAPs
        </h2>
        {poaps.length > 0
          ?
            <div className="max-w-7xl mx-auto pb-12 grid grid-cols-5 gap-y-6 gap-x-6 place-items-center">
              {poaps.map(poap => (
                <a target="_blank" href={poap.event.event_url}>
                  <img className="rounded-full w-24 h-24 lg:w-28 lg:h-28 shadow mx-auto" src={poap.event.image_url} />
                </a>
              ))}
            </div>
          :
            <div className="max-w-7xl mx-auto pb-12 grid grid-cols-5 gap-y-6 gap-x-6 place-items-center">
              No poaps
            </div>
        }
      </main>
      :
        <div className="mt-10 flex flex-row justify-center items-center">
          <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      }
      <Footer />
    </div>
  )
}

export default Person