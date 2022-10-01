import { CSSProperties, FC } from 'react';

export interface CustomTableColumnData<T> {
  key: keyof T;
  type: 'value' | 'component';
  label: string;
  minWidth?: number;
  align?: 'inherit' | 'left' | 'right' | 'center' | 'justify';
  style?: CSSProperties;
  component?: FC<{ row?: T }>;
  format?: (value: any) => any;
}
