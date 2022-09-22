import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { AppState, BinaryFiles, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'
import React, { useCallback, useMemo } from 'react'
import { useMoralis } from 'react-moralis'
import { useDialogRoute } from '../hooks/useDialogRoute'
import { useDexcalidraw } from '../hooks/useDexcalidraw'
import ProfileButton from './ProfileButton'
import SignIn from './SignIn'
import Wordmark from './Wordmark'
import chains from '../chains.json'

function TopRightUi() {
  const {  isAuthenticated } = useMoralis()
  const { setDialogRoute } = useDialogRoute()
  const { chain } = useDexcalidraw()

  const isChainSupported = useMemo(() => {
    return chain.id !== 0
  }, [chain])

  return <div className={'Island'}>
    <div className={`
      px-4 py-2 flex items-center gap-4 shadow-md rounded-lg`}>
      <div onClick={() => setDialogRoute('about')} className={'cursor-pointer'}>
        {isChainSupported && <Wordmark />}
        {!isChainSupported && <div className={'px-4 py-2 text-xl text-red-400'}>
          {`Network ${chain.id} not supported!`}
        </div>}
      </div>
      {isAuthenticated && isChainSupported && <ProfileButton />}
      {!isAuthenticated && isChainSupported && <SignIn />}
    </div>
  </div>
}

function ResetOverlay() {
  const { excalidrawApi, resetCurrentDrawing } = useDexcalidraw()

  async function onClick() {
    if(confirm('sure about that?')) {
      await excalidrawApi?.resetScene()
      resetCurrentDrawing()
    }
  }

  return <button title='Reset the canvas'
    onClick={onClick}
    className={`
    w-[40px] h-[40px] flex items-center justify-center
    bg-[#eaecef] dark:bg-[#363636]
    hover:bg-[#ced4da] dark:hover:bg-[#272727]
    active:bg-[#adb5bd] active:dark:bg-[#222]
    rounded-lg`}>
    <div className={'w-[14px] h-[14px] text-black dark:text-[#ced4da]'}>
      <svg aria-hidden='true' focusable='false' role='img' viewBox='0 0 448 512'>
        <path fill='currentColor' d='M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z'></path>
      </svg>
    </div>
  </button>
}

export default function Dexcalidraw() {
  const {
    excalidrawModule,
    setExcalidrawApi,
    elements, setElements, 
    appState, setAppState, 
    files, setFiles
  } = useDexcalidraw()

  const initialData = useMemo(() => {
    return {
      elements: [...elements],
      appState: {...appState, collaborators: []},
      files: {...files}
    }
  }, [elements, appState, files])

  const onChange = useCallback((elements: readonly ExcalidrawElement[], appState: AppState, files: BinaryFiles) => {
    setElements(elements.filter(e => !e.isDeleted))
    setAppState(appState)
    setFiles(files)
  }, [setElements, setAppState, setFiles])

  const _setExcalidrawRef = useCallback((element: ExcalidrawImperativeAPI) => {
    setExcalidrawApi(element)
  }, [setExcalidrawApi])

  if(excalidrawModule) {
    return <>
      <excalidrawModule.Excalidraw
        ref={_setExcalidrawRef}
        initialData={initialData}
        onChange={onChange}
        renderTopRightUI={TopRightUi} />
      <div className={`
        hidden sm:block
        absolute z-10 top-[12px] left-[12px]`}>
        <ResetOverlay />
      </div>
    </>
  } else {
    return <></>
  }
}