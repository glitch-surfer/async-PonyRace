import { BaseComponent } from '../../../utils/base-component';
import { img } from '../../garage/track-component/car/img/svg-string';
import { carView } from '../../garage/track-component/car/view/car-view';
import type { IWinner } from './types/winner-types';

export class Winner extends BaseComponent implements IWinner {
  public color: string;

  public name: string;

  public id: number;

  public wins: number;

  public time: number;

  public position: HTMLElement = new BaseComponent({
    tag: 'td',
    className: ['winner__td_number'],
  }).getElement();

  public car: HTMLElement = new BaseComponent({
    tag: 'td',
    className: ['winner__td_car'],
    children: [
      carView.car,
    ],
  }).getElement();

  constructor({
    color, name, id, wins, time,
  }: IWinner) {
    super({
      tag: 'tr',
      className: ['winner'],
    });
    this.color = color;
    this.name = name;
    this.id = id;
    this.wins = wins;
    this.time = time;

    this.setColor(color);

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
    this.car.innerHTML = img;
    (this.car.querySelector('.cls-19') as SVGElement).style.fill = color;
  }
}
