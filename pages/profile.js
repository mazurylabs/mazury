import Shell from '../components/Shell'
import ChangeProfileForm from "../components/ChangeProfileForm";
import { UserDataContext } from "../context/userData"
import { web3Context } from "../context/web3Data"
import Head from 'next/head'

import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import Router, { useRouter } from "next/router";

const navigation = [
  { name: 'Your referrals', href: '/', current: true },
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'People', href: '/people', current: false },
  { name: 'Refer a friend', href: '/refer', current: false },
]

export default function Profile() {

  const { userData, loadingUserData, setUserData } = useContext(UserDataContext)
  const { signer } = useContext(web3Context)
  const router = useRouter();

  useEffect(() => {
    if(!router.isReady) return;
    if(router.query.code && loadingUserData == false){
      connectGithub(router.query.code)
    }
  }, [router.isReady, loadingUserData])

  const getSignedMessage = async () => {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/message?address=${userData.eth_address}`)
    const signedMessage = await signer.signMessage(response.data)
    return signedMessage
  }

  async function connectGithub(github_code) {
    const auth_key = await getSignedMessage()

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github?github_code=${github_code}`,
      {},
      {
        headers: {
          'ETH-AUTH': auth_key
        }
      }
    )

    const newUserData = userData
    newUserData["github"] = response.data.username
    setUserData(newUserData)

    Router.push('/profile')
  }

  return (
    <div>
      <Head>
        <title>Mazury app</title>
        <link rel="icon" href="/waves.png" />
      </Head>

      <Shell
        navigation={navigation}
        header={"Your profile"}
      />
      <main className="-mt-32">
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow">
            <ChangeProfileForm />
          </div>
        </div>
      </main>
    </div>
  )
}
