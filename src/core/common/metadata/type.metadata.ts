import { UserType } from '@/core/typeorm/entities';
import { SetMetadata } from '@nestjs/common';
import { MetadataKey } from './enums';

export const SetUserType = (type: UserType) =>
  SetMetadata(MetadataKey.Type, type);
