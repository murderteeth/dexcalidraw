import SignIn from './SignIn'
import Wordmark from './Wordmark'

export default function Lander() {
  return <div className={`
    w-full h-full flex flex-col gap-12 items-center justify-center
    border border-black`}>
    <Wordmark glow={true} className="p-4 text-8xl" />
    <SignIn className="text-2xl" />
  </div>
}