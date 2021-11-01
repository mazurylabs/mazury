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
  const [startPage, setStartPage] = useState(0)
  const [endPage, setEndPage] = useState(20)
  const [prevPageURL, setPrevPageURL] = useState(null)
  const [nextPageURL, setNextPageURL] = useState(null)
  const [totalPeopleCount, setTotalPeopleCount] = useState(0)

  useEffect(() => {
    fetchPeople()
  }, [])
  
  async function fetchPeople(direction="", query="") {

    let result;

    if(direction == "next") {
      if(nextPageURL == null) return
      result = await axios.get(nextPageURL);
      setStartPage(startPage+20)
      setEndPage(Math.min(endPage+20, totalPeopleCount))
    } else if(direction == "prev") {
      if(prevPageURL == null) return
      result = await axios.get(prevPageURL);
      setStartPage(Math.max(startPage-20, 0))
      setEndPage(Math.max(endPage-20, 20))
    } else if(query != "") {
      try{
        result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles?empty=false&q=${query}`);
      } catch {
        console.log("search failed")
        return
      }
    } else {
      result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles?empty=false`);
    }

    setPrevPageURL(result.data.previous)
    setNextPageURL(result.data.next)

    const people = []
    setTotalPeopleCount(result.data.count)
    let profile_skills;
    for (const profile of result.data.results) {
      
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
              fetchPeople={fetchPeople}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow">
            <PeopleList
              startPage={startPage}
              endPage={endPage}
              totalPeopleCount={totalPeopleCount}
              people={displayPeople}
              fetchPeople={fetchPeople}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
