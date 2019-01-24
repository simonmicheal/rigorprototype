import { SqliteDriver } from "./sqlite/SqliteDriver";
import { Driver } from "./Driver";
import { Connection } from "../connection/Connection";
import { SqlServerDriver } from "./sqlserver/SqlServerDriver";
import { NativescriptDriver } from "./nativescript/NativescriptDriver";

export class DriverFactory {
    create(connection: Connection): Driver {
        const { type } = connection.options;

        switch (type) {
            case "sqlite":
                return new SqliteDriver(connection);
            case "mssql":
                return new SqlServerDriver(connection);
            case "nativescript":
                return new NativescriptDriver(connection);
            default:
                throw new Error;
        }
    }
}