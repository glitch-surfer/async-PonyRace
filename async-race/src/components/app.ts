import '../styles/base.scss';
import type { IApp } from '../types/types';
import { Header } from './header/header';
import { Garage } from './garage/garage';
import { Winners } from './winners/winners';

export class App implements IApp {
  constructor(
    public header = new Header(),
    private readonly main = document.createElement('main'),
    public garage = new Garage(),
    public winners = new Winners(),
  ) {
    this.main.append(this.garage.getElement(), this.winners.getElement());
    this.header.garageBtn.addEventListener('click', () => { this.garageBtnHandler(); });
    this.header.winnersBtn.addEventListener('click', () => { this.winnersBtnHandler(); });
  }

  public createView(): void {
    document.body.append(this.header.getElement(), this.main);
  }

  private garageBtnHandler(): void {
    this.garage.getElement().style.display = 'block';
    this.winners.getElement().style.display = 'none';
    this.header.garageBtn.setAttribute('disabled', '');
    this.header.winnersBtn.removeAttribute('disabled');
  }

  private winnersBtnHandler(): void {
    this.winners.getElement().style.display = 'block';
    this.garage.getElement().style.display = 'none';
    this.header.winnersBtn.setAttribute('disabled', '');
    this.header.garageBtn.removeAttribute('disabled');
  }
}
