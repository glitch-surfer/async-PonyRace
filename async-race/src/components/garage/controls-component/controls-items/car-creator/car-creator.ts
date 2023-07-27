import { Urls } from '../../../../../enums/urls';
import type { INewCar } from '../../../../../types/types';
import { BaseComponent } from '../../../../../utils/base-component';
import { dispatchUpdateTrackEvent } from '../../../../../utils/dispatch-update-track-event';
import type { ICarCreator } from './car-creator-types';
import { carCreatorView } from './car-creator-view';

export class CarCreator implements ICarCreator {
  createCarInput: HTMLInputElement = new BaseComponent(carCreatorView.createCarInput)
    .getElement() as HTMLInputElement;

  createCarColorInput: HTMLInputElement = new BaseComponent(carCreatorView.createCarColorInput)
    .getElement() as HTMLInputElement;

  createCarBtn: HTMLElement = new BaseComponent(carCreatorView.createCarBtn).getElement();

  constructor() {
    this.createCarBtn.addEventListener('click', () => { this.createCarHandler().catch(() => Error('Create car error')); });
  }

  private async createCarHandler(): Promise<void> {
    const nameInput = this.createCarInput;
    const colorInput = this.createCarColorInput;

    if (!(nameInput instanceof HTMLInputElement)
      || !(colorInput instanceof HTMLInputElement)
      || nameInput.value.trim() === '') return;
    const newCarName = nameInput.value;
    const newCarColor = colorInput.value;

    const newCarParams: INewCar = {
      name: newCarName,
      color: newCarColor,
    };

    await fetch(Urls.GARAGE, {
      method: 'POST',
      body: JSON.stringify(newCarParams),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatchUpdateTrackEvent();

    nameInput.value = '';
    colorInput.value = '';
  }

  getElements(): HTMLElement[] {
    return [this.createCarInput, this.createCarColorInput, this.createCarBtn];
  }
}
