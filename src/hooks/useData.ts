import { useQuery } from 'react-query';
import { OrderType } from './useTable';

interface useDataProps {
  page: number;
  rowsPerPage: number;
  order: OrderType;
  orderBy: string;
  searchUser: string;
}

const getPlayers = async (
  page: number,
  rowsPerPage: number,
  order: OrderType,
  orderBy: string,
  searchUser: string
) => {
  const params = new URLSearchParams({
    size: rowsPerPage.toString(),
    page: page.toString(),
    sort: orderBy,
    sortDir: order,
    searchBy: searchUser,
  });

  try {
    const response = await fetch(
      'https://api.ggpredict.dev:8080/restapi/players?' + params
    );
    const data = await response.json();
    return data;
  } catch (error) {}
};

const useData = ({
  page,
  rowsPerPage,
  order,
  orderBy,
  searchUser,
}: useDataProps) => {
  const { isLoading, data } = useQuery(
    ['usersData', page, rowsPerPage, order, orderBy, searchUser],
    () => getPlayers(page, rowsPerPage, order, orderBy, searchUser),
    { keepPreviousData: true }
  );
  return { data, isLoading };
};

export default useData;
