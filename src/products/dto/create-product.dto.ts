import { User } from 'src/users/entities/user.entity';

export class CreateProductDto {
  owner: User;

  title: string;

  description: string;

  image: string;

  price: string;
}
