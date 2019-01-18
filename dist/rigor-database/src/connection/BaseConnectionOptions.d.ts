import { LoggerOptions } from "../logger/LoggerOptions";
import { DatabaseType } from "../driver/types/DatabaseType";
import { Logger } from "../logger/Logger";
export interface BaseConnectionOptions {
    readonly type: DatabaseType;
    readonly name?: string;
    readonly database: string;
    readonly logging?: LoggerOptions;
    readonly logger?: "advanced-console" | "simple-console" | "file" | "debug" | Logger;
}
