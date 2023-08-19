import './styles/controls.scss';
import { BaseComponent } from '../../../utils/base-component';
import type { IControls } from './types/controls-types';
import { controlsView } from './view/controls-view';
import { disableBtns, enableBtns } from '../../../utils/handle-btns';
import { CarCreator } from './controls-items/car-creator/car-creator';
import { CarUpdater } from './controls-items/car-updater/car-updater';
import { generateNewCars } from '../../../utils/api/generateNewCars';

export class Controls extends BaseComponent implements IControls {
  carCreator = new CarCreator();

  carUpdater = new CarUpdater();

  constructor(
    public raceBtn: HTMLElement = new BaseComponent(controlsView.raceBtn).getElement(),
    public resetBtn: HTMLElement = new BaseComponent(controlsView.resetBtn).getElement(),
    public generateCarsBtn: HTMLElement = new BaseComponent(controlsView.generateCarsBtn)
      .getElement(),
  ) {
    super(controlsView.wrapper);

    this.getElement().append(
      ...this.carCreator.getElements(),
      ...this.carUpdater.getElements(),
      this.raceBtn,
      this.resetBtn,
      this.generateCarsBtn,
    );

    this.generateCarsBtn.addEventListener('click', () => { generateNewCars().catch(() => Error('Generate cars error')); });
  }

  public disableBtns(): void {
    disableBtns(
      [
        this.raceBtn,
        this.generateCarsBtn,
        this.carCreator.createCarBtn,
        this.carUpdater.updateCarBtn,
      ],
    );
  }

  public enableBtns(): void {
    enableBtns([this.raceBtn, this.generateCarsBtn, this.carCreator.createCarBtn]);
  }
}
