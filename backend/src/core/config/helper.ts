export const getEnvWithPrefix = <T>(prefix: string) => {
  return Object.fromEntries(
    Object.entries(process.env)
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, value]) => [
        key
          .replace(`${prefix}_`, '')
          .split('_')
          .map((str, i) =>
            i === 0
              ? str.toLowerCase()
              : str[0].toUpperCase() + str.slice(1).toLowerCase(),
          )
          .join(''),
        value,
      ]),
  ) as T;
};
