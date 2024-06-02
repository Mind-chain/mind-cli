import { ethers } from "ethers";
import { provider } from "../../config/provider";

export async function searchAddress(addr: string) {
    try {
        const balance: ethers.BigNumberish = await provider.getBalance(addr);
        const code = await provider.getCode(addr);
        const transactionCount = await provider.getTransactionCount(addr);
       // const ensName = await provider.lookupAddress(addr);

        const result = {
            addr,
            balance: ethers.formatEther(balance) + " MIND",
            transactionCount,
            codeExists: code !== '0x',
           // ensName: ensName || 'Not available'
        };

        return result;
    } catch (error) {
        throw new Error(
            `Error occurred while checking address details: ${(error as Error).message}`
        );
    }
}
