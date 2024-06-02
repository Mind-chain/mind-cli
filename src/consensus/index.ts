import { program } from "commander";
import { val_dash } from "./commands/val-dash";


export function consensus(con : typeof program) {
    const consensus = con 
    .command("consesnsus")
    .description("Consensus related subcommands");

    consensus
   .command("get-stats")
   .description("Get consensus stats")
   .action(val_dash)

    

}
