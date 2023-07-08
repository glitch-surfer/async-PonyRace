import type { IParams } from '../../../types/types';

export interface IWinnersParams {
  wrapper: IParams
  title: IParams
  subtitle: IParams
  table: IParams
  btnPrev: IParams
  btnNext: IParams
}

export interface IWinners {
  title: HTMLElement
  subtitle: HTMLElement
  table: HTMLElement
  btnPrev: HTMLElement
  btnNext: HTMLElement
}
