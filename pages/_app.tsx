import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()])
const client = createClient({ provider, webSocketProvider, autoConnect: true })

function MyApp({ Component, pageProps }: AppProps) {
  return <WagmiConfig client={client}>
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Head>
        <title>Dexcalidraw</title>
        <meta name="description" content="Virtual whiteboard for sketching hand-drawn like diagrams.. but decentralized" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✏️</text></svg>" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  </WagmiConfig>
}

export default MyApp
