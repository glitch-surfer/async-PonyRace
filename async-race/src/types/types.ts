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

export interface IHeader {
  nav: HTMLElement
  garageBtn: HTMLElement
  winnersBtn: HTMLElement
}

export interface IApp {
  header: IHeader
}
// export interface IGarage extends IBaseComponent {

// }

export interface IHeaderParams {
  header: IParams
  nav: IParams
  garageBtn: IParams
  winnersBtn: IParams
}
