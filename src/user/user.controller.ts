import { Controller, Get, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { UserEntity } from './user.entity';
import { UserService } from 'src/user/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService){}

  @Post()
  create(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
