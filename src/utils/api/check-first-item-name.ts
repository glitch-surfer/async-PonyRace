import { Urls } from '../../enums/urls';
import { getRandomColor } from '../get-random-color';
import { getRandomName } from '../get-random-name';
import { updateCar } from './update-car';

export const isNeedToUpdateInitialNames = async (): Promise<boolean> => {
  const firstPony = await (await fetch(`${Urls.GARAGE}/1`)).json();
  return firstPony.name === 'Tesla';
};

export const changeInitialNames = async (): Promise<Response[]> => {
  const ids = [1, 2, 3, 4];
  return Promise.all(ids.map(async (id) => updateCar(getRandomName(), getRandomColor(), id)));
};
