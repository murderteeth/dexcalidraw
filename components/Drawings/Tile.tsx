import { useCallback, useEffect, useState } from 'react'
import { useLongPress } from 'use-long-press'
import { useSelection } from '../../hooks/useSelection'
import { AiOutlineCheck } from 'react-icons/ai'
import Moralis from 'moralis/types'
import { useExcalidraw } from '../../hooks/useExcalidraw'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { BinaryFiles } from '@excalidraw/excalidraw/types/types'
import { useDialogRoute } from '../../hooks/useDialogRoute'

function Check({ checked }: { checked: boolean }) {
  return <div className={`
    aspect-square p-1 items-center rounded-full
    ${checked ? 'bg-purple-500 text-purple-100 shadow' : 'border border-purple-400'}`}>
    <AiOutlineCheck className={checked ? '' : 'invisible'} />
  </div>
}

export default function Tile({drawing} : {drawing: Moralis.Object}) {  
  const { 
    excalidrawModule, 
    excalidrawApi, 
    appState, 
    setElements: setContextElements, 
    setDexcalidraw 
  } = useExcalidraw()

  const { setDialogRoute } = useDialogRoute()
  const [longPressed, setLongPressed] = useState(false)
  const {selection, selectionMode, toggleSelectionMode, select, deselect} = useSelection()
  const [selected, setSelected] = useState(false)
  const [name, setName] = useState<string>('')
  const [elements, setElements] = useState<readonly ExcalidrawElement[]>([])
  const [preview, setPreview] = useState<HTMLCanvasElement>()
  const [shhh, setShhh] = useState(true)

  useEffect(() => {
    setTimeout(() => setShhh(false), 100)
  }, [setShhh])

  useEffect(() => {
    if(!shhh && appState && excalidrawModule) {
      (async () => {
        setName(await drawing.get('name'))
        const file = await drawing.get('file')
        const response = await fetch(file._url)
        const json = await response.json()
        const elements = json.elements as ExcalidrawElement[]
        setElements(elements)
        const files = {} as BinaryFiles  
        excalidrawModule.exportToCanvas({
          elements, 
          appState: {...appState, exportWithDarkMode: appState.theme === 'dark'}, 
          files
        }).then(canvas => {
          setPreview(canvas)
        })
      })()
    }
  }, [shhh, appState, excalidrawModule, drawing, setName, setPreview])

  useEffect(() => {
    setSelected(selection.some(s => s.id === drawing.id))
  }, [selection, setSelected, drawing])

  const onClick = useCallback(() => {
    if(!longPressed) {
      if(selectionMode) {
        if(selected) {
          deselect(drawing)
        } else {
          select(drawing)
        }
      } else {
        (async () => {
          setDexcalidraw({ id: drawing.id, name: await drawing.get('name')})
          setContextElements(elements)
          await excalidrawApi?.updateScene({ elements, appState })
          setDialogRoute('')
        })()
      }
    }
  }, [
    longPressed, 
    drawing, 
    select, 
    deselect, 
    elements, 
    setDexcalidraw, 
    setContextElements, 
    excalidrawApi, 
    setDialogRoute,
    appState,
    selected,
    selectionMode
  ])

  const onLongPress = useCallback(() => {
    setLongPressed(true)
    if(!selectionMode) {
      toggleSelectionMode()
      select(drawing)
    }
  }, [setLongPressed, selectionMode, toggleSelectionMode, select, drawing])

  const bindOnLongPress = useLongPress(onLongPress, { onFinish: () => {
    setTimeout(() => setLongPressed(false), 0)
  }})

  return <div className={'relative group'}>
    {selectionMode && <div className={`
      absolute z-10 top-3 left-4 pointer-events-none`}>
      <Check checked={selected} />
    </div>}
    <div onClick={onClick} {...bindOnLongPress()} className={`
      aspect-video shadow-md rounded-lg
      dark:bg-[#222]
      hover:bg-[#eaecef] hover:dark:bg-[#363636]
      ${selected ? 'scale-95' : 'scale-1'}
      transition-scale duration-100 cursor-pointer`}>
      {preview && <img src={preview.toDataURL()} width={'100%'} height={'100%'} className={'w-full h-full rounded-lg'} alt={'thumbnail'} />}
      <div className={'absolute bottom-0 z-10 w-full p-2'}>
        <div className={`
          px-4 py-2 
          bg-gray-400/60 group-hover:bg-gray-600/60 group-active:bg-gray-800/60
          dark:bg-gray-800/60 dark:group-hover:bg-gray-400/60 dark:group-active:bg-gray-600/60
          dark:text-purple-100 rounded-lg`}>
          {name}
        </div>
      </div>
    </div>
  </div>
}