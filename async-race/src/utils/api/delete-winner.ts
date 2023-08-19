import { Urls } from '../../enums/urls';

export const deleteWinner = async (id: number): Promise<Response> => fetch(`${Urls.WINNERS}/${id}`, {
  method: 'DELETE',
});
