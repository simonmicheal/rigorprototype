"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SqliteDriver_1 = require("./sqlite/SqliteDriver");
class DriverFactory {
    create(connection) {
        const { type } = connection.options;
        switch (type) {
            case "sqlite":
                return new SqliteDriver_1.SqliteDriver(connection);
            default:
                throw new Error;
        }
    }
}
exports.DriverFactory = DriverFactory;
