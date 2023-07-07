// import { IBaseComponent } from '../../../types/types';
import { BaseComponent } from '../../util/base-component';
import type { IControls, IControlsParams } from './types/controls-types';

export class Controls extends BaseComponent implements IControls {
  public createCarInput: HTMLElement;

  public createCarBtn: HTMLElement;

  public upgradeCarInput: HTMLElement;

  public upgradeCarBtn: HTMLElement;

  public raceBtn: HTMLElement;

  public resetBtn: HTMLElement;

  public generateCarsBtn: HTMLElement;

  constructor(params: IControlsParams) {
    super(params.wrapper);

    this.createCarInput = new BaseComponent(params.createCarInput).getElement();
    this.createCarBtn = new BaseComponent(params.createCarBtn).getElement();
    this.upgradeCarInput = new BaseComponent(params.upgradeCarInput).getElement();
    this.upgradeCarBtn = new BaseComponent(params.upgradeCarBtn).getElement();
    this.raceBtn = new BaseComponent(params.raceBtn).getElement();
    this.resetBtn = new BaseComponent(params.resetBtn).getElement();
    this.generateCarsBtn = new BaseComponent(params.generateCarsBtn).getElement();

    this.getElement().append(
      this.createCarInput,
      this.createCarBtn,
      this.upgradeCarInput,
      this.upgradeCarBtn,
      this.raceBtn,
      this.resetBtn,
      this.generateCarsBtn,
    );
  }
}
