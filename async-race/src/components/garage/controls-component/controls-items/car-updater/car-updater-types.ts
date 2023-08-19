import type { IParams } from '../../../../../types/types';

export interface ICarUpdater {
  updateCarInput: HTMLElement
  updateCarColorInput: HTMLElement
  updateCarBtn: HTMLElement
  getElements: () => HTMLElement[]
}

export interface ICarUpdaterParams {
  updateCarInput: IParams
  updateCarColorInput: IParams
  updateCarBtn: IParams
}
