export interface CustomTableColumnData<T> {
  key: keyof T;
  label: string;
  minWidth?: number;
  align?: 'inherit' | 'left' | 'right' | 'center' | 'justify';
  format?: (value: number) => string;
}
