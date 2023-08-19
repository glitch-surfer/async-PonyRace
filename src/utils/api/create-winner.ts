import type { IWinnerResponse } from '../../components/winners/types/winners-types';
import { Urls } from '../../enums/urls';
import { dispatchUpdateWinnersEvent } from '../dispatch-update-winner-event';

export const createWinner = async (winner: IWinnerResponse): Promise<void> => {
  await fetch(Urls.WINNERS, {
    method: 'POST',
    body: JSON.stringify(winner),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  dispatchUpdateWinnersEvent();
};
