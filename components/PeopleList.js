export default function PeopleList(props) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                    Skills
                  </th>
                </tr>
              </thead>
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
                      {person.skills.map((skill) => (
                        <span key={`${skill.name}+${person.address}`} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-gray-800 mr-2">
                          {`${skill.name}: ${skill.score}`}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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