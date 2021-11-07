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
      <DebounceInput
        type="text"
        name="search"
        id="search"
        placeholder="Search for a skill or badge"
        debounceTimeout={200}
        onChange={(e) => searchPeople(e.target.value)}
        className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  )
}