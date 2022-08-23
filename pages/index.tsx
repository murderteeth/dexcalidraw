import { useMoralis } from 'react-moralis'
import Dashboard from '../components/Dashboard'
import Lander from '../components/Lander'

export default function Index() {
  const { isAuthenticated } = useMoralis()

  return <>
    {(isAuthenticated && <Dashboard />) || <Lander />}
  </>
}