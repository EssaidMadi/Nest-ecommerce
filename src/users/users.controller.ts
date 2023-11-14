import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from './auth/auth.service';
import { login } from './dto/login-user.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from 'src/guards/seller.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    const payload = {
      email: user.email,
      seller: user.Seller,
    };

    const token = await this.authService.signPayload(payload);

    return { user, token };
  }

  @Post('login')
  async login(@Body() loginDto: login) {
    const user = await this.authService.login(loginDto);

    const payload = {
      email: user.email,
      seller: user.Seller,
    };

    const token = await this.authService.signPayload(payload);

    return { user, token };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async findAll() {
    console.log(await this.usersService.findAll());

    return await this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
