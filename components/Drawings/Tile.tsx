import { useCallback, useEffect, useState } from 'react'
import { useLongPress } from 'use-long-press'
import { useSelection } from '../../hooks/useSelection'
import { AiOutlineCheck } from 'react-icons/ai'
import Moralis from 'moralis/types'

function Check({ checked }: { checked: boolean }) {
  return <div className={`
    aspect-square p-1 items-center rounded-full
    ${checked ? 'bg-amber-400 text-slate-900 shadow' : 'border border-purple-400'}`}>
    <AiOutlineCheck className={checked ? '' : 'invisible'} />
  </div>
}

export default function Tile({drawing} : {drawing: Moralis.Object}) {
  const [longPressed, setLongPressed] = useState(false)
  const {selection, selectionMode, toggleSelectionMode, select, deselect} = useSelection()
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    setSelected(selection.some(s => s.id === drawing.id))
  }, [selection, setSelected])

  const onClick = useCallback(() => {
    if(!longPressed) {
      if(selectionMode) {
        if(selected) {
          deselect(drawing)
        } else {
          select(drawing)
        }
      } else {

      }
    }
  }, [longPressed, drawing, select, deselect])

  const onLongPress = useCallback(() => {
    setLongPressed(true)
    if(!selectionMode) {
      toggleSelectionMode()
      select(drawing)
    }
  }, [setLongPressed, selectionMode, toggleSelectionMode, select])

  const bindOnLongPress = useLongPress(onLongPress, { onFinish: () => {
    setTimeout(() => setLongPressed(false), 0)
  }})

  return <div className={'relative'}>
    {selectionMode && <div className={`
      absolute z-10 top-2 left-2 pointer-events-none`}>
      <Check checked={selected} />
    </div>}
    <div onClick={onClick} {...bindOnLongPress()} className={`
      aspect-video shadow rounded-lg
      border-2 border-purple-500
      hover:bg-slate-900 hover:text-slate-900
      ${selected ? 'scale-95' : 'scale-1'}
      active:transform active:scale-95
      transition duration-200 shadow-lg cursor-pointer`}>
    </div>
  </div>
}