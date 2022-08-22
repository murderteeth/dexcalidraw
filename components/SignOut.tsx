import { signOut } from 'next-auth/react'
import { Button } from './controls'

export default function SignOut({ className }: { className?: string }) {
  return <Button onClick={() => signOut({ callbackUrl: '/' })} className={className}>
    Sign out
  </Button>
}