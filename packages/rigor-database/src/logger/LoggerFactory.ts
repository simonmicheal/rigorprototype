import {Logger} from "./Logger";
import {LoggerOptions} from "./LoggerOptions";

export class LoggerFactory {
    create(logger?: "advanced-console"|"simple-console"|"file"|"debug"|Logger, options?: LoggerOptions): Logger {
        if (logger instanceof Object)
            return logger as Logger;

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
    }
}