import { useCallback, useEffect, useState } from 'react'
import { useLongPress } from 'use-long-press'
import { useSelection } from '../../hooks/useSelection'
import { AiOutlineCheck } from 'react-icons/ai'

function Check({ checked }: { checked: boolean }) {
  return <div className={`
    aspect-square p-1 items-center rounded-full
    ${checked ? 'bg-amber-400 text-slate-900 shadow' : 'border border-purple-300'}`}>
    <AiOutlineCheck className={checked ? '' : 'invisible'} />
  </div>
}

export default function Tile({drawingId} : {drawingId: string}) {
  const [longPressed, setLongPressed] = useState(false)
  const {selection, selectionMode, toggleSelectionMode, select, deselect} = useSelection()
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    setSelected(selection.some(s => s === drawingId))
  }, [selection, setSelected])

  const onClick = useCallback(() => {
    if(!longPressed) {
      if(selectionMode) {
        if(selected) {
          deselect(drawingId)
        } else {
          select(drawingId)
        }
      } else {

      }
    }
  }, [longPressed, drawingId, select, deselect])

  const onLongPress = useCallback(() => {
    setLongPressed(true)
    if(!selectionMode) {
      toggleSelectionMode()
      select(drawingId)
    }
  }, [setLongPressed, selectionMode, toggleSelectionMode, select])

  const bindOnLongPress = useLongPress(onLongPress, { onFinish: () => {
    setTimeout(() => setLongPressed(false), 0)
  }})

  return <div className={'relative'}>
    {selectionMode && <div className={`
      absolute z-10 top-1 left-1`}>
      <Check checked={selected} />
    </div>}
    <div onClick={onClick} {...bindOnLongPress()} className={`
      aspect-video bg-purple-800 shadow rounded-lg
      hover:bg-amber-400 hover:text-slate-900
      ${selected ? 'scale-95' : 'scale-1'}
      active:transform active:scale-95
      transition duration-200 cursor-pointer`}>
    </div>
  </div>
}