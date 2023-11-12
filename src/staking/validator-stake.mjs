import { Wallet, providers } from 'ethers';
import { STAKING_ABI } from '../abi/stakingabi.mjs';
import { urls, contracts } from '../constants.mjs';
import Web3 from 'web3';

const web3 = new Web3(urls.Http_rpc);
const provider = new providers.JsonRpcProvider(urls.Http_rpc);

// Define the stake amount
const STAKE_AMOUNT = '1000000000000000000000'; 

async function stake(privateKey) {
  try {
    const wallet = new Wallet(privateKey, provider);
    const contract = new web3.eth.Contract(STAKING_ABI, contracts.staking);

    const data = contract.methods.stake().encodeABI();

    
    const gasLimit = await web3.eth.estimateGas({
      to: contracts.staking,
      data,
    });

    const nonce = await provider.getTransactionCount(wallet.address, 'latest');

    const tx = {
      from: wallet.address,
      to: contracts.staking,
      data,
      gas: gasLimit, 
      nonce: nonce,
      value: STAKE_AMOUNT, // Set the value to the stake amount
    };

    const signedTx = await wallet.signTransaction(tx);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('Transaction successful!');
    console.log('Transaction Hash:', receipt.transactionHash);
    console.log('Explorer URL:', `https://mainnet.mindscan.info/tx/${receipt.transactionHash}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

export default stake;