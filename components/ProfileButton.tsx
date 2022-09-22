import { useMoralis } from 'react-moralis'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { truncateAddress } from '../utilities'
import { useDialogRoute } from '../hooks/useDialogRoute'
import { useDexcalidraw } from '../hooks/useDexcalidraw'
import { useCallback, useMemo } from 'react'

function Option({onClick, className, children} : {onClick?: () => void, className?: string, children: any}) {
  return <div onClick={onClick}
    className={`
    relative w-full px-16 py-4 h-fit
    flex items-center justify-between
    dark:text-purple-100
    bg-[#eaecef] dark:bg-[#363636]
    hover:bg-[#ced4da] dark:hover:bg-[#272727]
    active:bg-[#adb5bd] active:dark:bg-[#222]
    first:rounded-t-lg last:rounded-b-lg
    whitespace-nowrap cursor-pointer shadow-md
    ${className}`}>
    {children}
  </div>
}

export default function ProfileButton() {
  const { setDialogRoute } = useDialogRoute()
  const { account, logout } = useMoralis()
  const { chain, currentDrawing, subscription } = useDexcalidraw()

  const onSave = useCallback(() => {
    if(subscription.filled && !currentDrawing.id) {
      setDialogRoute('subscription')
    } else {
      setDialogRoute('save')
    }
  }, [subscription, currentDrawing, setDialogRoute])

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
        <Option onClick={onSave}>
          {'Save'}
        </Option>
        <Option onClick={() => setDialogRoute('subscription')}>
          {subscription.nft.token === 0 ? 'Free Plan' : 'Pendragon Plan'}
          <div className={`ml-4 -mr-8 px-2 py-1 text-xs rounded-lg shadow-sm
            ${(subscription.filled || subscription.nft.expired) ? 'bg-red-400 dark:bg-red-500' : 'bg-purple-400 dark:bg-purple-500'}`}>
            {`${subscription.used} / ${subscription.max}`}
          </div>
        </Option>
        <Option onClick={() =>
            window.open(`${chain?.explorer}/address/${account}`, '_blank', 'noreferrer')
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