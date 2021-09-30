import { ethers } from "ethers";
import axios from "axios";
import { skills } from "../utils/const"

import Shell from '../components/Shell'
import Head from 'next/head'
import PeopleList from '../components/PeopleList'
import PeopleSearch from '../components/PeopleSearch'

import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Your referrals', href: '/', current: false },
  { name: 'People', href: '/people', current: true },
  { name: 'Jobs', href: '/jobs', current: false },
  { name: 'Refer a friend', href: '/refer', current: false },
]

export default function Home() {
  
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [chainId, setChainId] = useState(4)
  const [people, setPeople] = useState([])

  useEffect(() => {
    fetchPeople()
  }, [])
  
  async function fetchPeople() {

    const result = await axios.post(
      "https://api.studio.thegraph.com/query/5950/mazury-test-1/v1.0.0",
      {
        query: `{
          attestations(where: {revoked: false, schema: \"0xee610047e16d27b734e6f37c41a2cc06984381dec683f744791d236aeddf0769\"}) {
            id
            data
            recipient
          }
        }`,
      }
    );

    const peopleReferrals = {}
    const peopleReferralsList = []

    for (const referral of result.data.data.attestations) {
      if (referral.recipient in peopleReferrals) {
        peopleReferrals[referral.recipient].push(referral.data)
      } else {
        peopleReferrals[referral.recipient] = [referral.data]
      }
    }

    console.log(peopleReferrals)

    for (const [address, referralsData] of Object.entries(peopleReferrals)){
      peopleReferrals[address] = referralsDataToScores(referralsData)
    }

    console.log(peopleReferrals)

    for (const [address, referralData] of Object.entries(peopleReferrals)){
      peopleReferralsList.push(
        {
          "address": address,
          "skills": referralData
        }
      )
    }

    setPeople(peopleReferralsList)
  }

  function referralsDataToScores(data) {
    const AbiCoder = ethers.utils.AbiCoder;
    const abiCoder = new AbiCoder();
    const types = [ ...Array(skills.length).keys() ].map( i => "bool");

    const userScores = {}

    for (const referralData of data){
      const boolArray = abiCoder.decode(
        types,
        referralData
      )
      
      skills.forEach(function (skill, index) {
        if(boolArray[index]){
          if(skill.humanName in userScores){
            userScores[skill.humanName] = userScores[skill.humanName] +1
          } else {
            userScores[skill.humanName] = 1
          }
        }
      });
    }

    const userScoresList = []
    for (const [skill, score] of Object.entries(userScores)) {
      userScoresList.push(
        {
          "name": skill,
          "score": score
        }
      )
    }

    return userScoresList
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
            <PeopleList
              people={people}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
