import {Connection} from "./Connection";
import {ConnectionOptions} from "./ConnectionOptions";

export class ConnectionManager {

    public readonly connections: Connection[] = [];
    // has(name: string): boolean {
    //     return !!this.connections.find(connection => connection.name === name);
    // }

    get(name:string): Connection {
        const connection = this.connections.find(connection => connection.name === name);
        if (!connection)
            throw new Error;

        return connection;
    }

    create(options: ConnectionOptions): Connection {
        const existConnection = this.connections.find(connection => connection.name === (options.name));
        
        if (existConnection) {
            if (existConnection.isConnected)
                throw new Error;
        }

        const connection = new Connection(options);
        this.connections.push(connection);
        return connection;
    }
}