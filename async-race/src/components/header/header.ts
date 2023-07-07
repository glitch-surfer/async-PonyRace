import type { IHeader, IHeaderParams } from './types/header-types';
import { BaseComponent } from '../util/base-component';

export class Header extends BaseComponent implements IHeader {
  nav: HTMLElement;

  garageBtn: HTMLElement;

  winnersBtn: HTMLElement;

  constructor(params: IHeaderParams) {
    super(params.header);

    this.nav = new BaseComponent(params.nav).getElement();

    this.garageBtn = new BaseComponent(params.garageBtn).getElement();

    this.winnersBtn = new BaseComponent(params.winnersBtn).getElement();

    this.nav.append(this.garageBtn, this.winnersBtn);

    this.getElement().append(this.nav);
  }
}
