import type { IWinnerResponse } from '../../components/winners/types/winners-types';
import { Urls } from '../../enums/urls';

export const getWinners = async (): Promise<IWinnerResponse[]> => {
  const response = await fetch(`${Urls.WINNERS}`);
  const data = await response.json();
  return data;
};
