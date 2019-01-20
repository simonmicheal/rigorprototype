import {SqliteConnectionOptions} from "../driver/sqlite/SqliteConnectionOptions";
import { SqlServerConnectionOptions } from "../driver/sqlserver/SqlServerConnectionOptions";

export type ConnectionOptions = SqliteConnectionOptions
| SqlServerConnectionOptions
