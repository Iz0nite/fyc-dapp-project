import { useState } from 'react'
import './App.css'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { Login } from './components/login'
import { ethers } from 'ethers'
import { Button } from 'antd'
import FreeVoting from "./artifacts/contracts/FreeVoting.sol/FreeVoting.json";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<ethers.JsonRpcSigner>()

  async function fetchTestValue() {
    try {
      const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESSE, FreeVoting.abi, account)
      const data = await contract.test()
      
      console.log(data)
    } catch (error) {
      console.error("Error during data fetching", error);
    }
  }

  async function setTestValue() {
    try {
      const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESSE, FreeVoting.abi, account)
      const transaction = await contract.setTestValue("Ceci est un test")
      transaction.wait()
    } catch (error) {
      console.error("Error during transaction", error);
    }
  }


  return (
    <>
      <div>
        <h1>Free Voting</h1>
        {
          !isConnected ? 
            <Login setIsConnected={setIsConnected} setAccount={setAccount} /> 
          :
            <div>
              <Button onClick={fetchTestValue}>Fetch</Button>
              <Button onClick={setTestValue}>Set</Button>
            </div>
        }
      </div>
    </>
  )
}

export default App
