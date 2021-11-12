import { ethers, providers } from "ethers";
import Shell from '../components/Shell'
import AddressSearch from '../components/AddressSearch'
import ReferPanel from '../components/ReferPanel'
import { useRouter } from "next/router";
import Head from 'next/head'

import { useState, useEffect, useContext } from 'react';
import { web3Context } from "../context/web3Data"

const navigation = [
  { name: 'Your referrals', href: '/', current: false },
  { name: 'Dashboard', href: '/dashboard', current: false },
  { name: 'People', href: '/people', current: false },
  { name: 'Refer a friend', href: '/refer', current: true },
]

export default function Refer() {

  const [searchedAddress, setSearchedAddress] = useState("")
  const [referralEnsName, setReferralEnsName] = useState("loading...")
  const [referralAddress, setReferralAddress] = useState("")
  const [addressIsValid, setAddressIsValid] = useState(false)
  const { provider, signer } = useContext(web3Context)
  const router = useRouter();
  const [infuraProvider, setInfuraProvider] = useState(null)

  useEffect(() => {
    const newInfuraProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_URL);
    setInfuraProvider(newInfuraProvider)
  }, [])

  useEffect(() => {
    if(searchedAddress.match(/^0x[a-fA-F0-9]{40}$/)){
      setReferralAddress(searchedAddress)
      getEnsReverseRecord()
      setAddressIsValid(true)
    } else if(searchedAddress.match(/^[a-zA-Z0-9]+.eth$/)) {
      setReferralEnsName(searchedAddress)
      getResolverAddress()
      setAddressIsValid(true)
    } else {
      setReferralAddress("")
      setReferralEnsName("loading...")
      setAddressIsValid(false)
    }
    
  }, [searchedAddress])

  useEffect(() => {
    if(!router.isReady) return;
    if(router.query.address){
      setSearchedAddress(router.query.address)
    }
  }, [router.isReady])

  async function getEnsReverseRecord() {
    const ensName = await infuraProvider.lookupAddress(searchedAddress);
    if(ensName) {
      setReferralEnsName(ensName)
    } else{
      setReferralEnsName("Anon")
    }
  }

  async function getResolverAddress() {
    const address = await infuraProvider.resolveName(searchedAddress);
    if(address){
      setReferralAddress(address)
    }else{
      setReferralAddress("")
      setAddressIsValid(false)
    }
  }

  return (
    <div>
      <Head>
        <title>Mazury app</title>
        <link rel="icon" href="/waves.png" />
      </Head>

      <Shell
        navigation={navigation}
        header={"Refer a friend"}
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="rounded-lg flex flex-col items-center">
              <AddressSearch
                searchedAddress={searchedAddress}
                setSearchedAddress={setSearchedAddress}
                addressIsValid={addressIsValid}
              />
              {searchedAddress && addressIsValid
              ?
                <div className="w-full md:mt-8">
                  <ReferPanel
                    provider={provider}
                    signer={signer}
                    referralAddress={referralAddress}
                    referralEnsName={referralEnsName}
                  />
                </div>
              :
                <div className="h-64" />
              }
            </div>
          </div>          
        </div>
      </main>
    </div>
  )
}