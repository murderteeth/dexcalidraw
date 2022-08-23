import { useEffect } from 'react'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'
import { truncateAddress } from '../utilities'
import { A } from './controls'
import SignOut from './SignOut'
import Wordmark from './Wordmark'

export default function Dashboard() {
  const { account, chainId, user } = useMoralis()

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

  return <div className="w-full h-full flex flex-col">
    <div className="px-8 py-4 flex items-center justify-between">
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
  </div>
}