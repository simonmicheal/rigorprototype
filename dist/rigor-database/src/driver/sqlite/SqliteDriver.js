"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class SqliteDriver {
    constructor(connection) {
        this.connection = connection;
        this.options = connection.options;
        this.database = this.options.database;
        if (!this.options.database)
            throw new Error;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.databaseConnection = yield this.createDatabaseConnection();
        });
    }
    createDatabaseConnection() {
        return new Promise((ok, fail) => __awaiter(this, void 0, void 0, function* () {
            const databaseConnection = new this.sqlite.Database(this.options.database, (err) => {
                if (err)
                    return fail(err);
                databaseConnection.run(`PRAGMA foreign_keys = ON;`, (err, result) => {
                    if (err)
                        return fail(err);
                    ok(databaseConnection);
                });
            });
        }));
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((ok, fail) => {
                this.databaseConnection.close((err) => err ? fail(err) : ok());
            });
        });
    }
}
exports.SqliteDriver = SqliteDriver;
