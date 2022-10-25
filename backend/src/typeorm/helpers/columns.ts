import { Column, ColumnOptions } from 'typeorm';
import { DateTimeTransformer } from './value-transformers';

export const DateTimeColumn = (options?: ColumnOptions) =>
  Column({
    ...options,
    type: 'datetime',
    transformer: new DateTimeTransformer(),
  });
