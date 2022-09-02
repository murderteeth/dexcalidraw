import React, { createContext, useContext, useEffect, useState } from 'react'

const	BusyContext = createContext({ busy: false, setBusy: (busy: boolean) => {}})
export const useBusy = () => useContext(BusyContext)
export function BusyProvider({ children } : { children: any }) {
  const [busy, setBusy] = useState(false)
	return <BusyContext.Provider value={{ busy, setBusy }}>
		{children}
	</BusyContext.Provider>
}

export default function Busy() {
  return <div className={`
    absolute top-0 left-0 w-full h-1
    bg-amber-400
    `} />
}