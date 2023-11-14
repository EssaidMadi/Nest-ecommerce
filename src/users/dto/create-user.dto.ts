import { IsString, IsBoolean, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  Seller: boolean;
}
