import React, { createContext, useContext, useState } from 'react'

interface ISelectionContext {
  selectionMode: boolean,
  selection: string[],
  toggleSelectionMode: () => void,
  select: (drawingId: string) => void,
  deselect: (drawingId: string) => void
}

const	SelectionContext = createContext<ISelectionContext>({
  selectionMode: false,
  selection: [] as string[],
  toggleSelectionMode: () => {},
  select: (drawingId: string) => {},
  deselect: (drawingId: string) => {}
})

export const useSelection = () => useContext(SelectionContext)
export default function SelectionProvider({ children } : { children: any }) {
  const [ selectionMode, setSelectionMode ] = useState(false)
  const [ selection, setSelection ] = useState([] as string[])
	return <SelectionContext.Provider value={{ 
    selectionMode,
    selection,
    toggleSelectionMode: () => setSelectionMode(mode => {
      if(mode) setSelection([])
      return !mode
    }),
    select: (drawingId: string) => {
      setSelection(selection => Array.from(new Set([...selection, drawingId])))
    },
    deselect: (drawingId: string) => {
      setSelection(selection => selection.filter(s => s !== drawingId))
    }
    }}>
		{children}
	</SelectionContext.Provider>
}