import ScoresList from './ScoresList'
import ReferralList from './ReferralList';

export default function Example(props) {

  return (
    <div className="relative w-full">
      <main className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0 bg-gray-100 rounded-full overflow-hidden">
              <span className="h-16 w-16 rounded-full bg-gray-100 mx-auto shadow">
                <img className="h-16 w-16" src={props.avatar} />
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-200">{props.username ? props.username : "Anon"}</h1>
              <p className="text-sm font-medium text-gray-400">{`${props.address.slice(0, 5)}...${props.address.slice(-3)}`}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row">
          <div className="bg-white rounded-lg shadow flex-grow md:mr-10 overflow-y-hidden mb-10 md:mb-auto">
            <ReferralList
              referrals={props.referrals}
            />
          </div>
          <div className="bg-white rounded-lg shadow px-5 py-2 sm:px-6 md:w-80 lg:w-96 h-96 overflow-scroll">
            <ScoresList
              scores={props.scores}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
