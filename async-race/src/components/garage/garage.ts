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
  }
}
