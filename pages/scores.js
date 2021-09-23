import Shell from '../components/Shell'
import ReferralList from '../components/ReferralList'
import Head from 'next/head'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Your scores', href: '/scores', current: true },
  { name: 'People', href: '/people', current: false },
  { name: 'Jobs', href: '/jobs', current: false },
  { name: 'Refer a friend', href: '/refer', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mazury app</title>
        <link rel="icon" href="/waves.png" />
      </Head>

      <Shell
        navigation={navigation}
        user={user}
        userNavigation={userNavigation}
        header={"Your referrals & scores"}
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
          <div className="bg-gray-50 rounded-lg h-96 shadow flex-grow mr-10">
            <ReferralList />
          </div>
          <div className="bg-white rounded-lg h-96 shadow px-5 py-6 sm:px-6 w-96">
          </div>
        </div>
      </main>
    </div>
  )
}
