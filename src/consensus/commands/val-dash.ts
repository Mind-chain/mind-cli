import { getValidators, getstake } from "msc-js";

export async function val_dash() {
    try {
        const staked_coins = await getstake();
        const validator_set = await getValidators();
        
        console.log({ staked_coins, validator_set });
    } catch (error) {
        console.error("Error fetching validator data:", error);
    }
}
