import { convertWmindTomind } from "msc-js";
import {account} from "../../types/types"

export async function wmind2mind(account:account) {
    return convertWmindTomind(account.privateKey, account.amount);   
}