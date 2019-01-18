import { Driver } from "./Driver";
import { Connection } from "../connection/Connection";
export declare class DriverFactory {
    create(connection: Connection): Driver;
}
