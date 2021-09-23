import Shell from '../components/Shell'
import AddressSearch from '../components/AddressSearch'
import ReferPanel from '../components/ReferPanel'
import Head from 'next/head'

import { useState, useEffect } from 'react';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Your scores', href: '/scores', current: false },
  { name: 'People', href: '/people', current: false },
  { name: 'Jobs', href: '/jobs', current: false },
  { name: 'Refer a friend', href: '/refer', current: true },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

export default function Refer() {

  const [searchedAddress, setSearchedAddress] = useState("")
  const [addressIsValid, setAddressIsValid] = useState(false)

  useEffect(() => {
    if(searchedAddress.match(/^0x[a-fA-F0-9]{40}$/)){
      setAddressIsValid(true)
    } else {
      setAddressIsValid(false)
    }
    
  }, [searchedAddress])

  return (
    <div>
      <Head>
        <title>Mazury app</title>
        <link rel="icon" href="/waves.png" />
      </Head>

      <Shell
        navigation={navigation}
        user={user}
        userNavigation={userNavigation}
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
                <div className="w-full mt-8">
                  <ReferPanel
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
