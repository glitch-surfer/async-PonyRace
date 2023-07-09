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
    this.addStartCarHandler();
  }

  private setColor(color: string): void {
    this.car.style.backgroundColor = color;
  }

  private setName(name: string): void {
    this.title.textContent = name;
  }

  private addRemoveCarHandler(): void {
    const removeCarHandler = (): void => {
      fetch(`${Urls.GARAGE}/${this.id}`, {
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
    const selectCarHandler = (): void => {
      const selectEvent = new CustomEvent('selectCar', {
        bubbles: true,
        cancelable: true,
        detail: {
          id: this.id,
          carName: this.name,
        },
      });
      this.getElement().dispatchEvent(selectEvent);
    };
    this.selectBtn.addEventListener('click', selectCarHandler);
  }

  private addStartCarHandler(): void {
    const startCarHandler = async (): Promise<void> => {
      this.startBtn.setAttribute('disabled', '');
      this.stopBtn.removeAttribute('disabled');

      fetch(`${Urls.ENGINE}?id=${this.id}&status=started`, {
        method: 'PATCH',
      }).then(async (response) => response.json())
        .then((data) => {
          const { velocity, distance } = data;
          const distanceLength = window.innerWidth;
          const animationDuration = distance / velocity;
          const animation = this.car.animate([
            { transform: `translateX(${(distanceLength * 0.9) - 140}px)` },
          ], {
            duration: animationDuration,
            fill: 'forwards',
          });
          return animation;
        })
        .then((animation) => {
          fetch(`${Urls.ENGINE}?id=${this.id}&status=drive`, {
            method: 'PATCH',
          }).then((response) => {
            if (response.status === 500) {
              animation.pause();
            }
          }).catch(() => {
            Error('trouble starting car');
          });
        })
        .catch(() => {
          Error('some trouble');
        });
    };
    this.startBtn.addEventListener('click', startCarHandler);
  }
}
