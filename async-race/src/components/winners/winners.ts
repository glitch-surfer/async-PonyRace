import { BaseComponent } from '../../utils/base-component';
import type { IWinners, IWinnersParams } from './types/winners-types';

export class Winners extends BaseComponent implements IWinners {
  title: HTMLElement;

  subtitle: HTMLElement;

  table: HTMLElement;

  btnPrev: HTMLElement;

  btnNext: HTMLElement;

  constructor(params: IWinnersParams) {
    super(params.wrapper);
    this.title = new BaseComponent(params.title).getElement();
    this.subtitle = new BaseComponent(params.subtitle).getElement();
    this.table = new BaseComponent(params.table).getElement();
    this.btnPrev = new BaseComponent(params.btnPrev).getElement();
    this.btnNext = new BaseComponent(params.btnNext).getElement();

    this.getElement().append(
      this.title,
      this.subtitle,
      this.table,
      this.btnPrev,
      this.btnNext,
    );
  }
}
