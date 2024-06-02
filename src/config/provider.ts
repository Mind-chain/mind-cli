import { ethers } from "ethers";
import { mainnet_rpc } from "msc-js";


export const provider = new ethers.JsonRpcProvider(mainnet_rpc.http);