import { useEffect } from 'react'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'
import useScrollOverpass from '../hooks/useScrollOverpass'
import { truncateAddress } from '../utilities'
import { A } from './controls'
import SignOut from './SignOut'
import Wordmark from './Wordmark'

export default function Dashboard() {
  const { account, chainId, user } = useMoralis()
  const { overpassClassName } = useScrollOverpass()

  const { fetch } = useMoralisCloudFunction(
    "test",
    { test: "The Moralis" },
    { autoFetch: false }
  );

  useEffect(() => {
    fetch({
      onSuccess: (data) => console.log(data), // ratings should be 4.5
    });
  }, [fetch])

  useEffect(() => {
    console.log('account', account, chainId, user)
  }, [account, user])

  const tiles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  return <div className="relative w-full flex flex-col">
    <div className={`
      sticky top-0 z-10 bg-purple-900
      px-8 py-4 flex items-center justify-between 
      ${overpassClassName}`}>

      {/* HACK: inject these overpass utlity classes */}
      <div className="bg-purple-900/60 backdrop-blur-md shadow-md hidden">x</div>

      <Wordmark className="text-3xl" />
      <div className="flex items-center justify-end gap-8">
        <div>
          <A href={`https://etherscan.io/address/${account}`} target="_blank" rel="noreferrer">
            {truncateAddress(account)}
          </A>
        </div>
        <SignOut />
      </div>
    </div>
    <div className={`
      p-8 grid grid-flow-row grid-cols-1 gap-0
      sm:grid-cols-3 sm:gap-8
      lg:grid-cols-4 
      2xl:grid-cols-6`}>
      {tiles.map(tiles => <div className="aspect-video bg-purple-800 shadow-md rounded-lg">

      </div>)}
    </div>
  </div>
}