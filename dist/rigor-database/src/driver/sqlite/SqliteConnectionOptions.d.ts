import { BaseConnectionOptions } from "../../connection/BaseConnectionOptions";
export interface SqliteConnectionOptions extends BaseConnectionOptions {
    readonly type: "sqlite";
    readonly database: string;
}
