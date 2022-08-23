import Image from 'next/image'
import { Button } from './controls'
import { useMoralis } from 'react-moralis'

export default function SignIn({ className }: { className?: string }) {
  const { authenticate } = useMoralis()
  return <Button onClick={() => authenticate({signingMessage: 'Please sign this message to confirm your identity.'})} className={className}>
    <Image width="32" height="32" src="/metamask.svg" alt="metamask" />
    Sign in with Metamask
  </Button>
}