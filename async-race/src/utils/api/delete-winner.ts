import { Urls } from '../../enums/urls';

export const deleteWinner = async (id: number): Promise<void> => {
  await fetch(`${Urls.WINNERS}/${id}`, {
    method: 'DELETE',
  });
};
