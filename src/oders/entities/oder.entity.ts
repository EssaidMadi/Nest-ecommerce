import * as mongoose from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

// export const Order = new mongoose.Schema({
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   totalPrice: {
//     type: Number,
//     default: 0,
//   },
//   Product: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//       },
//       quantite: {
//         type: Number,
//         default: 0,
//       },
//     },
//   ],
//   created: {
//     type: Date,
//     default: Date.now,
//   },
// });
export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: Number, default: 0 })
  totalPrice: number;

  @Prop({
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantite: { type: Number, default: 0 },
      },
    ],
  })
  product: [Product];

  @Prop({ type: Date, default: Date.now })
  created: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
