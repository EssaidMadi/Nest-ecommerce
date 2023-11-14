import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOderDto } from './dto/create-oder.dto';
import { UpdateOderDto } from './dto/update-oder.dto';
import { OrderDocument } from './entities/oder.entity';

@Injectable()
export class OdersService {
  constructor(@InjectModel('Order') private repo: Model<OrderDocument>) {}

  async create(createOderDto: CreateOderDto) {
    return await this.repo.create(createOderDto);
  }

  async listOrderByUser(UserId: string) {
    const order = await this.repo
      .find({ owner: UserId })
      .populate('owner')
      .populate('product');
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  findAll() {
    return `This action returns all oders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oder`;
  }

  update(id: number, updateOderDto: UpdateOderDto) {
    return `This action updates a #${id} oder`;
  }

  remove(id: number) {
    return `This action removes a #${id} oder`;
  }
}
