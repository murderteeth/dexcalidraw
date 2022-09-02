import { useMoralis } from 'react-moralis'
import Dashboard from '../components/Dashboard'
import Lander from '../components/Lander'
import DrawingsProvider from '../hooks/useDrawings'
import SelectionProvider from '../hooks/useSelection'

export default function Index() {
  const { isAuthenticated } = useMoralis()

  return <>
    {(isAuthenticated && 
      <DrawingsProvider>
        <SelectionProvider>
          <Dashboard />
        </SelectionProvider>
      </DrawingsProvider>) 
      || <Lander />}
  </>
}