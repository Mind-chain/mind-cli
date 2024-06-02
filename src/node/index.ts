import { program } from "commander";
import { generateGenesisJson } from "./commands/get-genesis";
import installMind from "./commands/install-node";
import {startMindServer} from "./commands/start-node";
import {initSecrets} from "./commands/init-node"
 



export function Node(mindnode: typeof program){
    const node = mindnode
    .command("node")
    .description("Node related subcommands");

    node
    .command("get-genesis")
    .description("generate genesis block")
    .action(generateGenesisJson);

    node
    .command("install-node")
    .description("install Mind Blockchain core cli application")
    .action(installMind);
    node
    .command("init-node")
    .description("Initialize p2p key and validator key ")
    .action(initSecrets);
    node
    .command("start-node")
    .description("install Mind Blockchain core cli node server")
    .action(startMindServer);

}