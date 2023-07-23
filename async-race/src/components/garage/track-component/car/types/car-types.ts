import type { IParams } from '../../../../../types/types';

export interface ICarParams {
  wrapper: IParams
  selectBtn: IParams
  removeBtn: IParams
  title: IParams
  startBtn: IParams
  stopBtn: IParams
  car: IParams
}

export interface ICar {
  id: number
  name: string
  color: string
  wins: number
  bestTime: number
  selectBtn: HTMLElement
  removeBtn: HTMLElement
  title: HTMLElement
  startBtn: HTMLElement
  stopBtn: HTMLElement
  car: HTMLElement
  carState: ICarState
}

export interface ICarState {
  selected: boolean
  animation: Animation | null
  isRace: boolean
  isStarted: boolean
  isDeleted: boolean
  isEngineStopped: boolean
}
