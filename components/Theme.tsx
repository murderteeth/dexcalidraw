import { useEffect, useState } from 'react'
import { useDexcalidraw } from '../hooks/useDexcalidraw'

export default function Theme({ className, children }: { className: string, children: any }) {
  const {appState} = useDexcalidraw()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [setMounted])
  return <div className={`
    ${mounted && appState?.theme === 'dark' ? 'dark' : ''}
    ${className}`}>{children}</div>
}
