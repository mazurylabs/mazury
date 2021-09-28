import Shell from '../components/Shell'
import AddressSearch from '../components/AddressSearch'
import ReferPanel from '../components/ReferPanel'
import { useRouter } from "next/router";
import Head from 'next/head'

import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Your referrals', href: '/scores', current: false },
  { name: 'People', href: '/people', current: false },
  { name: 'Jobs', href: '/jobs', current: false },
  { name: 'Refer a friend', href: '/refer', current: true },
]

export default function Refer() {

  const [searchedAddress, setSearchedAddress] = useState("")
  const [addressIsValid, setAddressIsValid] = useState(false)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const router = useRouter();

  useEffect(() => {
    if(searchedAddress.match(/^0x[a-fA-F0-9]{40}$/)){
      setAddressIsValid(true)
    } else {
      setAddressIsValid(false)
    }
    
  }, [searchedAddress])

  useEffect(() => {
    if(!router.isReady) return;
    if(router.query.address){
      setSearchedAddress(router.query.address)
    }
  }, [router.isReady])

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
                    address={searchedAddress}
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
