import React,{ useState } from 'react'
import { SolanaAddressGenerator, EthereunAddressGenerator } from '../Addressgenerator'
import {generateMnemonic} from 'bip39'
import bs58 from "bs58";

const HomeScreen = () => {
    const [mnemonic, setMnemonic] = useState('')
    const [keyPairs, setKeyPairs] = useState([])

async function SolanaHandler() {
        
    const mnemomic = await generateMnemonic()
    console.log(mnemomic)
    setMnemonic(mnemomic)

    const keypair = await SolanaAddressGenerator(mnemomic)
    setKeyPairs([...keyPairs, {Blockchain: "Solana", publicKey: keypair.publicKey.toBase58(), privateKey: bs58.encode(keypair.secretKey)}])

    }


async function EthereumHandler() {
        
    const mnemomic = await generateMnemonic()
    setMnemonic(mnemomic)

    const wallet = await EthereunAddressGenerator(mnemomic)
    setKeyPairs([...keyPairs, {Blockchain: "Ethereum", publicKey: wallet.address, privateKey: wallet.privateKey}])

}


  return (
    <>
    <main className='home min-h-screen p-5 '>
        <section>
            <div className='mx-28 pt-10'>
                <h1 className='text-white text-6xl font-bold'>Ledger</h1>
                <p className='text-slate-400 text-sm mt-5'>The best way to manage your crypto currencies</p>
            

                <div className='seed mt-10'>
                    <input value={mnemonic} placeholder='Type your 12 seed words (or leave blank)' type="text" onChange={(e) => setMnemonic(e.target.value)}
                    className='w-full bg-transparent border placeholder:text-slate-600 text-slate-200 text-sm 
                    border-slate-400 rounded-md px-3 py-5'/>


                    <div className=' grid grid-cols-2 mt-10 gap-48  '>
                        <button className='bg-blue-800 text-white px-3 py-3 rounded-md  hover:opacity-80' onClick={SolanaHandler}> Generate Solana address </button>
                        <button className='bg-blue-800 text-white px-3 py-3 rounded-md  hover:opacity-80' onClick={EthereumHandler}> Generate Ethereum Address</button>
                    </div>
                    
                </div>

            </div>
        </section>

        <section>
            <div className='mx-28 mt-10 transition-all duration-200'>
                <h1 className='text-white text-2xl font-bold'>Generated Addresses</h1>
                <div className=' grid grid-cols-1 gap-5 mt-5'>
                    {keyPairs.map((keyPair) => (
                        <div className=' bg-slate-800 p-5 rounded-lg mt-5'>
                            <h1 className='text-white text-xl font-bold '>{keyPair.Blockchain+" wallet"}</h1>
                            <p className='text-slate-400 text-base mt-5'>Public Key : {keyPair.publicKey}</p>
                            <p className='text-slate-400 text-base mt-5'>Private Key : {"•".repeat(70)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        
    </main>
    </>
  )
}

export default HomeScreen