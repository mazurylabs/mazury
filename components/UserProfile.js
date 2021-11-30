import Link from 'next/link';

import ScoresList from './ScoresList'
import ReferralList from './ReferralList';
import Bio from './Bio';

export default function UserProfile(props) {

  return (
    <div className="relative w-full">
      <main className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5 mb-4">
            <div className="flex-shrink-0 bg-gray-100 rounded-full overflow-hidden">
              <span className="h-16 w-16 rounded-full bg-gray-100 mx-auto shadow">
                <img className="h-16 w-16" src={props.avatar} />
              </span>
            </div>
            <div>
              {props.username == props.address
                ?
                  <div>
                    <div className="text-2xl font-bold text-gray-200">{`${props.address.slice(0, 5)}...${props.address.slice(-3)}`}</div>
                  </div>
                :
                  <div>
                    <div className="text-2xl font-bold text-gray-200">{props.username}</div>
                    <div className="text-sm font-medium text-gray-400">{`${props.address.slice(0, 5)}...${props.address.slice(-3)}`}</div>
                  </div>
                }
            </div>
            <div className="">
              <Link href={`/refer?address=${props.address}`}>
                <a
                  className="inline-flex items-center px-4 py-1 border border-transparent text-base font-normal rounded-md shadow-sm text-white bg-pink-400 hover:bg-pink-300 focus:outline-none mx-2"
                >
                  Refer
                </a>
              </Link>
              {props.email &&
                <a
                  href={`mailto:${props.email}`}
                  className="inline-flex items-center px-4 py-1 border border-transparent text-base font-normal rounded-md shadow-sm text-white bg-pink-400 hover:bg-pink-300 focus:outline-none mx-2"
                >
                  Email
                </a>
              }
              {!props.email && props.twitter &&
                <a
                  href={`https://twitter.com/${props.twitter}`}
                  target="_blank"
                  className="inline-flex items-center px-4 py-1 border border-transparent text-base font-normal rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-400 focus:outline-none mx-2"
                >
                  Twitter
                </a>
              }
            </div>
          </div>
          <Bio
            content={props.bio}
          />
        </div>
        <div className=" flex flex-col md:flex-row">
          <div className="bg-white rounded-lg shadow flex-grow md:mr-10 overflow-y-hidden mb-10 md:mb-auto">
            <ReferralList
              referrals={props.referrals}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
