import { useEffect, useState } from 'react'
import { useExcalidraw } from '../hooks/useExcalidraw'

export default function Theme({ className, children }: { className: string, children: any }) {
  const {appState} = useExcalidraw()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [setMounted])
  return <div className={`
    ${mounted && appState?.theme === 'dark' ? 'dark' : ''}
    ${className}`}>{children}</div>
}
