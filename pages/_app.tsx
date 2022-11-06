import '../styles/globals.css'

import { ConnectKitProvider } from 'connectkit'
import type { AppProps } from 'next/app'
import { chain, configureChains, createClient, defaultChains, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { HeaderNav } from '../components/HeaderNav'
import Meta from '../components/Meta'
import { colors } from '../styles/colors'

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID
const { provider } = configureChains(
  [...defaultChains, chain.goerli],
  [alchemyProvider({ apiKey: alchemyId }), publicProvider()]
)

const client = createClient({
  autoConnect: true,
  provider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider
        options={{
          walletConnectName: 'WalletConnect',
          embedGoogleFonts: true,
        }}
        theme="soft"
        customTheme={{
          '--ck-font-family': 'Fredoka',
          '--ck-modal-heading-font-weight': 400,
          '--ck-connectbutton-color': colors.green400,
          '--ck-connectbutton-hover-background': colors.yellow100,
          '--ck-connectbutton-background': colors.yellow100,
          '--ck-connectbutton-active-background': colors.yellow100,
          '--ck-connectbutton-box-shadow': `inset 0 0 0 2px ${colors.yellow400},0 2px 0 0 ${colors.yellow400},0px 2px 4px rgba(0,0,0,0.02)`,
          '--ck-connectbutton-active-box-shadow': `inset 0 0 0 2px ${colors.yellow400},0 2px 0 0 ${colors.yellow400},0px 2px 4px rgba(0,0,0,0.02)`,
        }}
      >
        <Meta />
        <HeaderNav />
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
