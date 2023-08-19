import { Urls } from '../../enums/urls';
import type { ICarResponse } from '../../types/types';

export const getCars = async (): Promise<ICarResponse[]> => {
  const response = await fetch(`${Urls.GARAGE}`);
  const data = await response.json();
  return data;
};
