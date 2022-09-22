import { AiOutlineClose } from 'react-icons/ai'
import { useDialogRoute } from '../../hooks/useDialogRoute'
import { Button } from '../controls'
import Wordmark from '../Wordmark'
import DialogButton from './DialogButton'
import { useDexcalidraw } from '../../hooks/useDexcalidraw'
import { useCallback, useMemo } from 'react'
import Pendragon from '../Pendragon'

export default function Thanks() {
  const { setDialogRoute } = useDialogRoute()
  const { appState } = useDexcalidraw()
  const darkMode = useMemo(() => appState?.theme === 'dark', [appState])
  const { refreshSubscription } = useDexcalidraw()

  const onOk = useCallback(() => {
    refreshSubscription()
    setDialogRoute('')
  }, [refreshSubscription, setDialogRoute])

  return <div className={'relative w-full flex flex-col'}>
    <div>
      <div className={`
        w-full px-8 flex items-center justify-end`}>
        <div className='flex items-center justify-end gap-8'>
          <DialogButton onClick={() => setDialogRoute('')}>
            <AiOutlineClose />
          </DialogButton>
        </div>
      </div>
    </div>

    <div className={`
      w-full h-full max-w-full max-h-full 
      flex items-center justify-center 
      dark:text-purple-500`}>

      <div className={'w-1/2 px-32 flex flex-col items-center gap-2'}>
        <Wordmark word={'Pendragon Plan'} className={'text-5xl'} glow={darkMode} shadow={!darkMode} />
        <div className={'relative flex items-center justify-center'}>
          <Pendragon className={'w-64 h-64 stroke-purple-500 fill-red-400 dark:fill-red-600'} />
        </div>
        <h2 className={'text-2xl font-bold'}>{'Thank you!'}</h2>
        <p className={'text-lg'}>
          {'You are now subscribed to the Pendragon Plan for one year.'}
        </p>
        <Button className={'mt-4 w-48'} onClick={onOk}>
          {'OK'}
        </Button>
      </div>

    </div>
  </div>
}