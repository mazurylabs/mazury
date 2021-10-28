import axios from "axios";
import { skills } from "../utils/const"

import Shell from '../components/Shell'
import Head from 'next/head'
import PeopleList from '../components/PeopleList'
import PeopleSearch from '../components/PeopleSearch'

import { useState, useEffect, useContext } from 'react';

const navigation = [
  { name: 'Your referrals', href: '/', current: false },
  { name: 'People', href: '/people', current: true },
  { name: 'Jobs', href: '/jobs', current: false },
  { name: 'Refer a friend', href: '/refer', current: false },
]

export default function Home() {
  
  const [people, setPeople] = useState([])
  const [displayPeople, setDisplayPeople] = useState([])

  useEffect(() => {
    fetchPeople()
  }, [])
  
  async function fetchPeople() {

    const result = await axios.get("https://mazury-staging.herokuapp.com/profiles/");

    const people = []
    let profile_skills;
    for (const profile of result.data) {
      
      profile_skills = []
      skills.forEach(function (skill, index) {
        if(profile[skill.easName] > 0){
          profile_skills.push(
            {
              "name": skill.humanName,
              "score": profile[skill.easName],
            }
          )
        }
      });
      people.push(
        {
          "address": profile.eth_address,
          "username": profile.ens_name,
          "avatar": profile.avatar,
          "skills": profile_skills
        }
      )
    }

    setPeople(people)
    setDisplayPeople(people)
  }
  
  return (
    <div>
      <Head>
        <title>Mazury app</title>
        <link rel="icon" href="/waves.png" />
      </Head>

      <Shell
        navigation={navigation}
        header={"People"}
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto mb-5 flex flex-row justify-end w-full px-4 sm:px-6 lg:px-8 -mt-48">
          <div className="w-64">
            <PeopleSearch
              people={people}
              setDisplayPeople={setDisplayPeople}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow">
            <PeopleList
              people={displayPeople}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
