import { Fragment } from 'react'
import { ethers, providers } from "ethers";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import { useState, useEffect } from 'react';

import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

import WrongNetworkModal from './WrongNetworkModal';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Shell(props) {

  const [web3Modal, setWeb3Modal] = useState(null)
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState("...")
  const [ensReverseRecord, setEnsReverseRecord] = useState(null)
  const [infuraProvider, setInfuraProvider] = useState(null)

  useEffect(() => {

    checkConnection()

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        }
      },
    };
  
    const web3Modal = new Web3Modal({
      cacheProvider: false, // optional
      providerOptions, // required
      disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });

    setWeb3Modal(web3Modal)

    const newInfuraProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_URL);
    setInfuraProvider(newInfuraProvider)
  }, [])

  useEffect(() => {
    
    if(props.provider){
      props.provider.on('network', (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          fetchNetworkData()
        }
      })
    }

  }, [props.provider])

  useEffect(() => {
    if(connected){
      fetchNetworkData()
      fetchAccountData()
    }
  }, [connected])

  async function connectWallet() {
    const provider = await web3Modal.connect();
    props.setProvider(new providers.Web3Provider(provider))
    setConnected(true)
  }

  async function disconnectWallet() {
    // this doesn't work at all XD

    await web3Modal.clearCachedProvider();
    props.setProvider(null)
    setConnected(false)
  }

  async function fetchAccountData() {
    const address = await props.signer.getAddress()
    setAddress(address)
    const ensReverseRecord = await infuraProvider.lookupAddress(address);
    setEnsReverseRecord(ensReverseRecord)
  }

  async function fetchNetworkData() {
    const chainId = await props.signer.getChainId()
    props.setChainId(chainId)
  }

  const checkConnection = async () => {
    // works only for metamask so far
    if (window.ethereum) {
      const newProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      props.setProvider(newProvider)
      props.setSigner(newProvider.getSigner())
      const address = await newProvider.getSigner().getAddress()
      setConnected(Boolean(address))
    }
  };

  return (
    <div className="bg-gray-800 pb-32">
      {(props.chainId != 4) &&
        <WrongNetworkModal />
      }
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="border-b border-gray-700">
                <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="/waves.png"
                        alt="Logo"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {props.navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
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
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {connected
                      ?
                        <Menu as="div" className="ml-3 relative">
                          <div>
                            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none">
                              <p
                                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                              >
                                {ensReverseRecord ? ensReverseRecord : `${address.slice(0, 5)}...${address.slice(-3)}`}
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
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700 flex justify-center">
                {connected
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
      {/* TODO get rid of referral link */}
      <header className="">
        <p className="text-white py-1 text-xs text-right px-4 sm:px-6 lg:px-8">https://dev.app.mazurylabs.com/refer?address={address}</p>
        <div className="max-w-7xl py-10 mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">{props.header}</h1>
        </div>
      </header>
    </div>
  )
}