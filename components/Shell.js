import { Fragment } from 'react'
import Link from 'next/link'
import { ethers, providers } from "ethers";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import { useState, useEffect, useContext } from 'react';

import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

import OnboardingModal from "./OnboardingModal"
import { UserDataContext } from '../context/userData';
import { web3Context } from '../context/web3Data';
import axios from 'axios';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Shell(props) {

  const [address, setAddress] = useState("...")
  const { userData, loadingUserData, setLoadingUserData, setUserData } = useContext(UserDataContext)
  const {
    provider,
    setProvider,
    signer,
    setSigner,
    chainId,
    setChainId,
    web3Modal,
    setWeb3Modal
  } = useContext(web3Context)

  useEffect(() => {

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        }
      },
    };
  
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      network: "rinkeby",
      providerOptions, // required
      disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });

    setWeb3Modal(web3Modal)
  }, [])

  useEffect(() => {
    if(web3Modal){
      checkConnection()
    }
  }, [web3Modal])

  useEffect(() => {
    if(signer){
      if(Object.keys(userData).length === 0){
        fetchAccountData()
      }
      fetchNetworkData()
    }
  }, [signer])

  async function connectWallet() {
    const provider = await web3Modal.connect();
    addListeners(provider)
    const ethersProvider = new providers.Web3Provider(provider)
    setProvider(ethersProvider)
    setSigner(ethersProvider.getSigner())
  }

  async function disconnectWallet() {
    await web3Modal.clearCachedProvider();
    setProvider(null)
    setSigner(null)
    setUserData({})
  }

  async function fetchAccountData() {
    const address = await signer.getAddress()
    setAddress(address)
    const accountDataResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/${address}/`)
    setUserData(accountDataResponse.data)
    setLoadingUserData(false)
  }

  async function fetchNetworkData() {
    const chainId = await signer.getChainId()
    setChainId(chainId)
  }

  const checkConnection = async () => {
    if (web3Modal.cachedProvider && signer == null) {
      const provider = await web3Modal.connect();
      addListeners(provider)
      const ethersProvider = new providers.Web3Provider(provider)
      setProvider(ethersProvider)
      setSigner(ethersProvider.getSigner())
    }
  };

  const addListeners = async (provider) => {

    provider.on("accountsChanged", (accounts) => {
      window.location.reload()
    });
    
    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      setChainId(chainId)
    });
  }

  return (
    <div className="bg-gray-800 pb-32">
      {(!loadingUserData && !userData.onboarded) &&
        <OnboardingModal />
      }
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="border-b border-gray-700">
                <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link href="/">
                        <a>
                          <img
                            className="h-8 w-8"
                            src="/waves.png"
                            alt="Logo"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {props.navigation.map((item) => (
                          <Link key={item.name} href={item.href}>
                            <a
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {userData.avatar &&
                        <div className="flex flex-row">
                          <Link href="/profile">
                            <a>
                              <img className="h-8 w-8 rounded-full ml-3" src={userData.avatar} alt="" />
                            </a>
                          </Link>
                        </div>
                      }
                      {signer
                      ?
                        <Menu as="div" className="ml-3 relative">
                          <div>
                            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none">
                              {(!loadingUserData && userData.username.length > 24)
                              ?
                                <p
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                                >
                                  {`${userData.username.slice(0, 5)}...${userData.username.slice(-3)}`}
                                </p>
                              :
                                <p
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                                >
                                  {userData.username}
                                </p>
                              }
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item key={"disconnect"}>
                                {({ active }) => (
                                  <button
                                    onClick={disconnectWallet}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {"Disconnect"}
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      :
                        <button
                          onClick={connectWallet}
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                        >
                          Connect
                        </button>
                      }
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="border-b border-gray-700 md:hidden">
              <div className="px-2 py-3 space-y-1 sm:px-3">
                {props.navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700 flex justify-center">
                {signer
                ?
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none">
                        <p
                          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                        >
                          {`${address.slice(0, 5)}...${address.slice(-3)}`}
                        </p>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="mt-2 text-center rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item key={"disconnect"}>
                          {({ active }) => (
                            <button
                              onClick={disconnectWallet}
                            >
                              {"Disconnect"}
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                :
                  <button
                    onClick={connectWallet}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                  >
                    Connect
                  </button>
                }
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <header className="">
        <div className="max-w-7xl pb-10 mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl pt-10 font-bold text-white">{props.header}</h1>
        </div>
      </header>
    </div>
  )
}