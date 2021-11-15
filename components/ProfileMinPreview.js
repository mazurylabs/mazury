import Link from 'next/link'

export default function ProfileMinPreview(props) {

  return (
    <Link href={`/people/${props.profileData.eth_address}`}>
      <a>
        <img className="h-8 w-8 rounded-full shadow-sm" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${props.profileData.avatar}`}/>
      </a>
    </Link>
  )
}