import React, { createContext, useContext, useState } from 'react'
import TopBarProgress from 'react-topbar-progress-indicator'
import colors from 'tailwindcss/colors'

const	BusyContext = createContext({ busy: false, setBusy: (busy: boolean) => {}})
export const useBusy = () => useContext(BusyContext)
export function BusyProvider({ children } : { children: any }) {
  const [busy, setBusy] = useState(false)
	return <BusyContext.Provider value={{ busy, setBusy }}>
		{children}
	</BusyContext.Provider>
}

TopBarProgress.config({
  barColors: {
    '0': colors.purple[400],
    '0.75': colors.amber[300],
    '1.0': colors.purple[400]
  },
  shadowBlur: 5
})

export default function Busy() {
  const {busy} = useBusy()
  return <div className={`absolute top-0 left-0 w-full pointer-events-none`}>
    {busy && <TopBarProgress  />}
  </div>
}