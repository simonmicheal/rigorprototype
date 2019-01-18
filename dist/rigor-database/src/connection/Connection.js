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
const LoggerFactory_1 = require("../logger/LoggerFactory");
const DriverFactory_1 = require("../driver/DriverFactory");
class Connection {
    constructor(options) {
        this.isConnected = false;
        this.name = options.name || "default";
        this.options = options;
        this.logger = new LoggerFactory_1.LoggerFactory().create(this.options.logger, this.options.logging);
        this.driver = new DriverFactory_1.DriverFactory().create(this);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected)
                throw new Error;
            // connect to the database via its driver
            yield this.driver.connect();
            //ObjectUtils.assign(this, { isConnected: true });
            return this;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected)
                throw new Error;
            yield this.driver.disconnect();
            //ObjectUtils.assign(this, { isConnected: false });
        });
    }
}
exports.Connection = Connection;
