import './styles/controls.scss';
import { BaseComponent } from '../../../utils/base-component';
import type { IControls } from './types/controls-types';
import { controlsView } from './view/controls-view';
import { Urls } from '../../../enums/urls';
import type { INewCar } from '../../../types/types';
import { Numbers } from '../../../enums/numbers';
import { getRandomName } from '../../../utils/get-random-name';
import { getRandomColor } from '../../../utils/get-random-color';
import { dispatchUpdateTrackEvent } from '../../../utils/dispatch-update-track-event';
import { disableBtns, enableBtns } from '../../../utils/handle-btns';
import { CarCreator } from './controls-items/car-creator/car-creator';
import { CarUpdater } from './controls-items/car-updater/car-updater';

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

    this.generateCarsBtn.addEventListener('click', () => { Controls.generateNewCars().catch(() => Error('Generate cars error')); });
  }

  private static async generateNewCars(): Promise<void> {
    const newCars = Array(Numbers.GENERATE_CAR_COUNT)
      .fill(null)
      .map(async () => {
        const newCarParams: INewCar = {
          name: getRandomName(),
          color: getRandomColor(),
        };

        const newCar = await fetch(Urls.GARAGE, {
          method: 'POST',
          body: JSON.stringify(newCarParams),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        return newCar;
      });

    await Promise.all(newCars);
    dispatchUpdateTrackEvent();
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
