import { useMoralis } from 'react-moralis'

export default function SignIn() {
  const { authenticate } = useMoralis()
  return <button
    onClick={() => authenticate({
      signingMessage: 'Please sign this message to confirm your identity.'})}>
    <div className={'px-4 py-2 flex items-center gap-3'}>
      <img width='24px' height='24px' src='/metamask.svg' alt='metamask' />
      {'Sign in with Metamask'}
    </div>
  </button>
}