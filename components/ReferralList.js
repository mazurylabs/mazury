import Link from "next/link"

export default function ReferralList(props) {
  return (
    <div className="flex flex-col">
      <div className="-my-2">
        <div className="py-2 align-middle inline-block w-full">
          <div className="border-b border-gray-200 sm:rounded-lg">
            <table className="divide-y divide-gray-200 w-full">
              <thead className="bg-gray-50">
                <tr className="flex flex-row w-full">
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex-grow"
                  >
                    Content
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-96"
                  >
                    Referred for
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.referrals.map((referral) => (
                  <tr key={referral.author_address} className="flex flex-row">
                    <td className="px-4 py-4 w-48">
                      <Link href={`/people/${referral.author_address}`}>
                        <a>
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={referral.author_avatar} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{referral.author_username ? referral.author_username : "Anon"}</div>
                              <div className="text-sm text-gray-500">{`${referral.author_address.slice(0, 5)}...${referral.author_address.slice(-3)}`}</div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </td>
                    <td className="px-1 py-4 break-words flex-grow">
                      <p className="text-sm text-gray-900 pr-4">{`placehodler :)`.slice(0,70)}</p>
                    </td>
                    <td className="px-1 py-4 w-96">
                      {referral.skills.slice(0,2).map((skill) => (
                        <span key={skill.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-gray-800 mr-2">
                          {skill.humanName}
                        </span>
                      ))}
                      {referral.skills.length-2 > 0 &&
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-gray-800 mr-2">
                          {`+${referral.skills.length-2}`}
                        </span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {props.loading &&
              <div className="w-full flex justify-center py-6">
              <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              </div>
            }
            {(props.referrals.length == 0 && !props.loading) &&
              <p className="w-full text-center py-4 text-sm">This user has not been referred yet</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}