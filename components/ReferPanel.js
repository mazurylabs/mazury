import axios from "axios";

import SkillsList from './SkillsList';
import { useState, useEffect } from 'react';

export default function ReferPanel(props) {


  const [poaps, setPoaps] = useState([])

  useEffect(() => {
    if(props.referralAddress) {
      fetchPaops()
    }
  }, [props.referralAddress])

  async function fetchPaops() {
    const result = await axios.get(`https://api.poap.xyz/actions/scan/${props.referralAddress}`)

    setPoaps(result.data)
  }

  return (
    <div className="h-full px-5 py-6 lg:px-16 max-w-screen-lg mx-auto flex flex-col md:flex-row">
      <div className="md:w-1/2 lg:w-1/3 mb-8">
        <div
          className="col-span-1 flex flex-col text-center rounded-lg"
        >
          <div className="flex-1 flex flex-col p-8">
            <span className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 mx-auto shadow">
              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <h3 className="mt-6 text-gray-900 text-sm font-medium">{props.referralEnsName}</h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dd className="text-gray-500 text-sm">{props.referralAddress ? `${props.referralAddress.slice(0, 5)}...${props.referralAddress.slice(-3)}` : "loading..."}</dd>
            </dl>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-y-2 gap-x-2 md:w-4/5 mx-auto">
          {poaps.map(poap => (
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