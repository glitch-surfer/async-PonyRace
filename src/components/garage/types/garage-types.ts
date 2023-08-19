import type { IParams } from '../../../types/types';
import type { IControls } from '../controls-component/types/controls-types';
import type { ITrack } from '../track-component/types/track-types';

export interface IGarage {
  controls: IControls
  track: ITrack
}

export interface IGarageParams {
  garage: IParams
}
