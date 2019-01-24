"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerFactory = /** @class */ (function () {
    function LoggerFactory() {
    }
    LoggerFactory.prototype.create = function (logger, options) {
        if (logger instanceof Object)
            return logger;
        if (logger) {
            switch (logger) {
                case "simple-console":
                // return new SimpleConsoleLogger(options);
                case "file":
                //  return new FileLogger(options);
                case "advanced-console":
                // return new AdvancedConsoleLogger(options);
                case "debug":
                // return new DebugLogger();
            }
        }
        //return new AdvancedConsoleLogger(options);
    };
    return LoggerFactory;
}());
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=LoggerFactory.js.map