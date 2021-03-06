import { skills } from "../utils/const"

import Shell from '../components/Shell'
import ReferralList from '../components/ReferralList'
import ScoresList from '../components/ScoresList'
import Head from 'next/head'

import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link'
import { web3Context } from "../context/web3Data"
import { UserDataContext } from "../context/userData"
import AllBadgesModal from "../components/AllBadgesModal"
import Badge from "../components/Badge"
import Footer from "../components/Footer"

const navigation = [
  { name: 'Dashboard', href: '/', current: false },
  { name: 'My profile', href: '/me', current: true },
  { name: 'People', href: '/people', current: false },
  { name: 'Refer a friend', href: '/refer', current: false },
]

export default function Home() {
  
  const { signer } = useContext(web3Context)
  const { userData } = useContext(UserDataContext)
  const [referrals, setReferrals] = useState([])
  const [badges, setBadges] = useState([])
  const [scores, setScores] = useState([])
  const [poaps, setPoaps] = useState([])
  const [loadingReferrals, setLoadinReferrals] = useState(true)
  const [showBadges, setShowBadges] = useState(false)
  const [allBadges, setAllBadges] = useState([])

  let header_text;
  
  if (userData.username && userData.username.length > 36) {
    header_text = `Welcome back, ${userData.username.slice(0, 5)}...${userData.username.slice(-3)}`
  } else {
    header_text = `Welcome back, ${userData.username}`
  }

  useEffect(() => {
    if(signer){
      fetchReferrals()
      fetchBadges()
      fetchPaops()
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
          "author_username": referral.author.username,
          "author_avatar": referral.author.avatar,
          "skills": referral.skills,
          "content": referral.content
        }
      )
    }
    setReferrals(receivedReferrals)
    setLoadinReferrals(false)

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

    setBadges(owned_badges)
    setAllBadges(result_types.data.results)
  }

  async function fetchPaops() {
    const address = await signer.getAddress()

    const result = await axios.get(`https://api.poap.xyz/actions/scan/${address}`)

    setPoaps(result.data)
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
      {!(userData && Object.keys(userData).length === 0)
      ?
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
              <Link href={`/people/${userData.username}`}>
                <a
                  className="inline-flex items-center px-4 py-1 border border-transparent text-base font-normal rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-700 focus:outline-none mx-2 mb-2 md:mb-0"
                >
                  Go to your public profile
                </a>
              </Link>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("https://mzry.me/" + userData.username).then(() => alert(`https://mzry.me/${userData.username} copied to clipboard`))
                }}
                className="inline-flex items-center px-4 py-1 border border-transparent text-base font-normal rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-400 focus:outline-none mx-2"
              >
                Copy your link
              </button>
            </div>
          <div className="bg-white rounded-lg max-h-96 shadow flex-grow md:mr-10 overflow-y-auto mb-10 md:mb-auto">
            <ReferralList
              referrals={referrals}
              loading={loadingReferrals}
            />
          </div>
        </div>
        <h2 className="text-4xl font-medium max-w-7xl w-full mx-auto pb-4 px-4 sm:px-6 lg:px-8">
          Badges
        </h2>
        {badges.length > 0
        ?
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
        :
          <p className="max-w-7xl mx-auto text-center py-4 md:pr-8 text-sm text-gray-700">No badges</p>
        }
        <div className="max-w-7xl mx-auto text-center py-4 md:pr-8 mt-12">
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            onClick={() => setShowBadges(!showBadges)}
          >
            Show all available badges
          </button>
        </div>
        <AllBadgesModal
          open={showBadges}
          setOpen={setShowBadges}
          badges={allBadges}
        />
        <h2 className="text-4xl font-medium max-w-7xl w-full mx-auto pb-4 px-4 sm:px-6 lg:px-8">
          POAPs
        </h2>
        {poaps.length > 0
          ?
            <div className="max-w-2xl mx-auto pb-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-6">
              {poaps.map(poap => (
                <a key={poap.event.id} target="_blank" href={poap.event.event_url}>
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
      <p className="text-lg text-gray-700 text-center mt-12">Connect wallet to manage your web3 profile</p>
      }
      <Footer />
    </div>
  )
}
