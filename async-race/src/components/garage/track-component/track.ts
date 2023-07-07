import { BaseComponent } from '../../util/base-component';
import type { ITrack, ITrackParams } from './types/track-types';

export class Track extends BaseComponent implements ITrack {
  public title: HTMLElement;

  public subtitle: HTMLElement;

  public trackList: HTMLElement;

  public prevBtn: HTMLElement;

  public nextBtn: HTMLElement;

  constructor(params: ITrackParams) {
    super(params.wrapper);

    this.title = new BaseComponent(params.title).getElement();
    this.subtitle = new BaseComponent(params.subtitle).getElement();
    this.trackList = new BaseComponent(params.trackList).getElement();
    this.prevBtn = new BaseComponent(params.prevBtn).getElement();
    this.nextBtn = new BaseComponent(params.nextBtn).getElement();

    this.getElement().append(
      this.title,
      this.subtitle,
      this.trackList,
      this.prevBtn,
      this.nextBtn,
    );
  }
}
