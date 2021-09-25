import Shell from '../components/Shell'
import Head from 'next/head'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Your scores', href: '/scores', current: false },
  { name: 'People', href: '/people', current: false },
  { name: 'Jobs', href: '/jobs', current: true },
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
        header={"Jobs"}
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg h-96 shadow px-5 py-6 sm:px-6">
            <div className="border-gray-300 h-full px-5 py-6 md:px-16 max-w-screen-md mx-auto md:flex-row">
              <h2 className="text-3xl font-semibold mb-4">Jobs are coming</h2>
              <p className="mb-4">The feature is not active yet, but soon you will be able to see & apply for jobs at the best DAOs, web3 startups and our other partners.</p>
              <p className="mb-4">All you need to apply is your reputation score, so <button className="font-semibold text-green-500 text-opacity-80">grab your link</button> and reach out to your friends for a referral :)</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
