import DialogRouter from '../components/DialogRouter'
import Dexcalidraw from '../components/Dexcalidraw'
import Theme from '../components/Theme'

export default function Index() {
  return <Theme className={'relative w-full h-full flex items-center justify-center'}>
    <Dexcalidraw />
    <DialogRouter />
  </Theme>
}