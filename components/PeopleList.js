// todo replace with lodash or smth
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// todo supply with actual, not mockup values
const people = [
  {
    name: 'Anon',
    address: '0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3',
    referred_skills: [
      {
        "name": "Solidity",
        "score": getRandomInt(20)*5
      },
      {
        "name": "React",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Rust",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Design",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Memes",
        "score": getRandomInt(20)*5
      }
    ]
  },
  {
    name: 'Anon',
    address: '0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3',
    referred_skills: [
      {
        "name": "Solidity",
        "score": getRandomInt(20)*5
      },
      {
        "name": "React",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Rust",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Design",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Memes",
        "score": getRandomInt(20)*5
      }
    ]
  },
  {
    name: 'Anon',
    address: '0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3',
    referred_skills: [
      {
        "name": "Solidity",
        "score": getRandomInt(20)*5
      },
      {
        "name": "React",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Rust",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Design",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Memes",
        "score": getRandomInt(20)*5
      }
    ]
  },
  {
    name: 'Anon',
    address: '0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3',
    referred_skills: [
      {
        "name": "Solidity",
        "score": getRandomInt(20)*5
      },
      {
        "name": "React",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Rust",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Design",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Memes",
        "score": getRandomInt(20)*5
      }
    ]
  },
  {
    name: 'Anon',
    address: '0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3',
    referred_skills: [
      {
        "name": "Solidity",
        "score": getRandomInt(20)*5
      },
      {
        "name": "React",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Rust",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Design",
        "score": getRandomInt(20)*5
      },
      {
        "name": "Memes",
        "score": getRandomInt(20)*5
      }
    ]
  },
]

export default function PeopleList() {
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
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {people.map((person) => (
                  <tr key={person.address}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                        <span className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 mx-auto">
                          <svg className="h-full w-full text-gray-300 rounded-full" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{person.name}</div>
                          <div className="text-sm text-gray-500">{`${person.address.slice(0, 5)}...${person.address.slice(-3)}`}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {person.referred_skills.map((skill) => (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-gray-800 mr-2">
                          {`${skill.name}: ${skill.score}`}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                      >
                        Go to profile
                      </button>
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