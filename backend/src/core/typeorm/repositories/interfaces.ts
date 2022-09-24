import { Repository } from 'typeorm';

export interface EntityAttribute<T> {
  target: Repository<T>;
  instance: (arg?: Partial<T>) => T;
}
