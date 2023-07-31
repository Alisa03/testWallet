import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'

const chains = [mainnet]
export const projectId = 'd001e8304cda9175c5afae5a1f8fc3b9'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
})
export const ethereumClient = new EthereumClient(wagmiConfig, chains)
