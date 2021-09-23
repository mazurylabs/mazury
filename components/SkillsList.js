const skills = [
  { id: 1, name: 'Solidity' },
  { id: 2, name: 'React' },
  { id: 3, name: 'Rust' },
  { id: 4, name: 'Design' },
  { id: 5, name: 'Memes' },
]

export default function SkillsList() {
  return (
    <div className="flex flex-col items-center">
      <fieldset className="w-full px-5 mb-4">
        <legend className="text-2xl font-medium text-gray-900">Refer them for</legend>
        <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {skills.map((person, personIdx) => (
            <div key={personIdx} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label htmlFor={`person-${person.id}`} className="font-medium text-gray-700 select-none">
                  {person.name}
                </label>
              </div>
              <div className="ml-3 flex items-center h-5">
                <input
                  id={`person-${person.id}`}
                  name={`person-${person.id}`}
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 text-gray-800 focus:ring-gray-800 rounded"
                />
              </div>
            </div>
          ))}
        </div>
      </fieldset>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none"
      >
        Save the referral
      </button>
    </div>
  )
}