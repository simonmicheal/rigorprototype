import {NativescriptConnectionOptions} from "./NativescriptConnectionOptions";
import {Connection} from "../../connection/Connection";

export class NativescriptDriver {

    connection: Connection;
    databaseConnection: any;
    database?: string;
    sqlite3: any;
    options: NativescriptConnectionOptions;
    driver: any;

    constructor(connection: Connection) {

        this.connection = connection;
        this.options = connection.options as NativescriptConnectionOptions;
        this.database = this.options.database;
        //this.driver = this.options.driver;

        if (!this.options.database) {
            throw new Error;
        }

        // load sqlite package
        this.loadDependencies();
    }

    async disconnect(): Promise<void> {
        return new Promise<void>((ok, fail) => {
            this.databaseConnection.close().then(ok).catch(fail);
        });
    }

    public connect() {
        return new Promise<void>((ok, fail) => {
            const options = Object.assign({}, {
                name: this.options.database,
            });

            new this.sqlite3(options.name, (err: Error, db: any): any => {
                if (err) return fail(err);

                // use object mode to work with TypeORM
                db.resultType(this.sqlite3.RESULTSASOBJECT);


                // we need to enable foreign keys in sqlite to make sure all foreign key related features
                // working properly. this also makes onDelete work with sqlite.
                db.execSQL(`PRAGMA foreign_keys = ON;`, [], (err: Error, result: any): any => {
                    if (err) return fail(err);
                    // We are all set
                    ok(db);
                });
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
        this.sqlite3 = this.driver;
        if (!this.driver) {
            throw new Error;
        }
    }
}