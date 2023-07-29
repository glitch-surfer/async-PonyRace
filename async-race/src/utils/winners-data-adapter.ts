import type { IWinnerResponse } from '../components/winners/types/winners-types';
import { Winner } from '../components/winners/winner/winner';
import { Urls } from '../enums/urls';

export const winnersDataAdapter = async (winnersData: IWinnerResponse[]): Promise<Winner[]> => {
  const winners: Winner[] = [];

  const mergedDataPromiseList: Array<Promise<Winner>> = winnersData.map(async (winner) => {
    const carParams = await fetch(`${Urls.GARAGE}/${winner.id}`);
    return { ...winner, ...(await carParams.json()) };
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
