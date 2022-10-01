import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { CustomTableHead } from './table.head';
import { CustomTableBody } from './table.body';
import { PER_PAGE_OPTIONS } from './constants';
import {
  ChangeEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { CustomTableColumnData } from './interfaces';
import { GLOBAL_HEIGHT } from '@/app/constants';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props<T> {
  columns: CustomTableColumnData<T>[];
  rows: T[];
  onCellClick?: MouseEventHandler<HTMLTableCellElement>;
}

export function CustomTable<T>({ columns, rows, ...props }: Props<T>) {
  const location = useLocation();

  const query = new URL(window.location.href).searchParams;
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_PAGE_OPTIONS[0]);

  useEffect(() => {
    const pageQueryString = query.get('page') as string;
    const pageQueryValue = parseInt(pageQueryString);

    if (pageQueryString && isNaN(pageQueryValue)) {
      return navigate(`${location.pathname}`, { replace: true });
    }

    if (pageQueryValue) {
      if (rows.length < (pageQueryValue - 1) * perPage) {
        return navigate(`${location.pathname}`, { replace: true });
      }

      return setPage(pageQueryValue);
    }

    setPage(1);
  }, [rows, query, perPage]);

  const onPageChange = (_: unknown, newPage: number) => {
    setPage(newPage + 1);
    navigate(`${location.pathname}?page=${newPage + 1}`);
  };

  const onPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPerPage(+event.target.value);
    },
    [setPerPage, setPage],
  );

  return (
    <Paper
      sx={{
        width: '100%',
        height: GLOBAL_HEIGHT,
        overflowX: 'hidden',
        overflowY: 'hidden',
      }}
    >
      <TableContainer sx={{ height: '100%', maxHeight: GLOBAL_HEIGHT }}>
        <TablePagination
          rowsPerPageOptions={PER_PAGE_OPTIONS}
          component="div"
          count={rows.length}
          rowsPerPage={perPage}
          labelRowsPerPage="목록수"
          getItemAriaLabel={(type) => type}
          page={page - 1}
          onPageChange={onPageChange}
          onRowsPerPageChange={onPerPageChange}
        />
        <Table stickyHeader>
          <CustomTableHead columns={columns} />
          <CustomTableBody
            columns={columns}
            rows={rows}
            page={page - 1}
            perPage={perPage}
            onCellClick={props.onCellClick}
          />
        </Table>
      </TableContainer>
    </Paper>
  );
}
