import { program } from "commander";
import { mind2wmind } from "./commands/mind2wmind";
import {wmind2mind} from "./commands/wmind2mind";
import { account } from "../types/types";
export function convert(conv: typeof program) {
   const converter = conv 
   .command("converter")
   .description("Convertion related subcommands");


   converter
   .command("mind2wmind <privateKey> <amount>")
   .description("Convert mind to wmind")
   .action((privateKey, amount) => {
       const acc: account = {
           privateKey: privateKey,
           amount: parseFloat(amount)
       };
       mind2wmind(acc);
   });
   converter
   .command("wmind2mind <privateKey> <amount>")
   .description("Convert wmind to mind")
   .action((privateKey, amount) => {
       const acc: account = {
           privateKey: privateKey,
           amount: parseFloat(amount)
       };
       wmind2mind(acc);
   });
}