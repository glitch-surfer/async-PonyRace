import { BaseComponent } from '../../../utils/base-component';
import type { IWinner } from './types/winner-types';
import { winnerView } from './view/winner-view';

export class Winner extends BaseComponent implements IWinner {
  position: number;

  color: string;

  name: string;

  id: number;

  wins: number;

  time: number;

  constructor(winnerParams: IWinner) {
    super(winnerView.wrapper);
    this.position = 1;
    this.color = winnerParams.color;
    this.name = winnerParams.name;
    this.id = winnerParams.id;
    this.wins = winnerParams.wins;
    this.time = winnerParams.time;
    this.getElement().append(
      this.getWinner(),
    );
  }

  public getWinner(): string {
    return `Position: ${this.position}, Color: ${this.color}, Name: ${this.name}, ID: ${this.id}, WinsCount: ${this.wins}, BestTime: ${this.time}`;
  }
}
