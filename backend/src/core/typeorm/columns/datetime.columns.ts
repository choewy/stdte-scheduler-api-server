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
    update: false,
    transformer: new DateTimeTransformer(),
    ...options,
  });
};

export const UpdateDateTimeColumn = (
  options?: ColumnOptions,
): PropertyDecorator => {
  return UpdateDateColumn({
    transformer: new DateTimeTransformer(),
    ...options,
  });
};

export const DeleteDateTimeColumn = (
  options?: ColumnOptions,
): PropertyDecorator => {
  return DeleteDateColumn({
    default: null,
    transformer: new DateTimeTransformer(),
    ...options,
  });
};

export const DateTimeColumn = (options?: ColumnOptions) => {
  return Column({
    transformer: new DateTimeTransformer(),
    ...options,
  });
};
