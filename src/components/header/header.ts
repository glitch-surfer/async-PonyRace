import './styles/header.scss';
import type { IHeader } from './types/header-types';
import { BaseComponent } from '../../utils/base-component';
import { headerView } from './view/header-view';

export class Header extends BaseComponent implements IHeader {
  constructor(
    public nav = new BaseComponent(headerView.nav).getElement(),
    public garageBtn = new BaseComponent(headerView.garageBtn).getElement(),
    public winnersBtn = new BaseComponent(headerView.winnersBtn).getElement(),
  ) {
    super(headerView.header);

    this.nav.append(this.garageBtn, this.winnersBtn);
    this.getElement().append(this.nav);
  }
}
