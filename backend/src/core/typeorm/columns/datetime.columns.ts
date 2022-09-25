import {
  Column,
  ColumnOptions,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTimeTransformer } from '@/core/typeorm';

export const CreateDateTimeColumn = (
  options?: ColumnOptions,
): PropertyDecorator => {
  return CreateDateColumn({
    type: 'datetime',
    transformer: new DateTimeTransformer(),
    update: false,
    ...options,
  });
};

export const UpdateDateTimeColumn = (
  options?: ColumnOptions,
): PropertyDecorator => {
  return UpdateDateColumn({
    type: 'datetime',
    transformer: new DateTimeTransformer(),
    ...options,
  });
};

export const DeleteDateTimeColumn = (
  options?: ColumnOptions,
): PropertyDecorator => {
  return DeleteDateColumn({
    type: 'datetime',
    transformer: new DateTimeTransformer(),
    default: null,
    ...options,
  });
};

export const DateTimeColumn = (options?: ColumnOptions) => {
  return Column({
    type: 'datetime',
    transformer: new DateTimeTransformer(),
    ...options,
  });
};
