import React, { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'
import { Excalidraw, exportToCanvas, exportToSvg, serializeAsJSON } from '@excalidraw/excalidraw'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { AppState, BinaryFiles, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'

export interface ExcalidrawModule {
  Excalidraw: typeof Excalidraw,
  exportToCanvas: typeof exportToCanvas,
  exportToSvg: typeof exportToSvg,
  serializeAsJSON: typeof serializeAsJSON
}

export interface DexcalidrawState {
  id: string,
  name: string
}

interface ExcalidrawState {
  excalidrawModule: ExcalidrawModule,
  excalidrawApi: ExcalidrawImperativeAPI|null,
  setExcalidrawApi: (api: ExcalidrawImperativeAPI) => void,
  elements: readonly ExcalidrawElement[],
  setElements: (elements: readonly ExcalidrawElement[]) => void,
  appState: AppState|null,
  setAppState: (appState: AppState) => void,
  files: BinaryFiles|null,
  setFiles: (files: BinaryFiles) => void,
  dexcalidraw: { id: string, name: string }
  setDexcalidraw: (state: DexcalidrawState) => void,
  resetDexcalidraw: () => void
}

const	ExcalidrawContext = createContext({} as ExcalidrawState)
export const useExcalidraw = () => useContext(ExcalidrawContext)
export default function ExcalidrawProvider({ children } : { children: any }) {
  const [module, setModule] = useState(null as any)
  const [api, setApi] = useState<ExcalidrawImperativeAPI|null>(null)
  const [elements, setElements] = useLocalStorage<readonly ExcalidrawElement[]>('elements', [])
  const [appState, setAppState] = useLocalStorage<AppState|null>('appState', null)
  const [files, setFiles] = useLocalStorage<BinaryFiles|null>('files', null)
  const [dexcalidraw, setDexcalidraw] = useLocalStorage<DexcalidrawState>('dexcalidraw', { id: '', name: '' })

  useEffect(() => {
    import("@excalidraw/excalidraw").then((module) => {
      setModule(module)
    })
  }, [])

	return <ExcalidrawContext.Provider value={{
    excalidrawModule: module,
    excalidrawApi: api, setExcalidrawApi: setApi,
    elements, setElements,
    appState, setAppState,
    files, setFiles,
    dexcalidraw, setDexcalidraw, 
    resetDexcalidraw: () => setDexcalidraw({ id: '', name: '' }) }}>
    {children}
  </ExcalidrawContext.Provider>
}