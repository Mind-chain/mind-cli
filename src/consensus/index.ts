import { program } from "commander";
import { val_dash } from "./commands/val-dash";
import {stakeCoins} from "./commands/stake";
import {unstakeCoins} from "./commands/unstake";
 

export function consensus(con : typeof program) {
    const consensus = con 
    .command("consensus")
    .description("Consensus related subcommands");

    consensus
   .command("get-stats")
   .description("Get consensus stats")
   .action(val_dash)
   consensus
   .command('stake <privatekey>')
   .description('Stake MIND coins to become a part of MSC POS consensus ')
   .action(async (privateKey: string) => {
       try {
           const transactionHash = await stakeCoins(privateKey);
           console.log('Staked correctly ! Now you are a validator \n transaction hash:', transactionHash);
       } catch (error) {
           console.error('Error staking coins:', error);
       }
   });


   consensus
   .command('unstake  <privatekey>')
   .description('unstake coins')
   .action(async (privateKey: string) => {
    try {
        const transactionHash = await unstakeCoins(privateKey);
        console.log('You are free now ! thanks to keep mind-chain secured . \n transaction hash:', transactionHash);
    } catch (error) {
        console.error('Error unstaking coins:', error);
    }
});
    

}
