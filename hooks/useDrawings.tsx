import Moralis from 'moralis/types'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import { useBusy } from '../components/Busy'

const	DrawingsContext = createContext({ drawings: [] as Moralis.Object[]})
export const useDrawings = () => useContext(DrawingsContext)
export default function DrawingsProvider({ children } : { children: any }) {
  const { setBusy } = useBusy()
  const [ drawings, setDrawings ] = useState([] as Moralis.Object[])
  const { user } = useMoralis()

  const { data, isLoading } = useMoralisQuery(
    'Drawing',
    query => query.equalTo('owner', user),
    [user], { live: true }
  )

  useEffect(() => {
    setBusy(isLoading)
  }, [isLoading, setBusy])

  useEffect(() => {
    setDrawings(data)
  }, [data, setDrawings])

	return <DrawingsContext.Provider value={{ drawings }}>
		{children}
	</DrawingsContext.Provider>
}