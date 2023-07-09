import type { ICarResponse } from '../../types/types';
import { BaseComponent } from '../../utils/base-component';
import { Controls } from './controls-component/controls';
import { Track } from './track-component/track';
import type { IGarage, IGarageParams } from './types/garage-types';

export class Garage extends BaseComponent implements IGarage {
  public controls;

  public track;

  constructor(params: IGarageParams) {
    super(params.garage);

    this.controls = new Controls(params.sectionControls);
    this.track = new Track(params.track);

    this.getElement().append(this.controls.getElement(), this.track.getElement());
    this.addCreateCarHandler();
    this.addEnableUpgradeCarHandler();
    this.addUpgradeCarHandler();
  }

  private addCreateCarHandler(): void {
    const createCarHandler = (): void => {
      if (!(this.controls.createCarInput instanceof HTMLInputElement)
        || this.controls.createCarInput.value.trim() === '') return;
      const newCarName = this.controls.createCarInput.value;
      const newCarId = Math.max(...this.track.carsList.map((car) => car.id)) + 1;
      const newCarColor = '#fff';
      this.controls.createCarInput.value = '';

      const newCarParams: ICarResponse = {
        id: newCarId,
        name: newCarName,
        color: newCarColor,
      };

      fetch('http://127.0.0.1:3000/garage', {
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

      fetch(`http://127.0.0.1:3000/garage/${id}`, {
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
