import React, { createContext, useContext, useEffect, useState } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'

const	DrawingsContext = createContext({ drawings: [] as string[]})
export const useDrawings = () => useContext(DrawingsContext)
export default function DrawingsProvider({ children } : { children: any }) {
  const [ drawings, setDrawings ] = useState([] as string[])
  const { user } = useMoralis()
  const { fetch: fetchDrawings } = useMoralisQuery(
    'Drawing',
    (query) => query.equalTo('owner', user),
    [user], { autoFetch: false }
  )

  useEffect(() => {
    (async () => {
      const refresh = (await fetchDrawings())?.map(d => d.id) || []
      setDrawings(refresh)
    })()
  }, [fetchDrawings, setDrawings])

	return <DrawingsContext.Provider value={{ drawings }}>
		{children}
	</DrawingsContext.Provider>
}