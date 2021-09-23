import SkillsList from './SkillsList';
import { useState, useEffect } from 'react';

export default function ReferPanel(props) {

  return (
    <div className="border-gray-300 border rounded-lg h-full shadow-sm px-5 py-6 md:px-16 max-w-screen-md mx-auto flex flex-col md:flex-row">
      <div className="md:w-1/3">
        <div
          className="col-span-1 flex flex-col text-center rounded-lg"
        >
          <div className="flex-1 flex flex-col p-8">
            <span className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 mx-auto">
              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <h3 className="mt-6 text-gray-900 text-sm font-medium">Address not claimed</h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dd className="text-gray-500 text-sm">{`${props.address.slice(0, 5)}...${props.address.slice(-3)}`}</dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="md:w-2/3">
        <SkillsList />
      </div>
    </div>
  )
}