import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private repo: Model<UserDocument>) {}

  // private sanitizeUser(user: User) {
  //   //const sanitized = user.toObject();
  //   delete sanitized['password'];
  //   return sanitized;
  //   //return user.depopulate('password');
  // }
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await new this.repo(createUserDto);
      return newUser.save();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  findAll() {
    return this.repo.find;
  }

  findOne(id: number) {
    return this.repo.findById(id);
  }

  async findOneByEmail(email: string) {
    return await this.repo.findOne({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
