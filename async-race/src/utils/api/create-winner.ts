import type { IWinnerResponse } from '../../components/winners/types/winners-types';
import { Urls } from '../../enums/urls';
import { dispatchUpdateWinnersEvent } from '../dispatch-update-winner-event';

export const createWinner = (winner: IWinnerResponse): void => {
  fetch(Urls.WINNERS, {
    method: 'POST',
    body: JSON.stringify(winner),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      dispatchUpdateWinnersEvent();
    })
    .catch((error) => {
      Error(error.message);
    });
};
