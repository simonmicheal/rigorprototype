"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SqliteDriver_1 = require("./sqlite/SqliteDriver");
var SqlServerDriver_1 = require("./sqlserver/SqlServerDriver");
var NativescriptDriver_1 = require("./nativescript/NativescriptDriver");
var DriverFactory = /** @class */ (function () {
    function DriverFactory() {
    }
    DriverFactory.prototype.create = function (connection) {
        var type = connection.options.type;
        switch (type) {
            case "sqlite":
                return new SqliteDriver_1.SqliteDriver(connection);
            case "mssql":
                return new SqlServerDriver_1.SqlServerDriver(connection);
            case "nativescript":
                return new NativescriptDriver_1.NativescriptDriver(connection);
            default:
                throw new Error;
        }
    };
    return DriverFactory;
}());
exports.DriverFactory = DriverFactory;
//# sourceMappingURL=DriverFactory.js.map