import { BadRequestException, NotFoundException } from '@nestjs/common';

export class AlreadyExistTaskCodeException extends BadRequestException {}
export class NotFoundTaskException extends NotFoundException {}
export class NotFoundTeamException extends NotFoundException {}
export class CannotAddOrRemoveTeamGlobalTaskEXception extends BadRequestException {}
