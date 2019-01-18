export interface SqlServerConnectionCredentialsOptions {

    readonly url?: string;
    readonly host?: string;
    readonly port?: number;
    readonly username?: string;
    readonly password?: string;
    readonly database?: string;
    readonly domain?: string;
}