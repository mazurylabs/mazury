export default function RoleCheckbox(props) {

  return (
    <div className="relative flex items-start mb-1">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          className="h-4 w-4 text-gray-900 border-gray-300 rounded focus:outline-none"
          defaultChecked={props.checked}
          onClick={(e) => props.setRole(e.target.checked)}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="opportunities" className="font-medium text-gray-700">
          {props.text}
        </label>
      </div>
    </div>
  )
}
