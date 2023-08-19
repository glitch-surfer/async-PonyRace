import { Urls } from '../../enums/urls';

export const updateCar = async (name: string, color: string, id: number): Promise<Response> => fetch(`${Urls.GARAGE}/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({ name, color }),
  headers: {
    'Content-Type': 'application/json',
  },
});
