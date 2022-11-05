import '../styles/globals.css'

import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import type { AppProps } from 'next/app'
import { createClient, WagmiConfig } from 'wagmi'

import Meta from '../components/Meta'

const alchemyId = process.env.ALCHEMY_ID

const client = createClient(
  getDefaultClient({
    appName: 'gm',
    alchemyId,
  })
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider
        options={{
          walletConnectName: 'WalletConnect',
        }}
      >
        <Meta />
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
