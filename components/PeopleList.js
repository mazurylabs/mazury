import BadgeMinPreview from "./BadgeMinPreview"
import ProfileMinPreview from "./ProfileMinPreview"

export default function PeopleList(props) {

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
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
                    Roles
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Top badges
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Referred by
                  </th>
                </tr>
              </thead>
              {!props.loading &&
              <tbody className="bg-white divide-y divide-gray-200">
                {props.people.map((person) => (
                  <tr key={person.address}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={"/people/" + person.address} className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <span className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 mx-auto">
                            <img className="h-10 w-10 rounded-full" src={person.avatar} />
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{person.username ? person.username : "Anon"}</div>
                          <div className="text-sm text-gray-500">{`${person.address.slice(0, 5)}...${person.address.slice(-3)}`}</div>
                        </div>
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap max-w-lg overflow-hidden">
                      {person.roles.length != 0
                      ?
                        <div>
                          {person.roles.map((role) => (
                            <span key={role} className="text-lg text-gray-800 mr-2">
                              {role}
                            </span>
                          ))}
                        </div>
                      :
                        <p className="text-sm text-gray-500">No role assigned</p>
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap max-w-lg overflow-hidden">
                      {person.badges.length != 0
                      ?
                        <div className="flex flex-row items-center">
                          {person.badges.map((badge) => (
                            <div className="mr-2 my-2">
                              <BadgeMinPreview
                                badgeData={badge}
                              />
                            </div>
                          ))}
                        </div>
                      :
                        <p className="text-sm text-gray-500">No badges earned</p>
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap max-w-lg overflow-hidden">
                      {person.referred_by.length != 0
                        ?
                          <div className="flex flex-row items-center">
                            {person.referred_by.map((profile) => (
                              <div className="mr-2 my-2">
                                <ProfileMinPreview
                                  profileData={profile}
                                />
                              </div>
                            ))}
                          </div>
                        :
                        <p className="text-sm text-gray-500">User not referred yet</p>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
              }
            </table>
          </div>
          {props.loading &&
            <div className="w-full flex justify-center py-6">
              <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          }
          <nav
            className="bg-white px-4 py-3 flex items-center justify-betweenx sm:px-6"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{props.startPage}</span> to <span className="font-medium">{props.endPage}</span> of{' '}
                <span className="font-medium">{props.totalPeopleCount}</span> results
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button
                onClick={() => (props.fetchPeople("prev"))}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => (props.fetchPeople("next"))}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}