import { useEffect, useState } from 'react';

export type OrderType = 'asc' | 'desc';

const useTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<OrderType>('asc');
  const [orderBy, setOrderBy] = useState('');
  const [searchUser, setSearchUser] = useState('');

  useEffect(() => {
    setPage(0);
  }, [rowsPerPage, order, orderBy, searchUser]);

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    searchUser,
    setSearchUser,
  };
};

export default useTable;
