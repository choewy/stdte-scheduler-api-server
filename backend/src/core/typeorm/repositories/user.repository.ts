import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository {}
