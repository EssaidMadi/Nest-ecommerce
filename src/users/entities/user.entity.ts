import * as mongoose from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

// export const User = new mongoose.Schema({
//   name: String,
//   password: String,
//   email: String,
//   Seller: {
//     type: Boolean,
//     default: false,
//   },
//   address: {
//     addr1: String,
//     addr2: String,
//     city: String,
//     state: String,
//     contry: String,
//     zip: String,
//   },
//   created: {
//     type: Date,
//     default: Date.now,
//   },
// });

import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId })
  id: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ type: Boolean, default: false })
  Seller: boolean;

  @Prop({
    type: {
      addr1: { type: String },
      addr2: { type: String },
      city: { type: String },
      state: { type: String },
      contry: { type: String },
      zip: { type: String },
    },
  })
  address: {
    addr1: string;
    addr2: string;
    city: string;
    state: string;
    contry: string;
    zip: string;
  };

  @Prop({ type: Date, default: Date.now })
  created: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
