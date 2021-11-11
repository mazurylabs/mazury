export default function Bio(props) {

  return (
    <div className="max-w-lg sm:px-6">
      {props.content
        ?
          <div className="bg-gray-700 rounded-lg px-6 py-3 shadow-md">
            <p className="text-sm text-gray-50">{props.content}</p>
          </div>
        :
          <div className="bg-gray-700 rounded-lg px-6 py-3 shadow-md">
            <p className="text-sm text-gray-400">The user didn't setup their bio yet</p>
          </div>
      }
    </div>
  )
}