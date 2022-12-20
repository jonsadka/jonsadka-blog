import './rainbowkit-styles.css'

import {getDefaultWallets} from '@rainbow-me/rainbowkit'
import {configureChains, createClient} from 'wagmi'
import {publicProvider} from 'wagmi/providers/public'
import {mainnet, goerli} from 'wagmi/chains'

export const {chains, provider} = configureChains(
  [mainnet, goerli],
  [publicProvider()]
)

const {connectors} = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})
