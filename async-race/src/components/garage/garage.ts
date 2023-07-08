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
  }

  private addCreateCarHandler(): void {
    const createCarHandler = (): void => {
      if (!(this.controls.createCarInput instanceof HTMLInputElement)) throw new Error('not input');
      const newCarName = this.controls.createCarInput.value;
      const newCarId = Math.max(...this.track.carsList.map((car) => car.id)) + 1;
      const newCarColor = '#fff';
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
}
