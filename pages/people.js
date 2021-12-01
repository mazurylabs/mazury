import axios from "axios";
import { skills } from "../utils/const"

import Shell from '../components/Shell'
import Head from 'next/head'
import { useRouter } from "next/router";
import { UserDataContext } from "../context/userData"
import PeopleList from '../components/PeopleList'
import PeopleSearch from '../components/PeopleSearch'
import Footer from "../components/Footer";

import { useState, useEffect, useContext } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', current: false },
  { name: 'My profile', href: '/me', current: false },
  { name: 'People', href: '/people', current: true },
  { name: 'Refer a friend', href: '/refer', current: false },
]

export default function People() {

  const { userData } = useContext(UserDataContext)
  const [people, setPeople] = useState([])
  const [displayPeople, setDisplayPeople] = useState([])
  const [startPage, setStartPage] = useState(0)
  const [endPage, setEndPage] = useState(20)
  const [prevPageURL, setPrevPageURL] = useState(null)
  const [nextPageURL, setNextPageURL] = useState(null)
  const [totalPeopleCount, setTotalPeopleCount] = useState(0)
  const [headerText, setHeaderText] = useState("People")
  const [loadingPeople, setLoadingPeople] = useState(true)
  const router = useRouter();

  useEffect(() => {
    if(!router.isReady) return;
    if(router.query.q){
      fetchPeople("", router.query.q)
      if(router.query.q == "lcf") {
        setHeaderText("Le crypto fellows")
      }
      else if(router.query.q == "top_aave_gov") {
        setHeaderText("Aave governance")
      }
      else if(router.query.q == "open") {
        setHeaderText("Open to new projects")
      }
      else if(router.query.q == "early_adopters") {
        setHeaderText("Mazury early adopters")
      }

    } else {
      fetchPeople()
    }
  }, [router.isReady])
  
  async function fetchPeople(direction="", query="") {
    setLoadingPeople(true)
    setPeople([])
    setDisplayPeople([])

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
        result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles?q=${query}`);
        setEndPage(Math.min(result.data.count, 20))
      } catch {
        console.log("search failed")
        return
      }
    } else {
      result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles`);
      setEndPage(Math.min(result.data.count, 20))
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
      const profile_roles = []
      if(profile.role_developer){
        profile_roles.push("💻")
      }
      if(profile.role_designer){
        profile_roles.push("🎨")
      }
      if(profile.role_trader){
        profile_roles.push("📈")
      }
      if(profile.role_creator){
        profile_roles.push("✨")
      }
      if(profile.role_researcher){
        profile_roles.push("📚")
      }
      if(profile.role_investor){
        profile_roles.push("💰")
      }
      if(profile.role_community_manager){
        profile_roles.push("🐒")
      }
      people.push(
        {
          "address": profile.eth_address,
          "username": profile.username,
          "avatar": profile.avatar,
          "badges": profile.top_badges,
          "referred_by": profile.referred_by,
          "roles": profile_roles
        }
      )
    }

    setPeople(people)
    setDisplayPeople(people)
    setLoadingPeople(false)
  }
  
  return (
    <div>
      <Head>
        <title>Mazury app</title>
        <link rel="icon" href="/waves.png" />
      </Head>

      <Shell
        navigation={navigation}
        header={headerText}
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto mb-5 flex flex-row justify-end w-full px-4 sm:px-6 lg:px-8 -mt-48">
          {userData.eth_address == "" // only show to whitelisted adddresses
          ?
            <div className="w-72">
              <PeopleSearch
                people={people}
                setDisplayPeople={setDisplayPeople}
                fetchPeople={fetchPeople}
              />
            </div>
          :
            <div className="h-10">
              <p className="text-white md:pr-4">Search & filters coming soon</p>
            </div>
          }
        </div>
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow">
            <PeopleList
              startPage={startPage}
              endPage={endPage}
              totalPeopleCount={totalPeopleCount}
              people={displayPeople}
              fetchPeople={fetchPeople}
              loading={loadingPeople}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
