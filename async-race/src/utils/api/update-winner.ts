import type { IWinnerResponse } from '../../components/winners/types/winners-types';
import { Urls } from '../../enums/urls';
import { dispatchUpdateWinnersEvent } from '../dispatch-update-winner-event';

export const updateWinner = (winner: Omit<IWinnerResponse, 'id'>, id: number): void => {
  console.log('updateWinner');
  fetch(`${Urls.WINNERS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(winner),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      dispatchUpdateWinnersEvent();
    }).catch((error) => {
      Error(error.message);
    })
    .catch((error) => {
      Error(error.message);
    });
};
