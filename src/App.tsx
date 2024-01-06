import { useState } from 'react'
import './App.css'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { Login } from './components/login'
import { ethers } from 'ethers'
import { FreeVotingApp } from "./components/FreeVotingApp.tsx";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<ethers.JsonRpcSigner>()

  return (
    <div className="flex flex-col justify-around align-center gap-8">
      <h1>Free Voting</h1>
      {
        !isConnected ?
          <Login setIsConnected={setIsConnected} setAccount={setAccount} />
          :
          <FreeVotingApp account={account} />
      }
    </div>
  )
}

export default App
