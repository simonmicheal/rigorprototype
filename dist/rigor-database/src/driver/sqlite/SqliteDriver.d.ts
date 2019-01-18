import { Connection } from "../../connection/Connection";
import { BaseConnectionOptions } from "../../connection/BaseConnectionOptions";
export declare class SqliteDriver {
    connection: Connection;
    databaseConnection: any;
    options: BaseConnectionOptions;
    database?: string;
    sqlite: any;
    constructor(connection: Connection);
    connect(): Promise<void>;
    protected createDatabaseConnection(): Promise<void>;
    disconnect(): Promise<void>;
}
