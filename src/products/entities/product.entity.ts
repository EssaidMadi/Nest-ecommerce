import * as mongoose from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

// export const Product = new mongoose.Schema({
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   title: String,
//   description: String,
//   image: String,
//   price: String,
//   created: {
//     type: Date,
//     default: Date.now,
//   },
// });
export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  price: string;

  @Prop({ type: Date, default: Date.now })
  created: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
