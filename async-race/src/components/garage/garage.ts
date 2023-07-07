import { BaseComponent } from '../util/base-component';
import { Controls } from './controls-component/controls';
import type { IGarage, IGarageParams } from './types/garage-types';

export class Garage extends BaseComponent implements IGarage {
  public controls;

  constructor(params: IGarageParams) {
    super(params.garage);

    this.controls = new Controls(params.sectionControls);

    this.getElement().append(this.controls.getElement());
  }
}
