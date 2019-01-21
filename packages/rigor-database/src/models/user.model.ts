import { IsString, IsInt } from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
  @IsString() readonly username: string;
  @IsString() readonly password: string;
}