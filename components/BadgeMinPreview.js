import { useEffect } from "react"

export default function BadgeMinPreview(props) {

  return (
    <div
      className="py-1 px-2 border rounded-md border-gray-400 flex flex-row items-center"
    >
      <img className="h-4 w-4 rounded-full mr-2" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${props.badgeData.badge_type.image}`}/>
      <p className="text-xs text-gray-800 font-medium">{props.badgeData.badge_type.title}</p>
    </div>
  )
}