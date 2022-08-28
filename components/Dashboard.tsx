import { useEffect, useState } from 'react'
import { useMoralis, useMoralisCloudFunction, useMoralisFile, useMoralisQuery, useNewMoralisObject } from 'react-moralis'
import useScrollOverpass from '../hooks/useScrollOverpass'
import { truncateAddress } from '../utilities'
import { A, Button } from './controls'
import SignOut from './SignOut'
import Wordmark from './Wordmark'
import NFT from './controls/NFT'
// import Moralis from 'moralis/types'

export default function Dashboard() {
  const { account, chainId, user } = useMoralis()
  const { overpassClassName } = useScrollOverpass()
  const [ drawings, setDrawings ] = useState<string[]>([])
  const {saveFile} = useMoralisFile()
  const { save: saveDrawing } = useNewMoralisObject('Drawing')
  const { fetch: fetchDrawings } = useMoralisQuery(
    'Drawing',
    (query) => query.equalTo('owner', user),
    [user], { autoFetch: false }
  )

  useEffect(() => {
    (async () => {
      const drawings = await fetchDrawings()
      setDrawings((await fetchDrawings())?.map(d => d.id) || [])
    })()
  }, [fetchDrawings, setDrawings])

  const { fetch: fetchTest } = useMoralisCloudFunction(
    "test",
    { test: "👋 Hello Console" },
    { autoFetch: false }
  );

  useEffect(() => {
    fetchTest({
      onSuccess: (data) => console.log(data)
    });
  }, [fetchTest])

  // useEffect(() => {
  //   console.log('account', account, chainId, user)
  // }, [account, user])

  async function onSaveDrawing() {
    const data = {
      base64: Buffer.from(JSON.stringify({ hello: 'world' })).toString('base64')
    }
    const name = `Drawing #${drawings.length}`
    const file = await saveFile(name, data, { saveIPFS: true })
    console.log('file', file)
    const drawing = await saveDrawing({
      owner: user,
      name, file
    })
    setDrawings(current => [drawing.id, ...current])
  }

  return <div className="relative w-full flex flex-col">
    <div className={`
      sticky top-0 z-10 bg-purple-900
      px-8 py-4 flex items-center justify-between 
      ${overpassClassName}`}>

      {/* HACK: inject these overpass utlity classes */}
      <div className="bg-purple-900/60 backdrop-blur-md shadow-md hidden">x</div>

      <Wordmark className="text-3xl" />
      <Button onClick={onSaveDrawing}>Save drawing</Button>
      <div className="flex items-center justify-end gap-8">
        <div>
          <A href={`https://etherscan.io/address/${account}`} target="_blank" rel="noreferrer">
            {truncateAddress(account)}
          </A>
        </div>
        <div className="flex flex-col items-center">
          <NFT className="text-5xl" />
        </div>
        <SignOut />
      </div>
    </div>
    <div className={`
      p-8 grid grid-flow-row grid-cols-1 gap-0
      sm:grid-cols-2 sm:gap-8
      lg:grid-cols-3
      2xl:grid-cols-6`}>
      {drawings.map(drawing => <div key={drawing} className={`
        aspect-video bg-purple-800 shadow rounded-lg
        hover:bg-amber-400 hover:text-slate-900
        active:transform active:scale-95
        transition duration-200 cursor-pointer`}>
      </div>)}
    </div>
  </div>
}