import { useMemo } from 'react'
import { useDexcalidraw } from '../../../hooks/useDexcalidraw'
import { useDialogRoute } from '../../../hooks/useDialogRoute'
import { Button } from '../../controls'
import Wordmark from '../../Wordmark'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Hexagon from '../Mint/Hexagon'
import QR from '../Mint/QR'
dayjs.extend(relativeTime)

export default function PendragonPlan({ className }: { className: string }) {
  const { setDialogRoute } = useDialogRoute()
  const { appState, subscription } = useDexcalidraw()
  const darkMode = useMemo(() => appState?.theme === 'dark', [appState])

  return <div className={`
    flex flex-col items-center gap-8
    ${className}`}>
    <Wordmark word={'Pendragon Plan'} className={'text-5xl'} glow={darkMode} shadow={!darkMode} />
    <p className={'text-lg'}>
      {'Store up to 1 GB of drawings for a year.'}
    </p>
    <div className={'relative flex items-center justify-center'}>
      <Hexagon className={'w-48 h-48 stroke-purple-500'} />
      <QR className={'absolute w-24 h-24 stroke-purple-500 fill-amber-400'} />
    </div>
    <div className={'flex flex-col items-center gap-2'}>
      <p>You are using</p>
      <div className={`inline px-2 py-1 
        text-4xl dark:text-white
        rounded-lg shadow-sm
        ${subscription.filled ? 'bg-red-400 dark:bg-red-500' : 'bg-purple-400 dark:bg-purple-500'}`}>
        {`${subscription.used} / ${subscription.max}`}
      </div>
      <p>of your drawings</p>
    </div>

    {!subscription.nft.expired && <div className={''}>
      Expires {dayjs(subscription.nft.expiration * 1000).format('YYYY MM DD')}
    </div>}

    {subscription.nft.expired && <>
      <p className={'text-lg '}>
        {`Looks like your subscription expired! Your drawings are safe, but please renew to continue saving changes.`}
      </p>
      <Button onClick={() => setDialogRoute('mint')}>{'Renew the Pendragon Plan'}</Button>
    </>}
  </div>
}