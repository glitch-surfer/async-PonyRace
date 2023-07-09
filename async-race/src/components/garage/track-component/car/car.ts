import './styles/car.scss';
import type { ICarResponse } from '../../../../types/types';
import { BaseComponent } from '../../../../utils/base-component';
import type { ICar } from './types/car-types';
import { carView } from './view/car-view';
import { Urls } from '../../../../enums/urls';

export class Car extends BaseComponent implements ICar {
  public id: number;

  public name: string;

  public color: string;

  public selected: boolean = false;

  public selectBtn: HTMLElement = new BaseComponent(carView.selectBtn).getElement();

  public removeBtn: HTMLElement = new BaseComponent(carView.removeBtn).getElement();

  public title: HTMLElement = new BaseComponent(carView.title).getElement();

  public startBtn: HTMLElement = new BaseComponent(carView.startBtn).getElement();

  public stopBtn: HTMLElement = new BaseComponent(carView.stopBtn).getElement();

  public car: HTMLElement = new BaseComponent(carView.car).getElement();

  constructor(carParams: ICarResponse) {
    super(carView.wrapper);

    this.id = carParams.id;
    this.name = carParams.name;
    this.color = carParams.color;

    this.getElement().setAttribute('data-id', `${this.id}`);

    this.setColor(this.color);
    this.setName(this.name);

    this.getElement().append(
      this.selectBtn,
      this.removeBtn,
      this.title,
      this.startBtn,
      this.stopBtn,
      this.car,
    );

    this.addRemoveCarHandler();
    this.addSelectCarHandler();
  }

  private setColor(color: string): void {
    this.car.style.backgroundColor = color;
  }

  private setName(name: string): void {
    this.title.textContent = name;
  }

  private addRemoveCarHandler(): void {
    const removeCarHandler = (event: MouseEvent): void => {
      const btn = event.target;
      if (!(btn instanceof HTMLElement)) return;
      const id = btn.closest('.car')?.getAttribute('data-id');
      if (id === null || id === undefined) return;

      fetch(`${Urls.GARAGE}/${id}`, {
        method: 'DELETE',
      })
        .then(async () => {
          const updateTrackEvent = new CustomEvent('updateTrack', {
            bubbles: true,
            cancelable: true,
          });
          this.getElement().dispatchEvent(updateTrackEvent);
        })
        .catch(() => {
          Error('trouble deleting car');
        });
    };
    this.removeBtn.addEventListener('click', removeCarHandler);
  }

  private addSelectCarHandler(): void {
    const selectCarHandler = (event: MouseEvent): void => {
      const selectBtn = event.target;
      if (!(selectBtn instanceof HTMLElement)) return;
      const id = selectBtn.closest('.car')?.getAttribute('data-id');
      const carName = selectBtn.nextElementSibling?.nextElementSibling?.textContent;

      const selectEvent = new CustomEvent('selectCar', {
        bubbles: true,
        cancelable: true,
        detail: {
          id,
          carName,
        },
      });
      selectBtn.dispatchEvent(selectEvent);
    };
    this.selectBtn.addEventListener('click', selectCarHandler);
  }
}
