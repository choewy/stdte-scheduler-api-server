import { SwaggerController } from '@/core/swagger';
import { TaskService } from './task.service';

@SwaggerController({ path: 'tasks', tag: '업무' })
export class TaskController {
  constructor(private readonly service: TaskService) {}
}
