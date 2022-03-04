export default function Badge(props) {

  return (
    <a target="_blank" href={props.url}>
      <div
      className="relative hover:cursor-pointer rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500 w-72"
      >
        <div className="flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src={props.image} alt="" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{props.title}</p>
          <p className="text-sm text-gray-500 truncate mb-1">{props.description}</p>
        </div>
      </div>
    </a>
  )
}