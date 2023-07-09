import './styles/controls.scss';
import { BaseComponent } from '../../../utils/base-component';
import type { IControls } from './types/controls-types';
import { controlsView } from './view/controls-view';

export class Controls extends BaseComponent implements IControls {
  constructor(
    public createCarInput: HTMLElement = new BaseComponent(controlsView.createCarInput)
      .getElement(),
    public createCarBtn: HTMLElement = new BaseComponent(controlsView.createCarBtn)
      .getElement(),
    public upgradeCarInput: HTMLElement = new BaseComponent(controlsView.upgradeCarInput)
      .getElement(),
    public upgradeCarBtn: HTMLElement = new BaseComponent(controlsView.upgradeCarBtn)
      .getElement(),
    public raceBtn: HTMLElement = new BaseComponent(controlsView.raceBtn)
      .getElement(),
    public resetBtn: HTMLElement = new BaseComponent(controlsView.resetBtn)
      .getElement(),
    public generateCarsBtn: HTMLElement = new BaseComponent(controlsView.generateCarsBtn)
      .getElement(),
  ) {
    super(controlsView.wrapper);

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
