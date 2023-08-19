import type { IGarage } from '../components/garage/types/garage-types';
import type { IHeader } from '../components/header/types/header-types';
import type { IWinners } from '../components/winners/types/winners-types';

export interface IParams {
  tag: string
  className?: string[]
  attributes?: Record<string, string>
  text?: string
  link?: string
  id?: string
  children?: IParams[]
}

export interface IBaseComponent {
  getElement: () => HTMLElement
}

export interface IApp {
  header: IHeader
  garage: IGarage
  winners: IWinners
  createView: () => void
}

export interface ICarResponse {
  id: number
  name: string
  color: string
  wins: number
  time: number
}

export interface INewCar {
  name: string
  color: string
}
