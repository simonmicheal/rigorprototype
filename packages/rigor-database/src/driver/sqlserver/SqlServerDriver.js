"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var SqlServerDriver = /** @class */ (function () {
    function SqlServerDriver(connection) {
        this.connection = connection;
        this.options = connection.options;
        this.loadDependencies();
    }
    SqlServerDriver.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.createPool(this.options, this.options)];
                    case 1:
                        _a.master = _b.sent();
                        this.database = this.options.database;
                        return [2 /*return*/];
                }
            });
        });
    };
    SqlServerDriver.prototype.createDatabaseConnection = function () {
        var _this = this;
        return new Promise(function (ok, fail) { return __awaiter(_this, void 0, void 0, function () {
            var databaseConnection;
            return __generator(this, function (_a) {
                databaseConnection = new this.mssql.connect(this.options, function (err) {
                    if (err)
                        return fail(err);
                    ok(databaseConnection);
                });
                return [2 /*return*/];
            });
        }); });
    };
    SqlServerDriver.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.master)
                    return [2 /*return*/, Promise.reject(new Error)];
                this.master.close();
                this.master = undefined;
                return [2 /*return*/];
            });
        });
    };
    SqlServerDriver.prototype.loadDependencies = function () {
        try {
            this.mssql = require('mssql');
        }
        catch (e) {
            throw Error;
        }
    };
    SqlServerDriver.prototype.query = function (query, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.master.request().query('select * from Users', function (err, result) {
                            return resolve(result.recordsets);
                        });
                    })];
            });
        });
    };
    SqlServerDriver.prototype.createPool = function (options, credentials) {
        var _this = this;
        credentials = Object.assign(credentials, credentials);
        var connectionOptions = {
            server: 'localhost',
            database: 'ondeck_main',
            user: 'sa',
            password: 'Mexico123!',
            driver: "mssql",
            options: {
                trustedConnection: false,
                encrypt: true // Use this if you're on Windows Azure
            },
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            port: 1433
        };
        // build connection options for the driver
        // const connectionOptions = Object.assign({}, {
        //     connectionTimeout: this.options.connectionTimeout,
        //     requestTimeout: this.options.requestTimeout,
        // }, {
        //     server: credentials.host,
        //     user: credentials.username,
        //     password: credentials.password,
        //     database: credentials.database,
        //     port: credentials.port,
        //     domain: credentials.domain,
        // });
        // set default useUTC option if it hasn't been set
        //if (!connectionOptions.options) connectionOptions.options = { useUTC: false };
        //else if (!connectionOptions.options.useUTC) connectionOptions.options.useUTC = false;
        return new Promise(function (ok, fail) {
            var pool = new _this.mssql.ConnectionPool(connectionOptions);
            var logger = _this.connection.logger;
            pool.on("error", function (error) { return logger.log("warn", "MSSQL pool raised an error. " + error); });
            var connection = pool.connect(function (err) {
                if (err)
                    return fail(err);
                ok(connection);
            });
        });
    };
    return SqlServerDriver;
}());
exports.SqlServerDriver = SqlServerDriver;
//# sourceMappingURL=SqlServerDriver.js.map