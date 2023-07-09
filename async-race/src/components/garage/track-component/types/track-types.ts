import type { IParams } from '../../../../types/types';
import type { IPagination } from '../../../pagination/types/pagination-types';

export interface ITrack {
  title: HTMLElement
  subtitle: HTMLElement
  trackList: HTMLElement
  pagination: IPagination
}

export interface ITrackParams {
  wrapper: IParams
  title: IParams
  subtitle: IParams
  trackList: IParams
}
