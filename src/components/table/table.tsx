import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import useTable from '../../hooks/useTable';
import useData from '../../hooks/useData';

interface Column {
  id: 'name' | 'nick' | 'birthYear' | 'country';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => number;
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'nick', label: 'NICK', minWidth: 100 },
  {
    id: 'birthYear',
    label: 'age',
    minWidth: 170,
    align: 'center',
    format: (birthYear) => new Date().getFullYear() - birthYear,
  },
  {
    id: 'country',
    label: 'Country',
    minWidth: 170,
    align: 'center',
  },
];

interface Data {
  name: string;
  nick: string;
  birthYear: number;
  country: string;
}

const CustomTable = () => {
  const {
    page,
    setPage,
    setRowsPerPage,
    rowsPerPage,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    searchUser,
    setSearchUser,
  } = useTable();

  const { data } = useData({ page, rowsPerPage, order, orderBy, searchUser });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUserSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => setSearchUser(() => event.target.value), 1000);
  };
  return (
    <>
      <input
        placeholder='Sarch for teams, players, matches'
        onChange={handleUserSearch}
      />
      <TableContainer sx={{ maxHeight: 740 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='left' colSpan={columns.length}>
                Players
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                    {orderBy === column.id ? (
                      <Box component='span' sx={visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.content &&
              data.content.map((row: any) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.nick}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id !== 'country' &&
                            (column.format && typeof value === 'number'
                              ? column.format(value)
                              : value)}
                          {column.id === 'country' &&
                            typeof value === 'string' && (
                              <img
                                loading='lazy'
                                width='20'
                                src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${value.toLowerCase()}.png 2x`}
                                alt=''
                              />
                            )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 100]}
          component='div'
          count={data?.totalElements || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default CustomTable;
