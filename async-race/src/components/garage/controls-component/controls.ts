import './styles/controls.scss';
import { BaseComponent } from '../../../utils/base-component';
import type { IControls } from './types/controls-types';
import { controlsView } from './view/controls-view';
import { Urls } from '../../../enums/urls';
import type { INewCar } from '../../../types/types';

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

    this.addEnableUpgradeCarHandler();
    this.addUpgradeCarHandler();
    this.addCreateCarHandler();
  }

  private addEnableUpgradeCarHandler(): void {
    const enableUpgradeCar = (event: Event): void => {
      if (!(this.upgradeCarInput instanceof HTMLInputElement)
        || !(event instanceof CustomEvent)) throw new Error('not input');

      this.upgradeCarInput.removeAttribute('disabled');
      this.upgradeCarBtn.removeAttribute('disabled');

      const { id, carName } = event.detail;

      this.upgradeCarInput.value = carName;
      this.upgradeCarBtn.setAttribute('data-id', id);
    };
    document.addEventListener('selectCar', enableUpgradeCar);
  }

  private addUpgradeCarHandler(): void {
    const upgradeCarHandler = (): void => {
      if (!(this.upgradeCarInput instanceof HTMLInputElement)
        || this.upgradeCarInput.value.trim() === '') return;
      const newCarName = this.upgradeCarInput.value;
      const newCarColor = '#fff';
      const id = this.upgradeCarBtn.getAttribute('data-id');
      if (id === null) return;

      fetch(`${Urls.GARAGE}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name: newCarName, color: newCarColor }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async () => {
          const updateTrackEvent = new CustomEvent('updateTrack', {
            bubbles: true,
            cancelable: true,
          });
          this.getElement().dispatchEvent(updateTrackEvent);
        })
        .catch((error) => {
          Error(error.message);
        })
        .finally(() => {
          if (!(this.upgradeCarInput instanceof HTMLInputElement)) throw new Error('not input');
          this.upgradeCarInput.value = '';
          this.upgradeCarInput.setAttribute('disabled', '');
          this.upgradeCarBtn.setAttribute('disabled', '');
          this.upgradeCarBtn.removeAttribute('data-id');
        });
    };
    this.upgradeCarBtn.addEventListener('click', upgradeCarHandler);
  }

  private addCreateCarHandler(): void {
    const createCarHandler = (): void => {
      if (!(this.createCarInput instanceof HTMLInputElement)
        || this.createCarInput.value.trim() === '') return;
      const newCarName = this.createCarInput.value;
      const newCarColor = '#fff';
      this.createCarInput.value = '';

      const newCarParams: INewCar = {
        name: newCarName,
        color: newCarColor,
      };

      fetch(Urls.GARAGE, {
        method: 'POST',
        body: JSON.stringify(newCarParams),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async () => {
          const updateTrackEvent = new CustomEvent('updateTrack', {
            bubbles: true,
            cancelable: true,
          });
          this.getElement().dispatchEvent(updateTrackEvent);
        })
        .catch((error) => {
          Error(error.message);
        });
    };

    this.createCarBtn.addEventListener('click', createCarHandler);
  }
}
