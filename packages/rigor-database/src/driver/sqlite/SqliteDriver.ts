import { Connection } from "../../connection/Connection";
import { SqliteConnectionOptions } from "./SqliteConnectionOptions";
import { Driver } from "../Driver";

export class SqliteDriver implements Driver {
    connection: Connection;
    databaseConnection: any;
    options: SqliteConnectionOptions;
    database?: string;
    sqlite3: any;

    constructor(connection: Connection) {
        this.connection = connection;
        this.options = connection.options as SqliteConnectionOptions;
        this.database = this.options.database;

        if (!this.options.database)
            throw new Error;

        this.loadDependencies();
    }

    async connect(): Promise<void> {
        this.databaseConnection = await this.createDatabaseConnection();
    }

    protected createDatabaseConnection() {
        return new Promise<void>(async (ok, fail) => {
            const databaseConnection = new this.sqlite3.Database(this.options.database, (err: any) => {
                if (err) return fail(err);

                // we need to enable foreign keys in sqlite to make sure all foreign key related features
                // working properly. this also makes onDelete to work with sqlite.
                databaseConnection.run(`PRAGMA foreign_keys = ON;`, (err: any, result: any) => {
                    if (err) return fail(err);
                    ok(databaseConnection);
                });
            });
        });
    }

    async disconnect(): Promise<void> {
        return new Promise<void>((ok, fail) => {
            this.databaseConnection.close((err: any) => {
                if (err) return fail(err);
                ok(this.databaseConnection);
            });
        });
    }

    async query(query: string, parameters?: any[]): Promise<any> {
        return new Promise<any[]>((resolve, reject) => {
            this.databaseConnection.all(query, (err:any, rows: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    protected loadDependencies(): void {
        try {
            this.sqlite3 = require("sqlite3");

        } catch (e) {
            throw new Error(e);
        }
    }
}