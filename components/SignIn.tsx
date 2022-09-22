import { useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import { useDexcalidraw } from '../hooks/useDexcalidraw'

export default function SignIn() {
  const { authenticate, isAuthenticated } = useMoralis()
  const { refreshSubscription } = useDexcalidraw()

  useEffect(() => {
    if(isAuthenticated) refreshSubscription()
  }, [isAuthenticated, refreshSubscription])

  return <button
    onClick={() => authenticate({
      signingMessage: 'Please sign this message to confirm your identity.'})}>
    <div className={'px-4 py-2 flex items-center gap-3'}>
      <img width='24px' height='24px' src='/metamask.svg' alt='metamask' />
      {'Sign in with Metamask'}
    </div>
  </button>
}