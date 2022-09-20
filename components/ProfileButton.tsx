import { useMoralis } from 'react-moralis'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { truncateAddress } from '../utilities'
import { useDialogRoute } from '../hooks/useDialogRoute'

function Option({onClick, className, children} : {onClick?: () => void, className?: string, children: any}) {
  return <div onClick={onClick}
    className={`
    w-full px-16 py-4 h-fit
    bg-gray-100 hover:bg-gray-200
    dark:text-purple-100
    dark:bg-[#363636] dark:hover:bg-[#1f1f1f]
    first:rounded-t-lg last:rounded-b-lg
    whitespace-nowrap cursor-pointer shadow-md
    ${className}`}>
    {children}
  </div>
}

export default function ProfileButton() {
  const { setDialogRoute } = useDialogRoute()
  const { account, logout } = useMoralis()

  return <div className={'group relative h-full'}>
    <div className={'w-[48px] h-[32px] py-2'}></div>
    <div className={`
      absolute z-[10] top-0 mx-[8px] flex items-center justify-center 
      rounded-full`}>
      <Jazzicon diameter={32} seed={jsNumberForAddress(account || '')} />
    </div>
    <div className={`
      absolute top-[32px] -right-[16px] pt-[16px] block
      opacity-0 pointer-events-none
      group-hover:opacity-100 group-hover:pointer-events-auto
      flex items-center justify-center`}>
      <div className={'w-fit h-fit'}>
        <Option onClick={() => setDialogRoute('open')}>
          {'Open'}
        </Option>
        <Option onClick={() => setDialogRoute('save')}>
          {'Save'}
        </Option>
        <Option onClick={() => setDialogRoute('subscription')}>
          {'Subscription'}
        </Option>
        <Option onClick={() =>
            window.open(`https://etherscan.io/address/${account}`, '_blank', 'noreferrer')
          }
          className={'border-t border-t-gray-300 dark:border-t-[#1f1f1f]'}>
          {truncateAddress(account)}
        </Option>
        <Option onClick={logout} className={''}>
          {'Sign out'}
        </Option>
      </div>
    </div>
  </div>
}