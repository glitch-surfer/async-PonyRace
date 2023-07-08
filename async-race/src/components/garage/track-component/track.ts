import './styles/track.scss';
import { getCars } from '../../../utils/api/get-cars';
import { BaseComponent } from '../../../utils/base-component';
import { Car } from './car/car';
import type { ITrack, ITrackParams } from './types/track-types';

export class Track extends BaseComponent implements ITrack {
  public title: HTMLElement;

  public subtitle: HTMLElement;

  public trackList: HTMLElement;

  public carsList: Car[] = [];

  public prevBtn: HTMLElement;

  public nextBtn: HTMLElement;

  constructor(params: ITrackParams) {
    super(params.wrapper);

    this.title = new BaseComponent(params.title).getElement();
    this.subtitle = new BaseComponent(params.subtitle).getElement();
    this.trackList = new BaseComponent(params.trackList).getElement();
    this.prevBtn = new BaseComponent(params.prevBtn).getElement();
    this.nextBtn = new BaseComponent(params.nextBtn).getElement();

    this.fillTrackList().catch(() => {
      this.trackList.textContent = 'no cars in garage';
      Error('no cars');
    });

    this.getElement().append(
      this.title,
      this.subtitle,
      this.trackList,
      this.prevBtn,
      this.nextBtn,
    );
  }

  private async fillTrackList(): Promise<void> {
    const cars = await getCars();
    cars.forEach((car) => {
      const newCar = new Car(car);
      this.carsList.push(newCar);
      this.trackList.append(newCar.getElement());
    });
  }
}
