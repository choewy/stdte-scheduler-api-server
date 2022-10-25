import { DataSource, EntityManager, EntityTarget } from 'typeorm';

export const createRepository = <T>(
  base: DataSource | EntityManager,
  entity: EntityTarget<T>,
) => base.getRepository(entity);
