import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
import { Wallet, HDNodeWallet } from "ethers";

let AccountNo = 0;

async function SolanaAddressGenerator (mnemonic){
    const seed = await mnemonicToSeed(mnemonic)
    const path = `m/44'/501'/${AccountNo}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    AccountNo = AccountNo + 1

    return keypair
}



async function EthereunAddressGenerator (mnemonic){
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    AccountNo = AccountNo + 1
    // setAddresses([...addresses, wallet.address]);
    return wallet
}


export {SolanaAddressGenerator, EthereunAddressGenerator}


