import { AiOutlineClose } from 'react-icons/ai'
import { useDexcalidraw } from '../../../hooks/useDexcalidraw'
import { useDialogRoute } from '../../../hooks/useDialogRoute'
import DialogButton from '../DialogButton'
import FreePlan from './FreePlan'

export default function Subscription() {
  const { setDialogRoute } = useDialogRoute()
  const { quota } = useDexcalidraw()

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
      <FreePlan className={'w-1/2 px-24'} />
    </div>
  </div>
}