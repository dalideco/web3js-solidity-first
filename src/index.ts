import Web3 from 'web3';
import fs from 'fs';
import path from 'path'; 
import {Transaction as Tx} from 'ethereumjs-tx'
import 'dotenv/config'

const PRIVATE_KEY: string = process.env.PRIVATE_KEY || '';
const privateKeyBuffer = Buffer.from(PRIVATE_KEY,'hex')

const web3 = new Web3('HTTP://127.0.0.1:7545')

const address = '0xfc463242D9627Be0C6819495bF4F67Fa708Cc450';
const receiverAddress = '0x01bE9F606eE1C48FdA38c85e94F2711286AA2aF5';

const contractAddress = '0xdCACA0d5f9A4768e9E9af373781b83B5FbB64BD8'
const abi = JSON.parse(
    fs
    .readFileSync(
        path.resolve(__dirname,'./abi.json'),
        'utf-8'
    )
)

const contract = new web3.eth.Contract(abi,contractAddress)
const data = contract.methods.sendCoin(receiverAddress, 200).encodeABI()


// ----------------- unComment for sending transaction

// web3.eth.getTransactionCount(address,(err:Error,txCount:number)=>{
    
//     if(err) return console.log('transaction count not found', err)

//     //create transaction object 
//     const txObject = {
//         nonce: web3.utils.toHex(txCount),
//         gasLimit:  web3.utils.toHex(800000),
//         gasPrice : web3.utils.toHex(web3.utils.toWei('10','gwei')),
//         to: contractAddress,
//         data: data
//     }


//     // sign the transaction
//     const tx = new Tx(txObject)
//     tx.sign(privateKeyBuffer)

//     const serializedTx = tx.serialize();
//     const raw = "0x"+serializedTx.toString("hex");

//     //broadcast the transaction
//     web3.eth.sendSignedTransaction(raw,(err, txHash)=>{
//         if(err) console.log('transaction not sent', err)
//         console.log(txHash)
//     })
// })

// ----------------- unComment for getting sender balance
contract.methods.getBalance(address).call(
    (err:Error, result: string)=>{
        console.log('sender',result)
    }    
)

// ----------------- unComment for getting receiver balance
contract.methods.getBalance(receiverAddress).call(
    (err:Error, result: string)=>{
        console.log('receiver',result)
    }    
)
