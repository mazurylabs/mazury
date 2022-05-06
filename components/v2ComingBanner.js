/* This example requires Tailwind CSS v2.0+ */
import { XIcon } from '@heroicons/react/outline'

export default function V2ComingBanner() {
  return (
    <div className="relative bg-green-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="text-center px-16">
          <p className="font-medium text-white">
            <span className="md:hidden">We are shipping a brand new app soon!</span>
            <span className="hidden md:inline">Thank you for being with us so early. We are shipping a brand new app soon!</span>
            <span className="block sm:ml-2 sm:inline-block">
              <a href="https://twitter.com/mazuryxyz" className="text-white font-bold underline">
                {' '}
                Learn more <span aria-hidden="true">&rarr;</span>
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
