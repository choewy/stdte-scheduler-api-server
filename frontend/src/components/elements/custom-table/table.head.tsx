import { TableCell, TableHead, TableRow } from '@mui/material';
import { CustomTableColumnData } from './interfaces';

interface Props<T> {
  columns: readonly CustomTableColumnData<T>[];
}

export function CustomTableHead<T>({ columns }: Props<T>) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={JSON.stringify(column)}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
