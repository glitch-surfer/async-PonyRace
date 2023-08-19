import { BaseComponent } from '../../utils/base-component';
import { disableBtns, enableBtns } from '../../utils/handle-btns';
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

    this.controls.raceBtn.addEventListener('click', () => { this.startRaceHandler().catch(() => Error('Start race error')); });
    this.controls.resetBtn.addEventListener('click', () => { this.resetRaceHandler().catch(() => Error('Reset race error')); });
  }

  private async startRaceHandler(): Promise<void> {
    this.disableBtns();
    this.track.getElement().style.pointerEvents = 'none';

    await this.resetRaceHandler();

    this.disableBtns();
    this.track.carsOnPage.forEach((car) => {
      const readyCar = car;
      readyCar.carState.isRace = true;
      readyCar.startCarHandler()
        .catch(() => Error('Start car error'));
    });
    this.track.getElement().style.pointerEvents = '';
  }

  private async resetRaceHandler(): Promise<void> {
    const { resetBtn } = this.controls;
    disableBtns([resetBtn]);

    const stoppedCars = this.track.carsOnPage
      .map(async (car) => car.stopCarHandler());

    await Promise.all(stoppedCars);

    await this.track.fillTrackList();

    enableBtns([resetBtn]);
    this.enableBtns();
    this.track.winner = null;
    this.track.finishedCarCount = 0;
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
