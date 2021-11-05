export default function ReferralList(props) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:pl-6 lg:pl-8">
          <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Referred for
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.referrals && props.referrals.map((referral) => (
                  <tr key={referral.author_address}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={referral.author_avatar} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{referral.author_username ? referral.author_username : "Anon"}</div>
                          <div className="text-sm text-gray-500">{`${referral.author_address.slice(0, 5)}...${referral.author_address.slice(-3)}`}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {referral.skills.map((skill) => (
                        <span key={skill.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-gray-800 mr-2">
                          {skill.humanName}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}