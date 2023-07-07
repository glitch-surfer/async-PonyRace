import type { ICarResponse } from '../../types/types';

export const getCars = async (path: string = '/garage'): Promise<ICarResponse[]> => {
  const response = await fetch(`http://127.0.0.1:3000${path}`);
  const data = await response.json();
  return data;
};
