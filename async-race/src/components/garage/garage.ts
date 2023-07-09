import { Urls } from '../../enums/urls';
import type { INewCar } from '../../types/types';
import { BaseComponent } from '../../utils/base-component';
import { Controls } from './controls-component/controls';
import { Track } from './track-component/track';
import type { IGarage } from './types/garage-types';
import { garageView } from './view/garage-view';

export class Garage extends BaseComponent implements IGarage {
  constructor(
    public controls = new Controls(),
    public track = new Track(),
  ) {
    super(garageView.garage);

    this.getElement().append(
      this.controls.getElement(),
      this.track.getElement(),
    );

    this.addCreateCarHandler();
    this.addEnableUpgradeCarHandler();
    this.addUpgradeCarHandler();
  }

  private addCreateCarHandler(): void {
    const createCarHandler = (): void => {
      if (!(this.controls.createCarInput instanceof HTMLInputElement)
        || this.controls.createCarInput.value.trim() === '') return;
      const newCarName = this.controls.createCarInput.value;
      const newCarColor = '#fff';
      this.controls.createCarInput.value = '';

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
        .then(async () => this.track.fillTrackList())
        .catch((error) => {
          Error(error.message);
        });
    };

    this.controls.createCarBtn.addEventListener('click', createCarHandler);
  }

  private addEnableUpgradeCarHandler(): void {
    const enableUpgradeCar = (event: Event): void => {
      if (!(this.controls.upgradeCarInput instanceof HTMLInputElement)
        || !(event instanceof CustomEvent)) throw new Error('not input');

      this.controls.upgradeCarInput.removeAttribute('disabled');
      this.controls.upgradeCarBtn.removeAttribute('disabled');

      const { car } = event.detail;
      this.controls.upgradeCarInput.value = car.title.textContent;
    };
    this.getElement().addEventListener('selectCar', enableUpgradeCar);
  }

  private addUpgradeCarHandler(): void {
    const upgradeCarHandler = (): void => {
      if (!(this.controls.upgradeCarInput instanceof HTMLInputElement)
        || this.controls.upgradeCarInput.value.trim() === '') return;
      const newCarName = this.controls.upgradeCarInput.value;
      const newCarColor = '#fff';
      const id = this.track.carsList.find((car) => car.selected)?.id;
      if (id === undefined) return;

      fetch(`${Urls.GARAGE}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name: newCarName, color: newCarColor }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async () => this.track.fillTrackList())
        .catch((error) => {
          Error(error.message);
        })
        .finally(() => {
          if (!(this.controls.upgradeCarInput instanceof HTMLInputElement)) throw new Error('not input');
          this.controls.upgradeCarInput.value = '';
          this.controls.upgradeCarInput.setAttribute('disabled', '');
          this.controls.upgradeCarBtn.setAttribute('disabled', '');
        });
    };
    this.controls.upgradeCarBtn.addEventListener('click', upgradeCarHandler);
  }
}
