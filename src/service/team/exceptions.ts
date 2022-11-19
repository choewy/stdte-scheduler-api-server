import { BadRequestException, NotFoundException } from '@nestjs/common';

export class AlreadyExistTeamNameException extends BadRequestException {}
export class NotFoundTeamException extends NotFoundException {}
export class NotFoundUserException extends NotFoundException {}
