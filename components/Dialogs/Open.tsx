import { useCallback } from 'react'
import Wordmark from '../Wordmark'
import Drawings from '../Drawings'
import { useSelection } from '../../hooks/useSelection'
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai'
import Busy, { useBusy } from '../Busy'
import { useDialogRoute } from '../../hooks/useDialogRoute'
import DialogButton from './DialogButton'
import { useDexcalidraw } from '../../hooks/useDexcalidraw'

export default function Open() {
  const { setBusy } = useBusy()
  const { setDialogRoute } = useDialogRoute()
  const { toggleSelectionMode, selectionMode, selection } = useSelection()
  const { refreshSubscription, currentDrawing, resetCurrentDrawing } = useDexcalidraw()

  const onDeleteSelection = useCallback(async () => {
    if(confirm('Sure about that?')) {
      setBusy(true)
      for(let drawing of selection) {
        if(drawing.id === currentDrawing.id) resetCurrentDrawing()
        await drawing.destroy()
      }
      toggleSelectionMode()
      refreshSubscription()
      setBusy(false)
    }
  }, [setBusy, selection, toggleSelectionMode, refreshSubscription, currentDrawing, resetCurrentDrawing])

  return <div className={'relative w-full flex flex-col'}>
    <Busy />

    <div>
      {!selectionMode && <div className={`
        w-full px-8 flex items-center justify-between text-purple-400 shadow-md`}>
        <Wordmark word={'Open drawing..'} className={'text-2xl'} />
        <div className="flex items-center justify-end gap-8">
          <DialogButton onClick={() => setDialogRoute('')}>
            <AiOutlineClose />
          </DialogButton>
        </div>
      </div>}
      {selectionMode && <div className={`
        w-full px-8 flex items-center justify-between text-purple-500 shadow-md`}>
        <div className={'flex items-center gap-6'}>
          <DialogButton onClick={toggleSelectionMode}>
            <AiOutlineClose />
          </DialogButton>
          <div className={'font-bold text-xl'}>{selection.length}</div>
        </div>

        <DialogButton onClick={onDeleteSelection}>
          <AiOutlineDelete />
        </DialogButton>
      </div>}
    </div>

    <div className={'overflow-auto'}>
      <Drawings />
    </div>
  </div>
}