import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi'
import axios from 'axios'
import { Button } from './controls'

export default function SignIn({ className }: { className?: string }) {
  const { connectAsync } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { push } = useRouter()

  const onClick = async () => {
    if (isConnected) await disconnectAsync()

    const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() })
    const userData = { 
      address: account, 
      chain: chain.id, 
      network: 'evm' 
    }

    const { data } = await axios.post(
      '/api/auth/request-message', userData,
      { headers: { 'content-type': 'application/json' } }
    )

    const signature = await signMessageAsync({ message: data.message })

    const response = await signIn('credentials', { 
      message: data.message, 
      signature, 
      redirect: false, 
      callbackUrl: '/' 
    })

    if(response !== undefined && response.url) {
      push(response.url)
    }
  }

  return <Button onClick={onClick} className={className}>
    <Image width="32" height="32" src="/metamask.svg" alt="metamask" />
    Sign in with Metamask
  </Button>
}