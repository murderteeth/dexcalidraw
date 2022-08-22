import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)

  async function onGetBalance() {
    // const getBalance = httpsCallable(getFunctions(firebase), 'getBalance')
    // const result = await getBalance({address: '0x5cdAecc1A78A3b08d186E3f02E9f05c1bb92A59B'}) as any
    // setBalance(result.data.balance as number)
  }

  return <div className={`
    w-full h-full flex flex-col gap-8 items-center justify-center
    border border-black`}>
    <Head>
      <title>Dexcalidraw</title>
      <meta name="description" content="Virtual whiteboard for sketching hand-drawn like diagrams.. but decentralized" />
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✏️</text></svg>" />
    </Head>

    <h1 className={`
      font-mono font-bold text-8xl
      bg-clip-text text-transparent 
      bg-gradient-to-r from-emerald-500 via-purple-500 to-amber-500
      `}>Dexcalidraw</h1>
    <p className={`text-xl`}>Virtual whiteboard for sketching hand-drawn like diagrams.. but decentralized</p>

    <button onClick={onGetBalance} className={`
      px-8 py-3 bg-purple-800 text-2xl text-slate-100
      hover:bg-amber-400 hover:text-slate-900
      active:transform active:scale-95
      transition duration-200
      rounded-lg`}>Get balance</button>

    <div className={'text-xl'}>{`${balance} ETH`}</div>
  </div>
}

export default Home
