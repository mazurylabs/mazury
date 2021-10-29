import axios from "axios";
import { ethers } from "ethers";
import { skills } from "../../utils/const"

import Shell from '../../components/Shell'
import UserProfile from '../../components/UserProfile'
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
  const [address, setAddress] = useState("")
  const [username, setUsername] = useState("")
  const [avatar, setAvatar] = useState("")
  
  const router = useRouter()

  useEffect(() => {
    fetchReferrals()
  }, [address])

  useEffect(() => {
    if(!router.isReady) return;
    if(router.query.slug){
      setAddress(router.query.slug)
    }
  }, [router.isReady])

  async function fetchReferrals() {

    const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/referrals/?receiver=${address}`)
    const profileData = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/${address}`)

    setAvatar(profileData.data["avatar"])
    setUsername(profileData.data["ens_name"])

    const receivedReferrals = []

    for (const referral of result.data) {
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

    setScores(scores)
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
          <UserProfile
            address={address}
            avatar={avatar}
            username={username}
            referrals={referrals}
            scores={scores}
          />
        </div>
      </main>
    </div>
  )
}

export default Person