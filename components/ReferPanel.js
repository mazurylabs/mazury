import axios from "axios";

import SkillsList from './SkillsList';
import { useState, useEffect } from 'react';

import BadgeMinPreview from "./BadgeMinPreview"

export default function ReferPanel(props) {

  const [poaps, setPoaps] = useState([])
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    if(props.referralAddress) {
      fetchProfileData(props.referralAddress)
      fetchPaops()
    }
  }, [props.referralAddress])

  async function fetchPaops() {
    const result = await axios.get(`https://api.poap.xyz/actions/scan/${props.referralAddress}`)

    setPoaps(result.data)
  }

  async function fetchProfileData(url_address) {
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/${url_address}`)
      .then((profileData) => setProfileData(profileData.data))
      .catch((error) => {})
  }

  return (
    <div className="h-full px-5 py-6 lg:px-16 max-w-screen-lg mx-auto flex flex-col md:flex-row">
      <div className="md:w-1/2 lg:w-1/3 mb-8">
        <div
          className="col-span-1 flex flex-col text-center rounded-lg"
        >
          <div className="flex-1 flex flex-col p-8">
            {profileData
            ? <img src={profileData.avatar} className="h-32 w-32 rounded-full mx-auto" />
            : <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/gradient2.jpg`} className="h-32 w-32 rounded-full mx-auto" />
            }

            <h3 className="mt-6 text-gray-900 text-sm font-medium">{props.referralEnsName}</h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dd className="text-gray-500 text-sm">{props.referralAddress ? `${props.referralAddress.slice(0, 5)}...${props.referralAddress.slice(-3)}` : "loading..."}</dd>
            </dl>
          </div>
        </div>
        {profileData
        ?
          <div>
            <p className="text-gray-700 text-sm">Top 3 badges</p>
            <div className="px-6 whitespace-nowrap max-w-lg overflow-hidden items-center w-48 mx-auto">
              {profileData.top_badges.map((badge) => (
                <div className="mr-2 my-2">
                  <BadgeMinPreview
                    badgeData={badge}
                  />
                </div>
              ))}
            </div>
          </div>
        :
          <p className="text-gray-700 text-sm mb-8">New user</p>
        }
        <p className="text-gray-700 text-sm mb-4">Top poaps</p>
        <div className="grid grid-cols-4 gap-y-2 gap-x-2 md:w-4/5 mx-auto">
          {poaps.slice(0,8).map(poap => (
            <img className="rounded-full w-14 h-14 lg:w-12 lg:h-12 shadow mx-auto" src={poap.event.image_url} />
          ))}
        </div>
      </div>
      <div className="md:w-1/2 lg:w-2/3">
        <SkillsList
          provider={props.provider}
          signer={props.signer}
          referralAddress={props.referralAddress}
        />
      </div>
    </div>
  )
}