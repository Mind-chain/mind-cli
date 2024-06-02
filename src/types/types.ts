export interface Block {
    hash: string | null;
    number: number | string;
    timestamp: any;
    transactions: readonly any[];
    readableTimestamp?: string | any; // Optional property to store the readable timestamp
    [key: string]: any; // Allows adding additional properties to Block
}
export interface Address {
    address: string;
    privateKey: string;
}
