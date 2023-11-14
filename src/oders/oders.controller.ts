import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OdersService } from './oders.service';
import { CreateOderDto } from './dto/create-oder.dto';
import { UpdateOderDto } from './dto/update-oder.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('oders')
export class OdersController {
  constructor(private readonly odersService: OdersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createOderDto: CreateOderDto, @CurrentUser() { id }: User) {
    return this.odersService.create(createOderDto, id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  listOrders(@CurrentUser() { id }: User) {
    return this.odersService.listOrderByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.odersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOderDto: UpdateOderDto) {
    return this.odersService.update(+id, updateOderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.odersService.remove(+id);
  }
}
