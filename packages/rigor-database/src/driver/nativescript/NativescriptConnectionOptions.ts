import {BaseConnectionOptions} from "../../connection/BaseConnectionOptions";

export interface NativescriptConnectionOptions extends BaseConnectionOptions {
    readonly type: "nativescript";
    readonly database: string;

}