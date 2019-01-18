import {BaseConnectionOptions} from "../connection/BaseConnectionOptions";

export interface Driver {
    options: BaseConnectionOptions;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    query(query: string, parameters?: any[]): Promise<any>;
}