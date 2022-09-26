import { Injectable } from '@nestjs/common';
import { TaskException } from './task.exception';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly repository: TaskRepository,
    private readonly exception: TaskException,
  ) {}
}
