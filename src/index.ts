import Web3 from 'web3';
import fs from 'fs';
import path from 'path'; 

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

const contract = new web3.eth.Contract((abi as any),contractAddress)

contract.methods.getBalanceInEth(address).call(
    (err:Error, result: string)=>{
        console.log(result)
    }    
)

// contract.methods
//     .sendCoin(receiverAddress, 10)
//     .call((err: Error, result: string)=>{
//         console.log(result)
//     })
