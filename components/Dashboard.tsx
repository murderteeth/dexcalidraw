import { truncateAddress } from '../utilities'
import { A } from './controls'
import SignOut from './SignOut'
import Wordmark from './Wordmark'

export default function Dashboard({ user } : { user: any }) {
  return <div className="w-full h-full flex flex-col">
    <div className="px-8 py-4 flex items-center justify-between">
      <Wordmark className="text-2xl" />
      <div className="flex items-center justify-end gap-8">
        <div>
          <A href={`https://etherscan.io/address/${user.address}`} target="_blank" rel="noreferrer">
            {truncateAddress(user.address)}
          </A>
        </div>
        <SignOut />
      </div>
    </div>
  </div>
}