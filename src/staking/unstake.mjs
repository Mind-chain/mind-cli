import { providers, Wallet } from 'ethers';
import Web3 from 'web3';
import { STAKING_ABI } from './../abi/stakingabi.mjs'; // Provide the correct path to your ABI
import { urls, contracts } from './../constants.mjs'; // Provide the correct path to your constants

const web3 = new Web3(urls.Http_rpc);
const provider = new providers.JsonRpcProvider(urls.Http_rpc);

async function unstake(privateKey) {
  try {
    const wallet = new Wallet(privateKey, provider);
    const contract = new web3.eth.Contract(STAKING_ABI, contracts.staking);

    const data = contract.methods.unstake().encodeABI(); 

  
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
    };

    const signedTx = await wallet.signTransaction(tx);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('Unstake successful!');
    console.log('Transaction Hash:', receipt.transactionHash);
    console.log('Explorer URL:', `https://mainnet.mindscan.info/tx/${receipt.transactionHash}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

export default unstake;
