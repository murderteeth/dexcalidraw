import { useMoralis } from 'react-moralis'
import { BusyProvider } from '../components/Busy'
import Dashboard from '../components/Dashboard'
import Lander from '../components/Lander'
import DrawingsProvider from '../hooks/useDrawings'
import SelectionProvider from '../hooks/useSelection'

export default function Index() {
  const { isAuthenticated } = useMoralis()
  return <>
    {(isAuthenticated && 
      <BusyProvider>
        <DrawingsProvider>
          <SelectionProvider>
            <Dashboard />
          </SelectionProvider>
        </DrawingsProvider>
      </BusyProvider>) 
      || <Lander />}
  </>
}