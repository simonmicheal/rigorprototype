
import { Injectable } from '@nestjs/common';
import { IUser } from '@rigor-database/interfaces/index';
import { ConnectionManager } from '../../../../rigor-database/src/connection/ConnectionManager'
import { ConnectionOptions } from '../../../../rigor-database/src/connection/ConnectionOptions'

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [];


  create(user: IUser) {
    this.users.push(user);
  }

  async findAll() {

    const options: ConnectionOptions = {
      type: "mssql",
      database: "localhost"
    }

    const connectionManager = new ConnectionManager();
    const connection = connectionManager.create(options);
    await connection.connect();

    const s = "Select * from users"
    let t = await connection.driver.query(s);
    await connection.close();

    return t;
  }
}
