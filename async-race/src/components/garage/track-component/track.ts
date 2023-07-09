import './styles/track.scss';
import { getCars } from '../../../utils/api/get-cars';
import { BaseComponent } from '../../../utils/base-component';
import { Car } from './car/car';
import type { ITrack } from './types/track-types';
import { clearElement } from '../../../utils/clear-element';
import { setCount } from '../../../utils/set-count';
import { Titles } from '../../../enums/titles';
import { Numbers } from '../../../enums/numbers';
import { Urls } from '../../../enums/urls';
import { trackView } from './view/track-view';

export class Track extends BaseComponent implements ITrack {
  public carsList: Car[] = [];

  constructor(
    public title: HTMLElement = new BaseComponent(trackView.title).getElement(),
    public subtitle: HTMLElement = new BaseComponent(trackView.subtitle).getElement(),
    public trackList: HTMLElement = new BaseComponent(trackView.trackList).getElement(),
  ) {
    super(trackView.wrapper);

    this.fillTrackList()
      .catch(() => {
        this.trackList.textContent = 'no cars in garage';
        Error('no cars');
      });

    this.getElement().append(
      this.title,
      this.subtitle,
      this.trackList,
    );

    this.addRemoveCarHandler();
    this.addSelectCarHandler();
  }

  public async fillTrackList(): Promise<void> {
    const cars = await getCars();
    this.carsList = [];

    cars.forEach((car) => {
      const newCar = new Car(car);
      this.carsList.push(newCar);
    });
    this.title.textContent = setCount(Titles.GARAGE, this.carsList);
    this.renderTrack(1);
  }

  public renderTrack(page: number): void {
    const carsOnPage = Numbers.CARS_ON_PAGE;

    clearElement(this.trackList);

    for (let i = (page * carsOnPage) - carsOnPage; i < (page * carsOnPage); i += 1) {
      if (this.carsList[i] === undefined) break;
      this.trackList.append(this.carsList[i].getElement());
    }
  }

  private addRemoveCarHandler(): void {
    const removeCarHandler = (event: MouseEvent): void => {
      const removeBtn = event.target;
      if (removeBtn === null
        || !(removeBtn instanceof HTMLElement)
        || !removeBtn.classList.contains('car__remove-btn')) return;
      const id = this.carsList.find((car) => car.removeBtn === removeBtn)?.id;
      if (id === undefined) return;

      fetch(`${Urls.GARAGE}/${id}`, {
        method: 'DELETE',
      })
        .then(async () => this.fillTrackList())
        .catch(() => {
          this.trackList.textContent = 'no cars in garage';
        });
    };
    this.getElement().addEventListener('click', removeCarHandler);
  }

  private addSelectCarHandler(): void {
    const selectCarHandler = (event: MouseEvent): void => {
      const selectBtn = event.target;
      if (selectBtn === null
        || !(selectBtn instanceof HTMLElement)
        || !selectBtn.classList.contains('car__select-btn')) return;
      const selectedCar = this.carsList.find((car) => car.selectBtn === selectBtn);

      this.carsList.forEach((car) => {
        const erasedCar = car;
        erasedCar.selected = false;
      });

      if (selectedCar === undefined) return;
      selectedCar.selected = true;

      const selectEvent = new CustomEvent('selectCar', {
        bubbles: true,
        cancelable: true,
        detail: {
          car: selectedCar,
        },
      });
      selectBtn.dispatchEvent(selectEvent);
    };
    this.getElement().addEventListener('click', selectCarHandler);
  }
}
