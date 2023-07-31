import { Web3Modal } from '@web3modal/react'
import { useState } from 'react'
import { WagmiConfig } from 'wagmi'
import Navbar from './components/Navbar'
import Transaction from './components/Transaction'
import { ethereumClient, projectId, wagmiConfig } from './config'

import './styles/App.scss'

export default function App() {

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <div className='container'>
          <Navbar />
          <Transaction />
        </div>
        <Web3Modal themeVariables={{ '--w3m-accent-color': '#0565B2', '--w3m-background-color': '#0565B2' }} projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
    </>
  )
}