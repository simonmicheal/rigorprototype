import {Driver} from "../Driver";
import {Connection} from "../../connection/Connection";
import {SqlServerConnectionOptions} from "./SqlServerConnectionOptions";
import { SqlServerConnectionCredentialsOptions } from "./SqlServerConnectionCredentialsOptions";

export class SqlServerDriver implements Driver {

    connection: Connection;
    sqlserver: any;
    master: any;
    options: SqlServerConnectionOptions;
    database?: string;

    constructor(connection: Connection) {
        this.connection = connection;
        this.options = connection.options as SqlServerConnectionOptions;

        this.loadDependencies();
    }

    async connect(): Promise<void> {
            this.master = await this.createPool(this.options, this.options);
            this.database = this.options.database;
    }

    protected createDatabaseConnection() {
        return new Promise<void>(async (ok, fail) => {
            const databaseConnection = new this.sqlserver.connect(this.options, (err: any) => {
                if (err) return fail(err);
                    ok(databaseConnection);
            });
        });
    }

    async disconnect(): Promise<void> {
        if (!this.master)
            return Promise.reject(new Error);

        this.master.close();
        this.master = undefined;
    }

    protected loadDependencies(): void {
        try {
            this.sqlserver = require("mssql");

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

    protected createPool(options: SqlServerConnectionOptions, credentials: SqlServerConnectionCredentialsOptions): Promise<any> {

        credentials = Object.assign(credentials, credentials);

        // build connection options for the driver
        const connectionOptions = Object.assign({}, {
            connectionTimeout: this.options.connectionTimeout,
            requestTimeout: this.options.requestTimeout,
        }, {
            server: credentials.host,
            user: credentials.username,
            password: credentials.password,
            database: credentials.database,
            port: credentials.port,
            domain: credentials.domain,
        });

        // set default useUTC option if it hasn't been set
        //if (!connectionOptions.options) connectionOptions.options = { useUTC: false };
        //else if (!connectionOptions.options.useUTC) connectionOptions.options.useUTC = false;

        // pooling is enabled either when its set explicitly to true,
        // either when its not defined at all (e.g. enabled by default)
        return new Promise<void>((ok, fail) => {
            const pool = new this.sqlserver.ConnectionPool(connectionOptions);

            const { logger } = this.connection;
            /*
              Attaching an error handler to pool errors is essential, as, otherwise, errors raised will go unhandled and
              cause the hosting app to crash.
             */
            pool.on("error", (error: any) => logger.log("warn", `MSSQL pool raised an error. ${error}`));

            const connection = pool.connect((err: any) => {
                if (err) return fail(err);
                ok(connection);
            });
        });
    }
}