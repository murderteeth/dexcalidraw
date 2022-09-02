import { Button } from './controls'
import { useMoralis } from 'react-moralis'

export default function SignIn({ className }: { className?: string }) {
  const { authenticate } = useMoralis()
  return <div>
    <Button 
      onClick={() => authenticate({signingMessage: 'Please sign this message to confirm your identity.'})} 
      className={className}>
      <img width='28px' height='28px' src='/metamask.svg' alt='metamask' />
      {'Sign in with Metamask'}
    </Button>
  </div>
}