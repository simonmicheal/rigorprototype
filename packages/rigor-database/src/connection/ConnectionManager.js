"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Connection_1 = require("./Connection");
var ConnectionManager = /** @class */ (function () {
    function ConnectionManager() {
        this.connections = [];
    }
    // has(name: string): boolean {
    //     return !!this.connections.find(connection => connection.name === name);
    // }
    ConnectionManager.prototype.get = function (name) {
        var connection = this.connections.find(function (connection) { return connection.name === name; });
        if (!connection)
            throw new Error;
        return connection;
    };
    ConnectionManager.prototype.create = function (options) {
        var existConnection = this.connections.find(function (connection) { return connection.name === (options.name); });
        if (existConnection) {
            if (existConnection.isConnected)
                throw new Error;
        }
        var connection = new Connection_1.Connection(options);
        this.connections.push(connection);
        return connection;
    };
    return ConnectionManager;
}());
exports.ConnectionManager = ConnectionManager;
//# sourceMappingURL=ConnectionManager.js.map