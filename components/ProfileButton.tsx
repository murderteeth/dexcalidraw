import { useMoralis } from 'react-moralis'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { truncateAddress } from '../utilities'

export default function ProfileButton() {
  const { account, chainId, logout } = useMoralis()

  return <div className={'group relative h-full'}>
    <div className={'w-[48px] h-[48px]'}></div>
    <div className={`
      absolute z-[10] top-0 p-[4px] flex items-center justify-center 
      bg-purple-500 group-hover:bg-slate-900
      shadow-md rounded-full`}>
      <Jazzicon diameter={40} seed={jsNumberForAddress(account || '')} />
    </div>
    <div className={`
      absolute inset-1 -right-2 hidden group-hover:block
      pt-[68px] flex items-center justify-center
      `}>
      <div className={'absolute -right-2 w-fit h-fit'}>
        <button onClick={() =>
            window.open(`https://etherscan.io/address/${account}`, '_blank', 'noreferrer')
          }
          className={`
          w-full px-16 py-4 h-fit 
          border-b border-b-black/20
          text-purple-500 hover:text-slate-100 bg-slate-900
          shadow-md rounded-t-lg
          whitespace-nowrap`}>
          {truncateAddress(account)}
        </button>
        <button onClick={logout} className={`
          w-full px-16 py-4
          text-purple-500 hover:text-slate-100 bg-slate-900
          shadow-md rounded-b-lg
          whitespace-nowrap`}>
          {'Sign out'}
        </button>
      </div>
    </div>
  </div>
}