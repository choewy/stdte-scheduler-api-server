export const exampleEnumKeys = (
  enumType: any[] | Record<string, any>,
  distinct?: boolean,
) => {
  let keys = Object.keys(enumType);

  if (distinct) {
    keys = keys.reduce((prev: string[], current): string[] => {
      if (!prev.includes(current)) {
        prev.push(current);
      }
      return prev;
    }, []);
  }

  return keys.join(' | ');
};

export const exampleEnumValues = (
  enumType: any[] | Record<string, any>,
  distinct?: boolean,
) => {
  let values = Object.values(enumType);

  if (distinct) {
    values = values.reduce((prev: any[], current): any[] => {
      if (!prev.includes(current)) {
        prev.push(current);
      }
      return prev;
    }, []);
  }

  return values.join(' | ');
};
