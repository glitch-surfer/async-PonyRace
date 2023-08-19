import type { IParams } from '../../../../types/types';
import type { IPagination } from '../../../pagination/types/pagination-types';
import type { Car } from '../car/car';

export interface ITrack {
  title: HTMLElement
  subtitle: HTMLElement
  trackList: HTMLElement
  pagination: IPagination
  carsInGarage: Car[]
  carsOnPage: Car[]
  winner: Car | null
  finishedCarCount: number
}

export interface ITrackParams {
  wrapper: IParams
  title: IParams
  subtitle: IParams
  trackList: IParams
}
