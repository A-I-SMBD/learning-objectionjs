import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateUserCommand } from '../../../../../domain/modules/users/interfaces/usecases/create-user/create-user.command';
import {
  CreateUserUseCase,
  CreateUserUseCaseSymbol,
} from '../../../../../domain/modules/users/interfaces/usecases/create-user/create-user.usecase';
import {
  FindUserUseCase,
  FindUserUseCaseSymbol,
} from '../../../../../domain/modules/users/interfaces/usecases/find-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiParam } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersExternalController {
  constructor(
    @Inject(CreateUserUseCaseSymbol)
    private readonly _createUserUseCase: CreateUserUseCase,

    @Inject(FindUserUseCaseSymbol)
    private readonly _findUserUseCase: FindUserUseCase,
  ) {}

  @Post()
  async create(@Body() { username, password }: CreateUserDto): Promise<string> {
    const hash = await bcrypt.hash(password, 10);

    const command = new CreateUserCommand({
      password: hash,
      username: username,
    });

    return this._createUserUseCase.createUser(command);
  }

  @Get('username/:username')
  @ApiParam({ name: 'username' })
  findByUsername(@Param('username') username: string) {
    return this._findUserUseCase.findUserByUsername(username);
  }
}
