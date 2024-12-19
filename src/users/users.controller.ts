import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
/**
 * Handles HTTP requests related to user management, including registration, login, retrieval, update, and deletion.
 */
export class UsersController {
  constructor(
    private usersServices: UsersService,
    private readonly config: ConfigService,
  ) {}
  //private users: UserEntity[] = [];

  //create New User
  @Post('auth/register')
  public createUser(@Body(new ValidationPipe()) body: CreateUserDto) {
    return this.usersServices.registerUser(body);
  }
  //Post ./users/auth/login
  @Post('auth/login') //201
  @HttpCode(HttpStatus.OK) //200
  public loginUser(@Body() body: LoginUserDto) {
    return this.usersServices.login(body);
  }

  //get all user
  @Get()
  find() {
    return this.usersServices.getAllUsers();
  }

  //get user by id
  @Get('current-user')
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Finds a user by the given ID.

/******  81f4a2fa-f7de-47ec-8787-09a0443f4da7  *******/
  findOne(@Headers() headers: any) {
    return this.usersServices.getUserById(headers.authorization);
  }

  //
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    /*const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = { ...this.users[index], ...updateUserDto };*/

    return this.usersServices.updateUser(id, body);
  }

  //**delete user */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.deleteUser(id);
  }
}
