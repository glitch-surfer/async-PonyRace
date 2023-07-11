import './styles/base.scss';
import type { IApp } from '../types/types';
import { headerView } from './header/view/header-view';
import { Header } from './header/header';
import { Garage } from './garage/garage';
import { Winners } from './winners/winners';

export class App implements IApp {
  constructor(
    public header = new Header(headerView),
    private readonly main = document.createElement('main'),
    public garage = new Garage(),
    public winners = new Winners(),
  ) {
    this.main.append(this.garage.getElement(), this.winners.getElement());
    this.addGarageBtnHandler();
    this.addWinnersBtnHandler();
  }

  public createView(): void {
    document.body.append(this.header.getElement(), this.main);
  }

  private addGarageBtnHandler(): void {
    const garageBtnHandler = (): void => {
      this.garage.getElement().style.display = 'block';
      this.winners.getElement().style.display = 'none';
    };
    this.header.garageBtn.addEventListener('click', garageBtnHandler);
  }

  private addWinnersBtnHandler(): void {
    const winnersBtnHandler = (): void => {
      this.winners.getElement().style.display = 'block';
      this.garage.getElement().style.display = 'none';
    };
    this.header.winnersBtn.addEventListener('click', winnersBtnHandler);
  }
}
