import Link from 'next/link';

import ReferralList from './ReferralList';
import Bio from './Bio';

export default function UserProfile(props) {

  const profileData = props.profileData

  return (
    <div className="relative w-full">
      <main className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5 mb-4">
            <div className="flex-shrink-0 bg-gray-100 rounded-full overflow-hidden">
              <span className="h-16 w-16 rounded-full bg-gray-100 mx-auto shadow">
                <img className="h-16 w-16" src={profileData.avatar} />
              </span>
            </div>
            <div>
              {profileData.username == profileData.address
                ?
                  <div>
                    <div className="text-2xl font-bold text-gray-200">{`${profileData.eth_address.slice(0, 5)}...${profileData.eth_address.slice(-3)}`}</div>
                  </div>
                :
                  <div>
                    <div className="text-2xl font-bold text-gray-200">{profileData.username}</div>
                    <div className="text-sm font-medium text-gray-400">{`${profileData.eth_address.slice(0, 5)}...${profileData.eth_address.slice(-3)}`}</div>
                  </div>
                }
            </div>
            <div className="">
              <Link href={`/refer?address=${profileData.eth_address}`}>
                <a
                  className="inline-flex items-center px-4 py-1 border border-transparent text-base font-normal rounded-md shadow-sm text-white bg-pink-400 hover:bg-pink-300 focus:outline-none mx-2 mb-2 md:mb-0"
                >
                  Refer
                </a>
              </Link>
              {profileData.email &&
                <a
                  href={`mailto:${profileData.email}`}
                  className="inline-flex items-center px-4 py-1 border border-transparent text-base font-normal rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-400 focus:outline-none mx-2"
                >
                  Email
                </a>
              }
            </div>
          </div>
          <Bio
            content={profileData.bio}
          />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 pt-8 lg:pt-4 mb-12">
          <div className="flex flex-row mb-2 text-3xl">
            {profileData.twitter &&
              <a target="_blank" href={`https://twitter.com/${profileData.twitter}`}>
                <svg className="w-8 h-8 text-black md:text-white mr-2" fill="currentColor" viewBox="0 0 24 24" {...props}>
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            }
            {profileData.github &&
              <a target="_blank" href={`https://github.com/${profileData.github}`}>
                <svg className="w-8 h-8 text-black md:text-white mr-2" fill="currentColor" viewBox="0 0 24 24" {...props}>
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            }
            {profileData.role_developer &&
              <p className="w-8 h-8 mr-2">💻</p>
            }
            {profileData.role_designer &&
              <p className="w-8 h-8 mr-2">🎨</p>
            }
            {profileData.role_trader &&
              <p className="w-8 h-8 mr-2">📈</p>
            }
            {profileData.role_creator &&
              <p className="w-8 h-8 mr-2">✨</p>
            }
            {profileData.role_researcher &&
              <p className="w-8 h-8 mr-2">📚</p>
            }
            {profileData.role_investor &&
              <p className="w-8 h-8 mr-2">💰</p>
            }
            {profileData.role_community_manager &&
              <p className="w-8 h-8 mr-2">🐒</p>
            }
          </div>
        </div>
        <h2 className="text-4xl font-medium pb-4">
          Referrals received
        </h2>
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
