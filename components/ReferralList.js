import Link from "next/link"

export default function ReferralList(props) {
  return (
    <div className="flex flex-col">
      <div className="-my-2">
        <div className="py-2 align-middle inline-block">
          <div className="border-b border-gray-200 sm:rounded-lg">
            <table className="divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-44"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-96"
                  >
                    Referred for
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-60"
                  >
                    Content
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.referrals.map((referral) => (
                  <tr key={referral.author_address}>
                    <td className="px-4 py-4">
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
                    <td className="px-1 py-4">
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
                    <td className="px-1 py-4 break-words">
                      <p className="text-sm text-gray-900 pr-4">{`placehodler :)`.slice(0,70)}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {props.referrals.length == 0 &&
              <p className="w-full text-center py-4 text-sm">This user has not been referred yet</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}