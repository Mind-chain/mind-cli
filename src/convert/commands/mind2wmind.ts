import { convertMINDToWMIND } from "msc-js";
import { account } from "../../types/types";

export function mind2wmind(account: account): Promise<void> {
    return convertMINDToWMIND(account.privateKey, account.amount);
}