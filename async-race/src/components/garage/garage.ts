import { BaseComponent } from '../util/base-component';
import { Controls } from './controls-component/controls';
import { Track } from './track-component/track';
// import type { ITrack } from './track-component/types/track-types';
import type { IGarage, IGarageParams } from './types/garage-types';

export class Garage extends BaseComponent implements IGarage {
  public controls;

  public track;

  constructor(params: IGarageParams) {
    super(params.garage);

    this.controls = new Controls(params.sectionControls);
    this.track = new Track(params.track);

    this.getElement().append(this.controls.getElement(), this.track.getElement());
  }
}
