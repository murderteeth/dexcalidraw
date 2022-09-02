import { useCallback, useEffect } from 'react'
import { useMoralis, useMoralisCloudFunction, useMoralisFile, useMoralisQuery, useNewMoralisObject } from 'react-moralis'
import useScrollOverpass from '../hooks/useScrollOverpass'
import { Button } from './controls'
import Wordmark from './Wordmark'
import ProfileButton from './ProfileButton'
import Drawings from './Drawings'
import { useDrawings } from '../hooks/useDrawings'
import { useSelection } from '../hooks/useSelection'
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai'
import Busy from './Busy'
// import Moralis from 'moralis/types'

function HeaderButton({ onClick, icon } : { onClick: () => void, icon?: any }) {
  return <button onClick={onClick} className={`
    p-2 text-2xl hover:bg-amber-400 hover:text-slate-900 
    active:transform active:scale-95
    transition duration-200 rounded-full`}>
    {icon()}
  </button>
}

export default function Dashboard() {
  const { user } = useMoralis()
  const {saveFile} = useMoralisFile()
  const { save: saveDrawing } = useNewMoralisObject('Drawing')
  const { overpassClassName } = useScrollOverpass()
  const {drawings} = useDrawings()
  const {toggleSelectionMode, selectionMode, selection} = useSelection()

  const { fetch: fetchTest } = useMoralisCloudFunction(
    "test",
    { test: "👋 Hello Console" },
    { autoFetch: false }
  );

  useEffect(() => {
    fetchTest({
      onSuccess: (data) => console.log(data)
    });
  }, [fetchTest])

  // useEffect(() => {
  //   console.log('account', account, chainId, user)
  // }, [account, user])

  const onSaveDrawing = useCallback(async () => {
    const data = {
      base64: Buffer.from(JSON.stringify({ hello: 'world' })).toString('base64')
    }
    const name = `Drawing #${drawings.length}`
    const file = await saveFile(name, data, { saveIPFS: true })
    console.log('file', file)
    const drawing = await saveDrawing({
      owner: user,
      name, file
    })
  }, [drawings, saveFile, saveDrawing])

  const onDeleteSelection = useCallback(async () => {
    for(let drawing of selection) await drawing.destroy()
    toggleSelectionMode()
  }, [selection, toggleSelectionMode])

  return <div className="relative w-full flex flex-col">
    <Busy />
    {/* HACK: inject these overpass utlity classes */}
    <div className="bg-purple-900/60 backdrop-blur-md shadow-md hidden">x</div>
    <div className={`
      sticky top-0 z-10 h-20 px-8 flex items-center
      ${overpassClassName}`}>

      {!selectionMode && <div className={'w-full grid grid-cols-3 '}>
        <Wordmark className="w-fit text-3xl" />
        <div className={'flex items-center justify-center'}>
          <Button onClick={onSaveDrawing}>Save drawing</Button>
        </div>
        <div className="flex items-center justify-end gap-8">
          <ProfileButton />
        </div>
      </div>}

      {selectionMode && <div className={'w-full flex items-center justify-between text-purple-300'}>
        <div className={'flex items-center gap-6'}>
          <HeaderButton onClick={toggleSelectionMode} icon={AiOutlineClose} />
          <div className={'font-bold text-xl'}>{selection.length}</div>
        </div>

        <HeaderButton onClick={onDeleteSelection} icon={AiOutlineDelete} />
      </div>}

    </div>
    <Drawings />
  </div>
}