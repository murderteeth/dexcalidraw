import DialogRouter from '../components/DialogRouter'
import Excalidraw from '../components/Excalidraw'
import Theme from '../components/Theme'

export default function Index() {
  return <Theme className={'relative w-full h-full flex items-center justify-center'}>
    <Excalidraw />
    <DialogRouter />
  </Theme>
}