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

    this.controls.raceBtn.addEventListener('click', () => { this.startRaceHandler(); });
    this.controls.resetBtn.addEventListener('click', () => { this.resetRaceHandler().catch(() => Error('Oops')); });
  }

  private startRaceHandler(): void {
    this.disableBtns();

    this.resetRaceHandler()
      .then(() => {
        this.disableBtns();
        this.track.carsOnPage.forEach((car) => {
          const readyCar = car;
          readyCar.isRace = true;
          readyCar.startCarHandler();
        });
      }).catch(() => Error('Oops'));
  }

  private async resetRaceHandler(): Promise<void> {
    const { resetBtn } = this.controls;
    resetBtn.setAttribute('disabled', '');

    const stoppedCars = this.track.carsOnPage
      .map(async (car) => car.stopCarHandler());

    return Promise.all(stoppedCars)
      .then(async () => this.track.fillTrackList())
      .catch(() => { Error('no cars'); })
      .finally(() => {
        resetBtn.removeAttribute('disabled');
        this.enableBtns();
        this.track.winner = null;
        this.track.finishedCarCount = 0;
      });
  }

  private disableBtns(): void {
    this.controls.disableBtns();
    this.track.pagination.disableBtns();
  }

  private enableBtns(): void {
    this.controls.enableBtns();
    this.track.pagination.enableBtns();
  }
}
