import {
    Controller,
    Get,
  } from '@nestjs/common';
  import { IUser } from '@rigor-database/interfaces/index';
  import { UsersService } from './users.service';

  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    async findAll(): Promise<IUser[]> {
      let t = await this.usersService.findAll();
      return t;
    }
  }