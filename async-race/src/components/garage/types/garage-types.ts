import type { IParams } from '../../../types/types';
import type { IControls, IControlsParams } from '../controls-component/types/controls-types';

export interface IGarage {
  controls: IControls
}

export interface IGarageParams {
  garage: IParams
  sectionControls: IControlsParams
}
