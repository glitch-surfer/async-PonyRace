import type { IParams } from '../../../../types/types';

export interface IControlsParams {
  wrapper: IParams
  controls: IParams
  raceBtn: IParams
  resetBtn: IParams
  generateCarsBtn: IParams
}

export interface IControls {
  raceBtn: HTMLElement
  resetBtn: HTMLElement
  generateCarsBtn: HTMLElement
}
