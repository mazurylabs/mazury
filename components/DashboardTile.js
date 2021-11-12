import Link from 'next/link'

export default function DashboardTile(props) {

  return (
    <Link href={props.href}>
      <a>
        <div className="w-64 h-64 rounded-xl bg-white p-6 mx-4 shadow-sm border">
          <h1 className="text-4xl font-semibold">{props.title}</h1>
          <div className="flex flex-row justify-end items-end h-32">
            <img className="w-20 h-20 rounded-full" src={props.icon} />
          </div>
        </div>
      </a>
    </Link>
  )
}