import type { IParams } from '../../../types/types';
import type { IPagination } from '../../pagination/types/pagination-types';

export interface IWinnersParams {
  wrapper: IParams
  title: IParams
  subtitle: IParams
  table: IParams
}

export interface IWinners {
  title: HTMLElement
  subtitle: HTMLElement
  table: HTMLElement
  pagination: IPagination
}

export interface IWinnerResponse {
  id: number
  wins: number
  time: number
}
