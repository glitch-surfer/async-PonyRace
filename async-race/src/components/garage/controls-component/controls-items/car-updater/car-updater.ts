import { updateCar } from '../../../../../utils/api/update-car';
import { BaseComponent } from '../../../../../utils/base-component';
import { dispatchUpdateWinnersEvent } from '../../../../../utils/dispatch-update-winner-event';
import { enableBtns, disableBtns } from '../../../../../utils/handle-btns';
import type { Car } from '../../../track-component/car/car';
import type { ICarUpdater } from './car-updater-types';
import { carUpdaterView } from './car-updater-view';

export class CarUpdater implements ICarUpdater {
  private selectedCar: Car | null = null;

  updateCarInput: HTMLInputElement = new BaseComponent(carUpdaterView.updateCarInput)
    .getElement() as HTMLInputElement;

  updateCarColorInput: HTMLInputElement = new BaseComponent(carUpdaterView.updateCarColorInput)
    .getElement() as HTMLInputElement;

  updateCarBtn: HTMLElement = new BaseComponent(carUpdaterView.updateCarBtn).getElement();

  constructor() {
    document.addEventListener('selectCar', (event) => { this.enableupdateCar(event); });
    this.updateCarBtn.addEventListener('click', () => { this.updateCarHandler().catch(() => Error('Update car error')); });
  }

  private enableupdateCar(event: Event): void {
    const nameInput = this.updateCarInput;
    const colorInput = this.updateCarColorInput;
    const btn = this.updateCarBtn;

    if (!(nameInput instanceof HTMLInputElement)
      || !(colorInput instanceof HTMLInputElement)
      || !(event instanceof CustomEvent)) throw new Error('not input');

    enableBtns([nameInput, colorInput, btn]);

    this.selectedCar = event.detail.car;
    if (this.selectedCar === null) return;
    nameInput.value = this.selectedCar.name;
    colorInput.value = this.selectedCar.color;
  }

  private async updateCarHandler(): Promise<void> {
    const nameInput = this.updateCarInput;
    const colorInput = this.updateCarColorInput;

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

    disableBtns([nameInput, colorInput, this.updateCarBtn]);
    this.selectedCar = null;
  }

  getElements(): HTMLElement[] {
    return [this.updateCarInput, this.updateCarColorInput, this.updateCarBtn];
  }
}
