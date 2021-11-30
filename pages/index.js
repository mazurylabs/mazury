import { skills } from "../utils/const"

import Shell from '../components/Shell'

import PeopleList from '../components/PeopleList'
import Head from 'next/head'

import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { web3Context } from "../context/web3Data"
import { UserDataContext } from "../context/userData"
import Badge from "../components/Badge"
import DashboardTile from "../components/DashboardTile"
import Footer from "../components/Footer";

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'My profile', href: '/me', current: false },
  { name: 'People', href: '/people', current: false },
  { name: 'Refer a friend', href: '/refer', current: false },
]

export default function Dashboard() {
  
  const { signer } = useContext(web3Context)
  const { userData } = useContext(UserDataContext)
  const [people, setPeople] = useState([])
  const [displayPeople, setDisplayPeople] = useState([])
  const [startPage, setStartPage] = useState(0)
  const [endPage, setEndPage] = useState(20)
  const [prevPageURL, setPrevPageURL] = useState(null)
  const [nextPageURL, setNextPageURL] = useState(null)
  const [totalPeopleCount, setTotalPeopleCount] = useState(0)
  const [loadingPeople, setLoadingPeople] = useState(true)

  const header_text = `Welcome back, ${userData.username}`

  useEffect(() => {
    fetchPeople("", "connected")
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
          "skills": profile_skills,
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
        header=""
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
          <div className="flex flex-col md:flex-row justify-center items-center w-full">
            <DashboardTile
              icon="/aave.png"
              href="/people?q=top_aave_gov"
              title="Aave governance"
            />
            <DashboardTile
              icon="/lcf.jpg"
              href="/people?q=lcf"
              title="Le crypto fellows"
            />
            <DashboardTile
              icon="/open.png"
              href="/people?q=open"
              title="Open to opportunities"
            />
            <DashboardTile
              icon="/waves.png"
              href="/people?q=early_adopters"
              title="Mazury early adopters"
            />
          </div>
        </div>
        {!(userData && Object.keys(userData).length === 0)
        ?
          <div>
            <h2 className="text-4xl font-medium max-w-7xl w-full mx-auto pb-4 px-4 sm:px-6 lg:px-8">
              People in your communities
            </h2>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
              <div className="bg-white rounded-lg shadow w-full">
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
          </div>
          :
          <p className="text-lg text-gray-700 text-center">Connect wallet to explore your own web3 network</p>
        }
      </main>
      <Footer />
    </div>
  )
}
