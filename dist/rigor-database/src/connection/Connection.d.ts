import { Logger } from "../logger/Logger";
import { ConnectionOptions } from "./ConnectionOptions";
import { Driver } from "../driver/Driver";
export declare class Connection {
    readonly name: string;
    readonly options: ConnectionOptions;
    readonly isConnected = false;
    readonly driver: Driver;
    readonly logger: Logger;
    constructor(options: ConnectionOptions);
    connect(): Promise<this>;
    close(): Promise<void>;
}
