import { TableBody, TableCell, TableRow } from '@mui/material';
import { MouseEventHandler } from 'react';
import { CustomTableColumnData } from './interfaces';

interface Props<T> {
  columns: CustomTableColumnData<T>[];
  rows: T[];
  page: number;
  perPage: number;
  onCellClick?: MouseEventHandler<HTMLTableCellElement>;
}

export function CustomTableBody<T>({
  columns,
  rows,
  page,
  perPage,
  onCellClick,
}: Props<T>) {
  return (
    <TableBody>
      {rows.slice(page * perPage, page * perPage + perPage).map((row, i) => {
        return (
          <TableRow hover key={JSON.stringify(row) + i}>
            {columns.map((column) => {
              switch (column.type) {
                case 'component':
                  const component = column.component || (() => <></>);
                  return (
                    <TableCell
                      key={JSON.stringify(column) + JSON.stringify(row)}
                      align={column.align}
                      style={{
                        alignItems: column.align,
                        ...column.style,
                      }}
                    >
                      {component({ row })}
                    </TableCell>
                  );

                case 'value':
                default:
                  const value = row[column.key] as string | number;
                  return (
                    <TableCell
                      key={JSON.stringify(column) + JSON.stringify(row)}
                      onClick={onCellClick}
                      align={column.align}
                      style={{
                        alignItems: column.align,
                        ...column.style,
                      }}
                    >
                      {column.format ? column.format(value) : value}
                    </TableCell>
                  );
              }
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
