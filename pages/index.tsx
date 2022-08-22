import { getSession, signOut } from 'next-auth/react'
import Dashboard from '../components/Dashboard'
import Lander from '../components/Lander'

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  if(session === undefined || !session?.user) {
    return { props: {} }
  } else {
    return { props: { user: session?.user } }
  }
}

export default function Index({ user } : { user: any }) {
  return <>
    {(user && <Dashboard user={user} />) || <Lander />}
  </>
}