import './styles/base.scss';
import type { IApp } from '../types/types';
import { Garage } from './garage/garage';
import { headerView } from './header/view/header-view';
import { Header } from './header/header';
import { garageView } from './garage/view/garage-view';

export class App implements IApp {
  constructor(
    public header = new Header(headerView),
    private readonly main = document.createElement('main'),
    public garage = new Garage(garageView),
  ) {
    this.main.append(this.garage.getElement());
  }

  public createView(): void {
    document.body.append(this.header.getElement(), this.main);
  }
}
