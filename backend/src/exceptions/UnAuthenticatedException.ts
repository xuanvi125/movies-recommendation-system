import { UnauthorizedException } from '@nestjs/common';

export class UnAuthenticatedException extends UnauthorizedException {
  constructor(message: string = 'Unauthenticated') {
    super(message);
    this.name = 'UnAuthenticatedException';
  }
}
