import React,{ useState } from 'react'
import { SolanaAddressGenerator, EthereunAddressGenerator } from '../Addressgenerator'
import {generateMnemonic} from 'bip39'


const HomeScreen = () => {
    const [mnemonic, setMnemonic] = useState('')
    const [keyPairs, setKeyPairs] = useState([{ publicKey: "", privateKey: "" }])

async function SolanaHandler() {
        
    const mnemomic = await generateMnemonic()
    console.log(mnemomic)
    setMnemonic(mnemomic)

    const keypair = await SolanaAddressGenerator(mnemomic)
    console.log(keypair.publicKey.toBase58())

    }


async function EthereumHandler() {
        
    const mnemomic = await generateMnemonic()
    console.log(mnemomic)
    setMnemonic(mnemomic)

    const wallet = await EthereunAddressGenerator(mnemomic)
    console.log(wallet.address)

}


  return (
    <>
    <main>
        <section className='home min-h-screen'>
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
    </main>
    </>
  )
}

export default HomeScreen