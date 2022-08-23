import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MoralisProvider, useMoralis } from 'react-moralis'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  function EnableWeb3({ children }: { children: any }) {
    const { enableWeb3 } = useMoralis()
    useEffect(() => {
      (async () => {
        await enableWeb3()
      })()
    }, [enableWeb3])
    return <>{children}</>
  }

  return <MoralisProvider 
    appId="Nm7FBNDFK6fNSR8OpYMSOIaQmSLQOKuf7UNoDXul" 
    serverUrl="https://wgvzl4ch6vqj.usemoralis.com:2053/server">
    <EnableWeb3>
      <Head>
        <title>Dexcalidraw</title>
        <meta name="description" content="Virtual whiteboard for sketching hand-drawn like diagrams.. but decentralized" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✏️</text></svg>" />
      </Head>
      <Component {...pageProps} />
    </EnableWeb3>
  </MoralisProvider>
}

export default MyApp
