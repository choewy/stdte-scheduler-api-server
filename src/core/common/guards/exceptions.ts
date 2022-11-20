import { UnauthorizedException } from '@nestjs/common';

export class JwtExpiredException extends UnauthorizedException {}
export class JwtInvalidException extends UnauthorizedException {}
