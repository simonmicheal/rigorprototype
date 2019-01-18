import { Logger } from "./Logger";
import { LoggerOptions } from "./LoggerOptions";
export declare class LoggerFactory {
    create(logger?: "advanced-console" | "simple-console" | "file" | "debug" | Logger, options?: LoggerOptions): Logger;
}
