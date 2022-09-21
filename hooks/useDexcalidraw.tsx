import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import useLocalStorage from 'use-local-storage'
import { Excalidraw, exportToCanvas, exportToSvg, serializeAsJSON } from '@excalidraw/excalidraw'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { AppState, BinaryFiles, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'
import chains from '../chains.json'

export interface ExcalidrawModule {
  Excalidraw: typeof Excalidraw,
  exportToCanvas: typeof exportToCanvas,
  exportToSvg: typeof exportToSvg,
  serializeAsJSON: typeof serializeAsJSON
}

export interface Chain {
  id: number,
  explorer: string,
  contract: string,
  dai: string
}

export interface CurrentDrawing {
  id: string,
  name: string
}

export interface Quota {
  used: number,
  max: number,
  filled: boolean
}

interface DexcalidrawState {
  chain: Chain,
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
  resetCurrentDrawing: () => void,
  quota: Quota,
  refreshQuota: () => void
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
  const { fetch: fetchQuota } = useMoralisCloudFunction('quota', { autoFetch: false })
  const { isInitialized: isMoralisInitialized, chainId } = useMoralis()
  const [quota, setQuota] = useState<Quota>({ used: 0, max: 3, filled: false })

  const chain = useMemo<Chain>(() => {
    const result = Object.values(chains).find(chain => chain.id === parseInt(chainId || '0'))
    if(result) return result
    return { id: 0, explorer: '', contract: '', dai: ''} as Chain
  }, [chainId])

  const refreshQuota = useCallback(() => {
    if(isMoralisInitialized) {
      fetchQuota({
        onSuccess: (results) => {
          const used = (results as any).used
          const max = (results as any).max
          setQuota({used, max, filled: used >= max})
        },
        onError: (error) => console.error('fetchQuota', error)
      })
    }
  }, [fetchQuota, isMoralisInitialized])

  useEffect(() => {
    refreshQuota()
  }, [refreshQuota])

  useEffect(() => {
    import("@excalidraw/excalidraw").then((module) => {
      setModule(module)
    })
  }, [])

	return <DexcalidrawContext.Provider value={{
    chain,
    excalidrawModule: module,
    excalidrawApi: api, setExcalidrawApi: setApi,
    elements, setElements,
    appState, setAppState,
    files, setFiles,
    currentDrawing: currentDrawing, setCurrentDrawing: setCurrentDrawing, 
    resetCurrentDrawing: () => setCurrentDrawing({ id: '', name: '' }),
    quota,
    refreshQuota
    }}>
    {children}
  </DexcalidrawContext.Provider>
}