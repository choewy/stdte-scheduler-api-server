import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  providers: [TaskRepository, TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
