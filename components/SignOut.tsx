import { useMoralis } from 'react-moralis'
import { Button } from './controls'

export default function SignOut({ className }: { className?: string }) {
  const { logout } = useMoralis()
  return <Button onClick={logout} className={className}>
    Sign out
  </Button>
}