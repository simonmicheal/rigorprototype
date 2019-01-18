import {Driver} from "../Driver";
import {Connection} from "../../connection/Connection";
import {SqlServerConnectionOptions} from "./SqlServerConnectionOptions";

export class SqlServerDriver implements Driver {

    connection: Connection;
    mssql: any;
    master: any;
    options: SqlServerConnectionOptions;
    database?: string;

    constructor(connection: Connection) {
        this.connection = connection;
        this.options = connection.options as SqlServerConnectionOptions;

        this.loadDependencies();
    }

    async connect(): Promise<void> {
            //this.master = await this.createPool(this.options, this.options);
            this.database = this.options.database;
    }

    async disconnect(): Promise<void> {
        if (!this.master)
            return Promise.reject(new Error);

        this.master.close();
        this.master = undefined;
    }

    protected loadDependencies(): void {
        try {
            this.mssql = require("mssql");

        } catch (e) { // todo: better error for browser env
            throw Error;
        }
    }

    async query(query: string, parameters?: any[]): Promise<any> {
        return new Promise<any[]>((resolve, reject) => {
            // this.databaseConnection.all(query, (err:any, rows: any[]) => {
            //     if (err) {
            //         reject(err);
            //     } else {
            //         resolve(rows);
            //     }
            // });
        });
    }
}