import { Module } from '@nestjs/common';
import { JwtAuthService } from '@/core/jwt-auth';
import { TaskController } from './task.controller';
import { TaskException } from './task.exception';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  providers: [JwtAuthService, TaskRepository, TaskException, TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
