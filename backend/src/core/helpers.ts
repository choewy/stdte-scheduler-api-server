export const classConstructor = <T>(origin: T, data: Partial<T>): T => {
  return Object.assign(origin, data);
};
