import Link from 'next/link'

export default function DashboardTile(props) {

  return (
    <Link href={props.href}>
      <a>
        <div className="w-64 h-64 rounded-xl bg-gray-100 p-6 mx-4 shadow-sm">
          <h1 className="text-4xl font-semibold">{props.title}</h1>
        </div>
      </a>
    </Link>
  )
}