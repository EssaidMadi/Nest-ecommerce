import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class SellerGuard implements CanActivate {
  constructor() {}

  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.seller) {
      return true;
    }
    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}
