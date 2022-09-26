import { BaseRepository } from '@/core/typeorm/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository extends BaseRepository {}
