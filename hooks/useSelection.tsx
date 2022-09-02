import Moralis from 'moralis/types'
import React, { createContext, useContext, useState } from 'react'

interface ISelectionContext {
  selectionMode: boolean,
  selection: Moralis.Object[],
  toggleSelectionMode: () => void,
  select: (drawing: Moralis.Object) => void,
  deselect: (drawing: Moralis.Object) => void
}

const	SelectionContext = createContext<ISelectionContext>({
  selectionMode: false,
  selection: [] as Moralis.Object[],
  toggleSelectionMode: () => {},
  select: (drawing: Moralis.Object) => {},
  deselect: (drawing: Moralis.Object) => {}
})

export const useSelection = () => useContext(SelectionContext)
export default function SelectionProvider({ children } : { children: any }) {
  const [ selectionMode, setSelectionMode ] = useState(false)
  const [ selection, setSelection ] = useState([] as Moralis.Object[])
	return <SelectionContext.Provider value={{ 
    selectionMode,
    selection,
    toggleSelectionMode: () => setSelectionMode(mode => {
      if(mode) setSelection([])
      return !mode
    }),
    select: (drawing: Moralis.Object) => {
      if(!selection.some(s => s.id === drawing.id)) {
        setSelection(selection => [...selection, drawing])
      }
    },
    deselect: (drawing: Moralis.Object) => {
      setSelection(selection => {
        const result = selection.filter(s => s.id !== drawing.id)
        if(result.length === 0) setSelectionMode(false)
        return result
      })
    }
    }}>
		{children}
	</SelectionContext.Provider>
}