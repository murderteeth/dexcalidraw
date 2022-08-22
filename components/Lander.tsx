import SignIn from './SignIn'
import Wordmark from './Wordmark'

export default function Lander() {
  return <div className={`
    w-full h-full flex flex-col gap-12 items-center justify-center
    border border-black`}>

    <Wordmark className="p-4 text-8xl" />
    {/* <p className={`text-xl`}>Virtual whiteboard for sketching hand-drawn like diagrams.. but decentralized</p> */}

    <SignIn className="text-2xl" />

  </div>
}