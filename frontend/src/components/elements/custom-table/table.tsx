import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { CustomTableHead } from './table.head';
import { CustomTableBody } from './table.body';
import { PER_PAGE_OPTIONS } from './constants';
import { ChangeEvent, useCallback, useState } from 'react';
import { CustomTableColumnData } from './interfaces';

interface Props<T> {
  columns: CustomTableColumnData<T>[];
  rows: T[];
  page?: number;
  take?: number;
}

export function CustomTable<T>({ columns, rows, ...props }: Props<T>) {
  const [page, setPage] = useState<number>(props.page || 0);
  const [perPage, setPerPage] = useState<number>(
    props.take || PER_PAGE_OPTIONS[0],
  );

  const onPageChange = useCallback(
    (_: unknown, newPage: number) => {
      setPage(newPage);
    },
    [setPage],
  );

  const onPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPerPage(+event.target.value);
      setPage(0);
    },
    [setPerPage, setPage],
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: window.outerHeight }}>
        <Table stickyHeader>
          <CustomTableHead columns={columns} />
          <CustomTableBody
            columns={columns}
            rows={rows}
            page={page}
            perPage={perPage}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={PER_PAGE_OPTIONS}
        component="div"
        count={rows.length}
        rowsPerPage={perPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onPerPageChange}
      />
    </Paper>
  );
}
