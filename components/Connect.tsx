import { useMoralis } from 'react-moralis'
import useLocalStorage from 'use-local-storage'

export default function Connect() {
  const { enableWeb3 } = useMoralis()
  const [_, setWeb3EnabledPreviously] = useLocalStorage<boolean>('web3EnabledPreviously', false)

  async function onConnect() {
    setWeb3EnabledPreviously(true)
    await enableWeb3()
  }

  return <button
    onClick={onConnect}>
    <div className={'px-4 py-2 flex items-center gap-3'}>
      <img width='24px' height='24px' src='/metamask.svg' alt='metamask' />
      {'Connect Metamask'}
    </div>
  </button>
}