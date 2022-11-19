import { BadRequestException } from '@nestjs/common';

export class AlreadyExistEmailException extends BadRequestException {}
export class IncorrectPasswordException extends BadRequestException {}
export class CannotChangeCurrentPasswordException extends BadRequestException {}
