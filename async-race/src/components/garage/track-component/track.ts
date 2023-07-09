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

    this.addRemoveCarHandler();
    this.addSelectCarHandler();
  }

  public async fillTrackList(): Promise<void> {
    const cars = await getCars();
    this.clearTrack();
    cars.forEach((car) => {
      const newCar = new Car(car);
      this.carsList.push(newCar);
      this.trackList.append(newCar.getElement());
    });
    this.setCarsCount();
  }

  private setCarsCount(): void {
    this.title.textContent = `Garage (${this.carsList.length})`;
  }

  private clearTrack(): void {
    this.carsList = []; // there can be probles
    while (this.trackList.firstChild !== null) {
      this.trackList.firstChild.remove();
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

      fetch(`http://127.0.0.1:3000/garage/${id}`, {
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
