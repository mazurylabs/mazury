import Shell from '../components/Shell'
import Head from 'next/head'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Your referrals', href: '/scores', current: false },
  { name: 'People', href: '/people', current: false },
  { name: 'Jobs', href: '/jobs', current: false },
  { name: 'Refer a friend', href: '/refer', current: false },
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
        header={"Welcome back, anon"}
      />
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="border-gray-300 h-full px-5 py-6 md:px-16 max-w-screen-md mx-auto md:flex-row">
              <h2 className="text-3xl font-semibold mb-4">Work in progress</h2>
              <p className="mb-4">If you're among special ones seeing this screen please let me know what should be the UX for somebody entering the platform 🌊🌊🌊</p>
              <p className="mb-4">Go to "Refer a friend" to make a referral, go to "People" to stalk people who received at least one referral or to "Your referrals" to see who referred you.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
