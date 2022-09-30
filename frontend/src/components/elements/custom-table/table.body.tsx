import { TableBody, TableCell, TableRow } from '@mui/material';
import { CustomTableColumnData } from './interfaces';

interface Props<T> {
  columns: CustomTableColumnData<T>[];
  rows: T[];
  page: number;
  perPage: number;
}

export function CustomTableBody<T>({ columns, rows, page, perPage }: Props<T>) {
  return (
    <TableBody>
      {rows.slice(page * perPage, page * perPage + perPage).map((row, i) => {
        return (
          <TableRow hover key={JSON.stringify(row) + i}>
            {columns.map((column) => {
              const value = row[column.key] as string | number;
              return (
                <TableCell
                  key={JSON.stringify(column) + JSON.stringify(row)}
                  align={column.align}
                >
                  {column.format && typeof value === 'number'
                    ? column.format(value)
                    : value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
