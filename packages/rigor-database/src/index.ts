import { Connection, } from './connection/Connection'
import { ConnectionOptions } from "./connection/ConnectionOptions";
import { ConnectionManager } from './connection/ConnectionManager';

export { Connection } from "./connection/Connection";
export { ConnectionOptions } from "./connection/ConnectionOptions";
export { ConnectionManager } from "./connection/ConnectionManager";

export async function createConnection(options: ConnectionOptions): Promise<Connection>;

export async function createConnection(optionsOrName?: any): Promise<Connection> {
    const connectionName = typeof optionsOrName === "string" ? optionsOrName : "default";
    const options = optionsOrName;
    return new ConnectionManager().create(options).connect();
}

