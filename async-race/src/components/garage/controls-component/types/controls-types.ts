import type { IParams } from '../../../../types/types';

export interface IControlsParams {
  wrapper: IParams
  controls: IParams
  createCarInput: IParams
  createCarColorInput: IParams
  createCarBtn: IParams
  upgradeCarInput: IParams
  upgradeCarColorInput: IParams
  upgradeCarBtn: IParams
  raceBtn: IParams
  resetBtn: IParams
  generateCarsBtn: IParams
}

export interface IControls {
  createCarInput: HTMLElement
  createCarBtn: HTMLElement
  upgradeCarInput: HTMLElement
  upgradeCarBtn: HTMLElement
  raceBtn: HTMLElement
  resetBtn: HTMLElement
  generateCarsBtn: HTMLElement
}
