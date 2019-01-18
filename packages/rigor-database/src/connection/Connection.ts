import { Logger } from "../logger/Logger";
import { LoggerFactory } from "../logger/LoggerFactory";
import { ConnectionOptions } from "./ConnectionOptions";
import { DriverFactory } from "../driver/DriverFactory";
import { Driver } from "../driver/Driver";

export class Connection {
    readonly name: string;
    readonly options: ConnectionOptions;
    public isConnected = false;
    readonly driver: Driver;
    readonly logger: Logger;

    constructor(options: ConnectionOptions) {
        this.name = options.name;
        this.options = options;
        this.logger = new LoggerFactory().create(this.options.logger, this.options.logging);
        this.driver = new DriverFactory().create(this);
    }

    async connect(): Promise<this> {
        if (this.isConnected)
            throw new Error;

        await this.driver.connect();
        this.isConnected = true;     
        return this;
    }

    async close(): Promise<this> {
        if (!this.isConnected)
            throw new Error;

        await this.driver.disconnect();
        this.isConnected = false;
        return this;
    }
}