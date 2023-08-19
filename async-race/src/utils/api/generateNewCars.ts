import { Numbers } from '../../enums/numbers';
import { Urls } from '../../enums/urls';
import type { INewCar } from '../../types/types';
import { dispatchUpdateTrackEvent } from '../dispatch-update-track-event';
import { getRandomColor } from '../get-random-color';
import { getRandomName } from '../get-random-name';

export const generateNewCars = async (): Promise<void> => {
  const newCars = Array(Numbers.GENERATE_CAR_COUNT)
    .fill(null)
    .map(async () => {
      const newCarParams: INewCar = {
        name: getRandomName(),
        color: getRandomColor(),
      };

      const newCar = fetch(Urls.GARAGE, {
        method: 'POST',
        body: JSON.stringify(newCarParams),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return newCar;
    });

  await Promise.all(newCars);
  dispatchUpdateTrackEvent();
};
