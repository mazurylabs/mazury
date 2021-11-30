import axios from "axios";
import { Fragment, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UserDataContext } from "../context/userData"
import { web3Context } from "../context/web3Data"

import Router, { useRouter } from "next/router";

export default function BadgeDetailModal(props) {

  const [tweetURL, setTweetURL ] = useState("")
  const { userData, loadingUserData, setUserData } = useContext(UserDataContext)
  const { provider, signer } = useContext(web3Context)

  const getSignedMessage = async () => {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/message?address=${userData.eth_address}`)
    const signedMessage = await provider.send("personal_sign", [response.data, userData.eth_address]);
    return signedMessage
  }

  async function connectTwitter() {
    const auth_key = await getSignedMessage()

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/twitter?tweet_url=${tweetURL}`,
      {},
      {
        headers: {
          'ETH-AUTH': auth_key
        }
      }
    )

    const newUserData = userData
    newUserData["twitter"] = response.data.username
    setUserData(newUserData)
    
    props.setOpen(false)
    Router.push('/profile')
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <div className="fixed z-10 inset-0 overflow-y-auto" onClose={props.setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-2">
                  <h3 className="text-2xl leading-6 font-medium text-gray-900 mb-6">
                    Tweet url
                  </h3>
                  <div>
                    <div className="mt-1 relative rounded-md shadow-sm mb-4">
                      <input
                        type="text"
                        name="company-website"
                        id="company-website"
                        onChange={(e) => setTweetURL(e.target.value)}
                        className="focus:outline-none focus:border-gray-700 focus:ring-0 border block w-full pl-4 sm:text-sm border-gray-300 rounded-md"
                        placeholder="https://twitter.com/mazurylabs/status/1461058168323203075"
                      />
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none"
                      onClick={() => connectTwitter()}
                    >
                      Verify
                    </button>
                </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition.Root>
  )
}
