import type { IHeader } from '../components/header/types/header-types';

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
}

export interface ICarResponse {
  id: number
  name: string
  color: string
}
