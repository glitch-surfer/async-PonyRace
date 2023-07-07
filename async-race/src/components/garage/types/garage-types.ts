import type { IParams } from '../../../types/types';
import type { IControls, IControlsParams } from '../controls-component/types/controls-types';
import type { ITrack, ITrackParams } from '../track-component/types/track-types';

export interface IGarage {
  controls: IControls
  track: ITrack
}

export interface IGarageParams {
  garage: IParams
  sectionControls: IControlsParams
  track: ITrackParams
}
