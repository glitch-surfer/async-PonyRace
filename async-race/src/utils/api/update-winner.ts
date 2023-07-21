import type { IWinnerResponse } from '../../components/winners/types/winners-types';
import { Urls } from '../../enums/urls';
import { dispatchUpdateWinnersEvent } from '../dispatch-update-winner-event';

export const updateWinner = async (winner: Omit<IWinnerResponse, 'id'>, id: number): Promise<void> => {
  await fetch(`${Urls.WINNERS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(winner),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  dispatchUpdateWinnersEvent();
};
