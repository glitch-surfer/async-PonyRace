import './styles/controls.scss';
import { BaseComponent } from '../../../utils/base-component';
import type { IControls } from './types/controls-types';
import { controlsView } from './view/controls-view';
import { Urls } from '../../../enums/urls';
import type { INewCar } from '../../../types/types';
import { Numbers } from '../../../enums/numbers';
import { getRandomName } from '../../../utils/get-random-name';
import { getRandomColor } from '../../../utils/get-random-color';
import { dispatchUpdateWinnersEvent } from '../../../utils/dispatch-update-winner-event';
import type { Car } from '../track-component/car/car';
import { dispatchUpdateTrackEvent } from '../../../utils/dispatch-update-track-event';
import { updateCar } from '../../../utils/api/update-car';
import { disableBtns, enableBtns } from '../../../utils/handle-btns';
import { CarCreator } from './controls-items/create-car/create-car';

export class Controls extends BaseComponent implements IControls {
  private selectedCar: Car | null = null;

  carCreator = new CarCreator();

  constructor(
    public upgradeCarInput: HTMLElement = new BaseComponent(controlsView.upgradeCarInput)
      .getElement(),
    public upgradeCarColorInput: HTMLElement = new BaseComponent(controlsView.upgradeCarColorInput)
      .getElement(),
    public upgradeCarBtn: HTMLElement = new BaseComponent(controlsView.upgradeCarBtn).getElement(),
    public raceBtn: HTMLElement = new BaseComponent(controlsView.raceBtn).getElement(),
    public resetBtn: HTMLElement = new BaseComponent(controlsView.resetBtn).getElement(),
    public generateCarsBtn: HTMLElement = new BaseComponent(controlsView.generateCarsBtn)
      .getElement(),
  ) {
    super(controlsView.wrapper);

    this.getElement().append(
      ...this.carCreator.getElements(),
      this.upgradeCarInput,
      this.upgradeCarColorInput,
      this.upgradeCarBtn,
      this.raceBtn,
      this.resetBtn,
      this.generateCarsBtn,
    );

    document.addEventListener('selectCar', (event) => { this.enableUpgradeCar(event); });
    this.upgradeCarBtn.addEventListener('click', () => { this.upgradeCarHandler().catch(() => Error('Update car error')); });
    this.generateCarsBtn.addEventListener('click', () => { Controls.generateNewCars().catch(() => Error('Generate cars error')); });
  }

  private enableUpgradeCar(event: Event): void {
    const nameInput = this.upgradeCarInput;
    const colorInput = this.upgradeCarColorInput;
    const btn = this.upgradeCarBtn;

    if (!(nameInput instanceof HTMLInputElement)
      || !(colorInput instanceof HTMLInputElement)
      || !(event instanceof CustomEvent)) throw new Error('not input');

    enableBtns([nameInput, colorInput, btn]);

    this.selectedCar = event.detail.car;
    if (this.selectedCar === null) return;
    nameInput.value = this.selectedCar.name;
    colorInput.value = this.selectedCar.color;
  }

  private async upgradeCarHandler(): Promise<void> {
    const nameInput = this.upgradeCarInput;
    const colorInput = this.upgradeCarColorInput;

    if (!(nameInput instanceof HTMLInputElement)
      || !(colorInput instanceof HTMLInputElement)
      || nameInput.value.trim() === '') return;

    if (this.selectedCar === null) return;
    this.selectedCar.name = nameInput.value;
    this.selectedCar.color = colorInput.value;

    await updateCar(
      this.selectedCar.name,
      this.selectedCar.color,
      this.selectedCar.id,
    );

    this.selectedCar?.updateCar();
    dispatchUpdateWinnersEvent();

    nameInput.value = '';
    colorInput.value = '';

    disableBtns([nameInput, colorInput, this.upgradeCarBtn]);
    this.selectedCar = null;
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
      [this.raceBtn, this.generateCarsBtn, this.carCreator.createCarBtn, this.upgradeCarBtn],
    );
  }

  public enableBtns(): void {
    enableBtns([this.raceBtn, this.generateCarsBtn, this.carCreator.createCarBtn]);
  }
}
