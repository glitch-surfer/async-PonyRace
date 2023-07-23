import type { IWinnerResponse } from '../components/winners/types/winners-types';
import { Winner } from '../components/winners/winner/winner';
import { Urls } from '../enums/urls';
import type { ICarResponse } from '../types/types';

export const winnersDataAdapter = async (winnersData: IWinnerResponse[]): Promise<Winner[]> => {
  const winners: Winner[] = [];

  const mergedDataPromiseList = winnersData.map(async (winner) => {
    const carParams: ICarResponse = await (await fetch(`${Urls.GARAGE}/${winner.id}`)).json();
    return { ...winner, ...carParams };
  });

  const winnersList = await Promise.all(mergedDataPromiseList);

  winnersList.reduce((acc, winner, index) => {
    const newWinner = new Winner(winner);
    newWinner.setPosition(index + 1);
    acc[index] = newWinner;
    return acc;
  }, winners);

  return winners;
};
