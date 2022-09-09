import React, { createContext, useContext, useState } from 'react'

interface DialogRoute {
  dialogRoute: string,
  setDialogRoute: (route: string) => void
}

const	DialogRouteContext = createContext({} as DialogRoute)
export const useDialogRoute = () => useContext(DialogRouteContext)
export default function DialogRouteProvider({ children } : { children: any }) {
  const [dialogRoute, setDialogRoute] = useState('')
	return <DialogRouteContext.Provider value={{ dialogRoute, setDialogRoute }}>
		{children}
	</DialogRouteContext.Provider>
}