import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private repo: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto, user: User) {
    const { title } = createProductDto;
    const product = await this.findOneByTitle(title);

    if (product) {
      throw new UnauthorizedException('product already exist');
    }
    const products = await new this.repo({ ...createProductDto, owner: user });
    return products.save();
  }

  async findAll() {
    return await this.repo.find().populate('owner');
  }

  async findOne(id: number) {
    return await this.repo.findById({ id });
  }

  async findOneByTitle(title: string) {
    return await this.repo.findOne({ title });
  }

  async update(id: number, updateProductDto: UpdateProductDto, userId: string) {
    const product = await this.findOne(id);
    if (!product && userId !== product.owner.toString()) {
      throw new NotFoundException();
    }
    // const newproduct = new Product();
    // Object.assign(newproduct, updateProductDto);
    //const newproduct = { ...product, updateProductDto };
    await product.update(updateProductDto);
    return product.populate('owner');
  }

  async remove(id: number, userId: string) {
    const product = await this.findOne(id);
    if (!product && userId !== product.owner.toString()) {
      throw new NotFoundException();
    }
    await this.repo.remove(id);
    return product.populate('owner');
  }
}
