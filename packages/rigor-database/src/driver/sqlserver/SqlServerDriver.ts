import { Driver } from "../Driver";
import { Connection } from "../../connection/Connection";
import { SqlServerConnectionOptions } from "./SqlServerConnectionOptions";
import { SqlServerConnectionCredentialsOptions } from "./SqlServerConnectionCredentialsOptions";

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
        this.master = await this.createPool(this.options, this.options);
        this.database = this.options.database;
    }

    protected createDatabaseConnection() {
        return new Promise<void>(async (ok, fail) => {
            const databaseConnection = new this.mssql.connect(this.options, (err: any) => {
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
            this.mssql = require('mssql');

        } catch (e) {
            throw Error;
        }
    }

    async query(query: string, parameters?: any[]): Promise<any> {
        return new Promise<any[]>((resolve, reject) => {
             this.master.request().query('select * from Users', (err: any, result: any) => {
                return resolve(result.recordsets);
            })
        });
    }

    protected createPool(options: SqlServerConnectionOptions, credentials: SqlServerConnectionCredentialsOptions): Promise<any> {

        credentials = Object.assign(credentials, credentials);


        var connectionOptions = {
            server: 'localhost',
            database: 'ondeck_main',
            user: 'sa',
            password: 'Mexico123!',
            driver: "mssql",
            options: {
                trustedConnection: false,
                encrypt: true // Use this if you're on Windows Azure
            },
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            port: 1433
        };

        // build connection options for the driver
        // const connectionOptions = Object.assign({}, {
        //     connectionTimeout: this.options.connectionTimeout,
        //     requestTimeout: this.options.requestTimeout,
        // }, {
        //     server: credentials.host,
        //     user: credentials.username,
        //     password: credentials.password,
        //     database: credentials.database,
        //     port: credentials.port,
        //     domain: credentials.domain,
        // });

        // set default useUTC option if it hasn't been set
        //if (!connectionOptions.options) connectionOptions.options = { useUTC: false };
        //else if (!connectionOptions.options.useUTC) connectionOptions.options.useUTC = false;

        return new Promise<void>((ok, fail) => {
            const pool = new this.mssql.ConnectionPool(connectionOptions);

            const { logger } = this.connection;

            pool.on("error", (error: any) => logger.log("warn", `MSSQL pool raised an error. ${error}`));

            const connection = pool.connect((err: any) => {
                if (err) return fail(err);
                ok(connection);
            });
        });
    }
}