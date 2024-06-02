import { program } from "commander";
import { versioning } from "./versioning";
import { explorer } from "./explorer";
import {Node} from "./node";
import {consensus} from "./consensus";
import {convert} from "./convert";

function displayTitle() {
  console.log(`
   __  __ ____   ____       ____ _     ___ 
  |  \\/  / ___| / ___|     / ___| |   |_ _|
  | |\\/| \\___ \\| |   _____| |   | |    | | 
  | |  | |___) | |__|_____| |___| |___ | | 
  |_|  |_|____/ \\____|     \\____|_____|___|
  `);
}

export function runCLI() {
  displayTitle();

  versioning(program);
  explorer(program);
  Node(program);
  consensus(program);
  convert(program);

  program.parse(process.argv);
}
