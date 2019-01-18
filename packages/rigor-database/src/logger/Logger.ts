export interface Logger {
    logQuery(query: string, parameters?: any[]): any;
    log(level: "log"|"info"|"warn", message: any): any;
}