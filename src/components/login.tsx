import { ethers } from "ethers"
import { Button } from "antd"

interface LoginProps {
  setIsConnected: (value: boolean) => void,
  setAccount: (value: ethers.JsonRpcSigner) => void
}

export function Login ({ setIsConnected, setAccount }: LoginProps) {

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
  
        console.log("MetaMask Connected" + address);
  
        setIsConnected(true)
        setAccount(signer)
      } catch (error) {
        console.log("Can't connect", error);
        
      }
    }
    
  }

  return (
    <Button type="primary" className="border-white" onClick={connectToMetamask}>Login</Button>
  )
}