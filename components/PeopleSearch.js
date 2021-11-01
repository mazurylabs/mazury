import {DebounceInput} from 'react-debounce-input';

export default function PeopleSearch(props) {

  function searchPeople(query) {
    if (query == "") {
      props.setDisplayPeople(props.people)
    } else {
      props.fetchPeople("", query)
    }
  }

  return (
    <div>
      <div className="mt-1 relative flex items-center">
        <DebounceInput
          type="text"
          name="search"
          id="search"
          placeholder="Search for skill, eg. 'defi'"
          debounceTimeout={200}
          onChange={(e) => searchPeople(e.target.value)}
          className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  )
}