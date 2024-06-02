import { provider } from "../../config/provider";
import { Block } from "./../../types/block";

export async function getCurrentBlockDetails(): Promise<Block | null > {
    try {
        const blockNumber = await provider.getBlockNumber();
        const block: Block | null = await provider.getBlock(blockNumber);

        if (block) {
            const { hash, number, timestamp, transactions }: Block = block;
            const humanReadableTimestamp = new Date(timestamp * 1000).toLocaleString(); // Convert Unix timestamp to human-readable format

            // Return block details with readable timestamp
            return {
                hash,
                number,
                timestamp: humanReadableTimestamp,
                transactions
            };
        } else {
            console.error("Current block not found.");
            return null;
        }
    } catch (error:any) {
        console.error("Error occurred while fetching current block details:", error.message);
        return null;
    }
}
