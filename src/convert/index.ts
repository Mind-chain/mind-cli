import { program } from "commander";
import { mind2wmind } from "./commands/mind2wmind";
export function convert(conv: typeof program) {
   const converter = conv 
   .command("converter")
   .description("Convertion related subcommands");


   converter 
   .command("mind2wmind privatkey amount")
   .description("Convert mind to wmind")
   .action(mind2wmind)
}
