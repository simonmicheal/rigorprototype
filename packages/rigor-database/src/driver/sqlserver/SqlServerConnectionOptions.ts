import {BaseConnectionOptions} from "../../connection/BaseConnectionOptions";
import {SqlServerConnectionCredentialsOptions} from "./SqlServerConnectionCredentialsOptions";

/**
 * Microsoft Sql Server specific connection options.
 */
export interface SqlServerConnectionOptions extends BaseConnectionOptions {
    readonly connectionTimeout?: number;
    readonly requestTimeout?: number;
    readonly url?: string;
    readonly host?: string;
    readonly port?: number;
    readonly username?: string;
    readonly password?: string;
    readonly database?: string;
    readonly domain?: string;
}