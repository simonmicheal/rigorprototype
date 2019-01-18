import {SqliteDriver} from "./sqlite/SqliteDriver";
import {Driver} from "./Driver";
import {Connection} from "../connection/Connection";

export class DriverFactory {
    create(connection: Connection): Driver {
        const {type} = connection.options;
        
        switch (type) {
            case "sqlite":
                return new SqliteDriver(connection);
            default:
                throw new Error;
        }
    }
}