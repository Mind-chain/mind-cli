import { ethers } from 'ethers';
import { consensus, CONSENSUS_ABI } from './../../config/contracts';
import { provider } from './../../config/provider';

async function unstakeCoins(privateKey: string): Promise<string> {
    const wallet = new ethers.Wallet(privateKey, provider);

    const contract = new ethers.Contract(consensus, CONSENSUS_ABI, wallet);

    // Unstaking the entire amount
    const transaction = await contract.unstake();

    await transaction.wait();

    return transaction.hash;
}
export { unstakeCoins };
