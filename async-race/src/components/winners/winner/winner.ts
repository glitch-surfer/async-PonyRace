import { BaseComponent } from '../../../utils/base-component';
import type { IWinner } from './types/winner-types';

export class Winner extends BaseComponent implements IWinner {
  position: number;

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

    this.position = 1;
    this.color = winnerParams.color;
    this.name = winnerParams.name;
    this.id = winnerParams.id;
    this.wins = winnerParams.wins;
    this.time = winnerParams.time;

    this.appendWinnerData();
  }

  private appendWinnerData(): void {
    this.getElement().append(
      new BaseComponent({
        tag: 'td',
        className: ['winner__td_number'],
        text: `${this.position}`,
      }).getElement(),
      new BaseComponent({
        tag: 'td',
        className: ['winner__td_car'],
        text: this.color,
      }).getElement(),
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
}
