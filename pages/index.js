import { ethers } from "ethers";
import { skills } from "../utils/const"

import Shell from '../components/Shell'
import ReferralList from '../components/ReferralList'
import ScoresList from '../components/ScoresList'
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
  
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [chainId, setChainId] = useState(4)
  const [referrals, setReferrals] = useState([])
  const [scores, setScores] = useState([])

  useEffect(() => {
    if(signer){
      fetchReferrals()
    }
  }, [signer])

  useEffect(() => {
    const scores = []
    const scoresDict = {}
    for (const referral of referrals) {
      for (const skill of referral.skills) {
        if (skill.humanName in scoresDict) {
          scoresDict[skill.humanName] = scoresDict[skill.humanName] + 1
        } else {
          scoresDict[skill.humanName] = 1
        }
      }
    }

    for (const [skill, score] of Object.entries(scoresDict)) {
      scores.push(
        {
          "name": skill,
          "score": score
        }
      )
    }

    scores.sort(function(a, b) {
      return b.score - a.score;
    });

    setScores(scores)
  }, [referrals])

  async function fetchReferrals() {
    const address = await signer.getAddress()

    const result = await axios.get(`https://mazury-staging.herokuapp.com/referrals/?receiver=${address}`)

    const receivedReferrals = []

    for (const referral of result.data) {
      receivedReferrals.push(
        {
          "author_address": referral.author.eth_address,
          "author_username": referral.author.ens_name,
          "skills": parseReferralData(referral)
        }
      )
    }
    setReferrals(receivedReferrals)
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
        header={"Your referrals & scores"}
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
          <div className="bg-white rounded-lg h-96 shadow flex-grow md:mr-10 overflow-y-auto mb-10 md:mb-auto">
            <ReferralList
              referrals={referrals}
            />
          </div>
          <div className="bg-white rounded-lg h-96 shadow px-5 py-2 sm:px-6 md:w-80 lg:w-96">
            <ScoresList
              scores={scores}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
