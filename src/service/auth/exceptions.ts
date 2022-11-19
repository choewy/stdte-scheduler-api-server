import { BadRequestException, ForbiddenException } from '@nestjs/common';

export class AlreadyExistEmailException extends BadRequestException {}
export class IncorrectPasswordException extends BadRequestException {}
export class CannotChangeCurrentPasswordException extends BadRequestException {}
export class AccessDeninedAsWaitStatusException extends ForbiddenException {}
export class AccessDeninedAsRejectStatusException extends ForbiddenException {}
