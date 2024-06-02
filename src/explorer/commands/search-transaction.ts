import { provider } from "../../config/provider";
import { Block } from "../../types/block";

type BlockNumberOrNull = number | null;

export async function searchTxn(hash: string): Promise<Block | null> {
    try {
        const transaction = await provider.getTransaction(hash);
        if (!transaction) {
            console.error("Transaction not found for hash:", hash);
            return null;
        }

        const blockNumber: BlockNumberOrNull = await transaction.blockNumber;
        if (blockNumber === null) {
            console.error("Block number not available for transaction:", hash);
            return null;
        }

        const block = await provider.getBlock(blockNumber);

        if (!block) {
            console.error("Block not found for block number:", blockNumber);
            return null;
        }

        const readableTimestamp = new Date(block.timestamp * 1000).toLocaleString();
        
        const blockDetails: Block = {
            hash: block.hash ?? null,
            number: block.number ?? null,
            timestamp: block.timestamp ?? null,
            transactions: block.transactions ?? [],
            readableTimestamp: readableTimestamp,
            // Additional properties if needed can be added here
        };

       // console.log("Block details:", blockDetails);
        return blockDetails;
    } catch (error) {
        console.error("Error occurred while searching for transaction:", error);
        return null;
    }
}