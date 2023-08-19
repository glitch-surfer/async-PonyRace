import type { IWinnerResponse } from '../../components/winners/types/winners-types';
import { Urls } from '../../enums/urls';

export const getWinners = async (sort: 'wins' | 'time', order: 'ASC' | 'DESC'): Promise<IWinnerResponse[]> => {
  const response = await fetch(`${Urls.WINNERS}?_sort=${sort}&_order=${order}`);
  const data = await response.json();
  return data;
};
