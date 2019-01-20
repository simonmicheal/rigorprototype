import {
    Controller,
    Get,
  } from '@nestjs/common';
  import { User } from './models/user.model';
  import { UsersService } from './users.service';

  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    async findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }
  }