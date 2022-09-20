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

export interface CurrentDrawing {
  id: string,
  name: string
}

interface DexcalidrawState {
  excalidrawModule: ExcalidrawModule,
  excalidrawApi: ExcalidrawImperativeAPI|null,
  setExcalidrawApi: (api: ExcalidrawImperativeAPI) => void,
  elements: readonly ExcalidrawElement[],
  setElements: (elements: readonly ExcalidrawElement[]) => void,
  appState: AppState|null,
  setAppState: (appState: AppState) => void,
  files: BinaryFiles|null,
  setFiles: (files: BinaryFiles) => void,
  currentDrawing: { id: string, name: string }
  setCurrentDrawing: (state: CurrentDrawing) => void,
  resetCurrentDrawing: () => void
}

const	DexcalidrawContext = createContext({} as DexcalidrawState)
export const useDexcalidraw = () => useContext(DexcalidrawContext)
export default function DexcalidrawProvider({ children } : { children: any }) {
  const [module, setModule] = useState(null as any)
  const [api, setApi] = useState<ExcalidrawImperativeAPI|null>(null)
  const [elements, setElements] = useLocalStorage<readonly ExcalidrawElement[]>('elements', [])
  const [appState, setAppState] = useLocalStorage<AppState|null>('appState', null)
  const [files, setFiles] = useLocalStorage<BinaryFiles|null>('files', null)
  const [currentDrawing, setCurrentDrawing] = useLocalStorage<CurrentDrawing>('currentDrawing', { id: '', name: '' })

  useEffect(() => {
    import("@excalidraw/excalidraw").then((module) => {
      setModule(module)
    })
  }, [])

	return <DexcalidrawContext.Provider value={{
    excalidrawModule: module,
    excalidrawApi: api, setExcalidrawApi: setApi,
    elements, setElements,
    appState, setAppState,
    files, setFiles,
    currentDrawing: currentDrawing, setCurrentDrawing: setCurrentDrawing, 
    resetCurrentDrawing: () => setCurrentDrawing({ id: '', name: '' }) }}>
    {children}
  </DexcalidrawContext.Provider>
}