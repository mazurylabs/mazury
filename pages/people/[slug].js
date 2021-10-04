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
  const [address, setAddress] = useState([])
  
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

    const result = await axios.post(
      "https://api.studio.thegraph.com/query/5950/mazury-test-1/v1.0.0",
      {
        query: `{
          attestations(where: {recipient: \"${address}\", revoked: false, schema: \"0xee610047e16d27b734e6f37c41a2cc06984381dec683f744791d236aeddf0769\"}) {
            id
            data
            recipient
            attester
          }
        }`,
      }
    );

    const receivedReferrals = []
    for (const referral of result.data.data.attestations) {
      receivedReferrals.push(
        {
          "author": referral.attester,
          "skills": parseReferralData(referral.data)
        }
      )
    }
    setReferrals(receivedReferrals)
  }

  function parseReferralData(data) {

    const AbiCoder = ethers.utils.AbiCoder;
    const abiCoder = new AbiCoder();
    const types = [ ...Array(skills.length).keys() ].map( i => "bool");

    const boolArray = abiCoder.decode(
      types,
      data
    )

    const parsedData = []
    
    skills.forEach(function (skill, index) {
      if(boolArray[index]){
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
            referrals={referrals}
            scores={scores}
          />
        </div>
      </main>
    </div>
  )
}

export default Person