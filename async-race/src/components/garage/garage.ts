import { BaseComponent } from '../../utils/base-component';
import { Controls } from './controls-component/controls';
import { Track } from './track-component/track';
import type { IGarage } from './types/garage-types';
import { garageView } from './view/garage-view';

export class Garage extends BaseComponent implements IGarage {
  private carsOnTrack = 0;

  constructor(
    public controls = new Controls(),
    public track = new Track(),
  ) {
    super(garageView.garage);

    this.getElement().append(
      this.controls.getElement(),
      this.track.getElement(),
    );

    document.body.addEventListener('startCar', () => { this.startCarController(); });
    document.body.addEventListener('stopCar', () => { this.stopCarController(); });
  }

  private startCarController(): void {
    this.carsOnTrack += 1;
    this.controls.disableBtns();
    this.track.pagination.disableBtns();
    
    // this.track.carsOnPage.forEach((car) => {
    //   car.disableBtns();
    // });
  }

  private stopCarController(): void {
    this.carsOnTrack -= 1;
    if (this.carsOnTrack === 0) {
      this.controls.enableBtns();
      this.track.pagination.enableBtns();
      // this.track.carsOnPage.forEach((car) => {
      //   car.enableBtns();
      // });
    }
  }
}
