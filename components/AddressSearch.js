export default function AddressSearch(props) {

  return (
    <div>
      <label htmlFor="search" className="block text-sm font-medium text-gray-700">
         Search
      </label>
      <div className="mt-1 relative flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="ETH address"
          spellCheck="false"
          onChange={(e) => props.setSearchedAddress(e.target.value)}
          className="shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400 w-full md:w-96 sm:text-sm border-gray-300 border rounded-md py-2 px-4"
        />
      </div>
      {props.searchedAddress && !props.addressIsValid &&
      <p className="text-xs text-red-500 font-medium mt-1">
        {`Not a valid ETH address`}
      </p>
      }
    </div>
  )
}