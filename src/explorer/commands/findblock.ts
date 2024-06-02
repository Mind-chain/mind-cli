import { provider } from "../../config/provider";
import { Block } from "../../types/types";

export async function findBlock(blockNumber: number): Promise<Block | null> {
    console.log(`Fetching block number: ${blockNumber}`); // Log the block number being fetched
    const providerBlock = await provider.getBlock(blockNumber);

    if (providerBlock) {
        const block: Block = {
            hash: providerBlock.hash ?? '',
            number: providerBlock.number,
            timestamp: providerBlock.timestamp,
            transactions: providerBlock.transactions,
            readableTimestamp: new Date(providerBlock.timestamp * 1000).toString(),
        };
        return block;
    } else {
        throw new Error(`Block with number ${blockNumber} not found.`);
    }
}
