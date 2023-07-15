import { BaseComponent } from '../../../utils/base-component';
import { carView } from '../../garage/track-component/car/view/car-view';
import type { IWinner } from './types/winner-types';

export class Winner extends BaseComponent implements IWinner {
  position: HTMLElement;

  car: HTMLElement;

  color: string;

  name: string;

  id: number;

  wins: number;

  time: number;

  constructor(winnerParams: IWinner) {
    super({
      tag: 'tr',
      className: ['winner'],
    });

    this.position = new BaseComponent({
      tag: 'td',
      className: ['winner__td_number'],
    }).getElement();

    this.car = new BaseComponent({
      tag: 'td',
      className: ['winner__td_car'],
      children: [
        carView.car,
      ],
    }).getElement();

    this.color = winnerParams.color;
    this.name = winnerParams.name;
    this.id = winnerParams.id;
    this.wins = winnerParams.wins;
    this.time = winnerParams.time;

    this.setColor(winnerParams.color);
    this.appendWinnerData();
  }

  private appendWinnerData(): void {
    this.getElement().append(
      this.position,
      this.car,
      new BaseComponent({
        tag: 'td',
        className: ['winner__td_name'],
        text: this.name,
      }).getElement(),
      new BaseComponent({
        tag: 'td',
        className: ['winner__td_wins'],
        text: this.wins.toString(),
      }).getElement(),
      new BaseComponent({
        tag: 'td',
        className: ['winner__td_time'],
        text: this.time.toString(),
      }).getElement(),
    );
  }

  public setPosition(position: number): void {
    this.position.textContent = position.toString();
  }

  private setColor(color: string): void {
    this.car.style.backgroundColor = color;
  }
}
