import type { IParams } from '../../../../../types/types';

export interface ICarCreator {
  createCarInput: HTMLElement
  createCarColorInput: HTMLElement
  createCarBtn: HTMLElement
  getElements: () => HTMLElement[]
}

export interface ICreateCarParams {
  createCarInput: IParams
  createCarColorInput: IParams
  createCarBtn: IParams
}
