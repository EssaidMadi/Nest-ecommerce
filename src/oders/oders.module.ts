import { Module } from '@nestjs/common';
import { OdersService } from './oders.service';
import { OdersController } from './oders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './entities/oder.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  controllers: [OdersController],
  providers: [OdersService],
})
export class OdersModule {}
