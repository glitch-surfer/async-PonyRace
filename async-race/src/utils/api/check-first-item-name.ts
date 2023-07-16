import { Urls } from '../../enums/urls';
import { getRandomColor } from '../get-random-color';
import { getRandomName } from '../get-random-name';
import { updateCar } from './update-car';

export const checkFirstItemName = async (): Promise<void> => {
  const firstPony = await (await fetch(`${Urls.GARAGE}/1`)).json();
  const startItemCount = 4;
  if (firstPony.name === 'Tesla') {
    for (let i = 1; i <= startItemCount; i += 1) {
      updateCar(
        getRandomName(),
        getRandomColor(),
        i,
      )
        .catch((error) => { Error(error.message); });
    }
  }
};
