import { Car } from '../components/garage/track-component/car/car';
import type { IWinnerResponse } from '../components/winners/types/winners-types';
import type { ICarResponse } from '../types/types';

export const carsInGarageDataAdapter = (
  carsData: ICarResponse[],
  winnersData: IWinnerResponse[],
): Car[] => {
  const carsInGarage: Car[] = [];

  carsData
    .map((carParams) => {
      const winnerParams = winnersData.find((winner) => winner.id === carParams.id);
      if (winnerParams === undefined) return { ...carParams, wins: 0, time: 0 };

      return { ...carParams, wins: winnerParams.wins, time: winnerParams.time };
    })
    .reduce((acc, car, index) => {
      const carsArr = acc;
      carsInGarage[index] = new Car(car);
      return carsArr;
    }, carsInGarage);

  return carsInGarage;
};
