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
  subscriptions: string,
  dai: string
}

export interface CurrentDrawing {
  id: string,
  name: string
}

export interface Subscription {
  used: number,
  max: number,
  filled: boolean,
  nft: {
    token: number,
    expired: boolean,
    expiration: number
  }
}

interface DexcalidrawState {
  ready: boolean,
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
  subscription: Subscription,
  refreshSubscription: () => void
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

  const { isAuthenticated, isInitialized: isMoralisInitialized, Moralis, chainId: moralisChainId } = useMoralis()
  const ready = useMemo(() => isMoralisInitialized, [isMoralisInitialized])
   
  const chainId = useMemo(() => {
    if(isMoralisInitialized) {
      if(moralisChainId) return moralisChainId
      const result = Moralis.getChainId()
      return result || '0x00'
    }
    return '0x00'
  }, [isMoralisInitialized, moralisChainId, Moralis])

  const chain = useMemo<Chain>(() => {
    const result = Object.values(chains).find(chain => chain.id === parseInt(chainId))
    if(result) return (result as Chain)
    return { id: 0, explorer: '', subscriptions: '', dai: ''} as Chain
  }, [chainId])

  const { fetch: fetchSubscription } = useMoralisCloudFunction('subscription', { }, { autoFetch: false })
  const [subscription, setSubscription] = useState<Subscription>({ 
    used: 0, max: 3, filled: false, 
    nft: { token: 0, expired: false, expiration: 0 } 
  })

  const refreshSubscription = useCallback(() => {
    if(isMoralisInitialized && isAuthenticated) {
      fetchSubscription({
        onSuccess: (results) => {
          const used = (results as any).used
          const max = (results as any).max
          const nft = (results as any).nft
          setSubscription({
            used, max, nft, filled: used >= max
          })
        },
        onError: (error) => console.error('fetchSubscription', error)
      })
    }
  }, [fetchSubscription, isMoralisInitialized, isAuthenticated])

  useEffect(() => {
    refreshSubscription()
  }, [refreshSubscription])

  useEffect(() => {
    import("@excalidraw/excalidraw").then((module) => {
      setModule(module)
    })
  }, [])

	return <DexcalidrawContext.Provider value={{
    ready,
    chain,
    excalidrawModule: module,
    excalidrawApi: api, setExcalidrawApi: setApi,
    elements, setElements,
    appState, setAppState,
    files, setFiles,
    currentDrawing: currentDrawing, setCurrentDrawing: setCurrentDrawing, 
    resetCurrentDrawing: () => setCurrentDrawing({ id: '', name: '' }),
    subscription,
    refreshSubscription
    }}>
    {children}
  </DexcalidrawContext.Provider>
}