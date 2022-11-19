import { Column, ColumnOptions } from 'typeorm';
import { DateTimeTransformer } from '../transformers';

export const DateTimeColumn = (options: ColumnOptions = {}) => {
  const defaultOptions: ColumnOptions = {
    type: 'datetime',
    transformer: new DateTimeTransformer(),
  };

  return Column(Object.assign(options, defaultOptions));
};
