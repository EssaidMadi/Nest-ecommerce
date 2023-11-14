import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { login } from '../dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(createUserDto: CreateUserDto) {
    const { email, name, password, Seller } = createUserDto;
    const user = await this.userService.findOneByEmail(email);
    console.log(user);

    if (user) {
      throw new UnauthorizedException('Email Already Used');
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User();
    (newUser.name = name),
      (newUser.email = email),
      (newUser.password = hash),
      (newUser.Seller = Seller);

    return this.userService.create(newUser);
  }
  async login(loginDto: login) {
    const { email, password } = loginDto;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('invalide credential');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      throw new UnauthorizedException('invalide credential');
    }
  }

  async signPayload(payload: any) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
  }
  async validateUser(payload: any) {
    const { email } = payload;

    return await this.userService.findOneByEmail(email);
  }
}
