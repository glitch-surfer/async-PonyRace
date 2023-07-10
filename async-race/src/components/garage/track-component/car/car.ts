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

  private animation: Animation | null = null;

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

    this.removeBtn.addEventListener('click', this.removeCarHandler.bind(this));
    this.selectBtn.addEventListener('click', this.selectCarHandler.bind(this));
    this.startBtn.addEventListener('click', this.startCarHandler.bind(this));
    this.stopBtn.addEventListener('click', this.stopCarHandler.bind(this));
  }

  private setColor(color: string): void {
    this.car.style.backgroundColor = color;
  }

  private setName(name: string): void {
    this.title.textContent = name;
  }

  private removeCarHandler(): void {
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
  }

  private selectCarHandler(): void {
    const selectEvent = new CustomEvent('selectCar', {
      bubbles: true,
      cancelable: true,
      detail: {
        id: this.id,
        carName: this.name,
      },
    });
    this.getElement().dispatchEvent(selectEvent);
  }

  private startCarHandler(): void {
    const startCar = async (): Promise<void> => {
      this.startBtn.setAttribute('disabled', '');
      this.stopBtn.removeAttribute('disabled');

      fetch(`${Urls.ENGINE}?id=${this.id}&status=started`, { method: 'PATCH' })
        .then(async (response) => response.json())
        .then((data) => {
          const { velocity, distance } = data;
          const distanceLength = window.innerWidth;
          const animationDuration = distance / velocity;
          this.animation = this.car.animate(
            [
              { transform: `translateX(${(distanceLength * 0.9) - 140}px)` },
            ],
            {
              duration: animationDuration,
              fill: 'forwards',
            },
          );
          return this.animation;
        })
        .then((animation) => {
          fetch(`${Urls.ENGINE}?id=${this.id}&status=drive`, { method: 'PATCH' })
            .then((response) => {
              if (response.status === 500) animation.pause();
            }).catch(() => {
              Error('trouble with engine');
            });
        })
        .catch(() => {
          Error('it`s not started');
        });
    };

    startCar()
      .catch(() => {
        Error('it`s not started');
      });
  }

  private stopCarHandler(): void {
    const stopCar = async (): Promise<void> => {
      this.stopBtn.setAttribute('disabled', '');
      this.startBtn.removeAttribute('disabled');

      fetch(`${Urls.ENGINE}?id=${this.id}&status=stopped`, { method: 'PATCH' })
        .then(() => {
          this.animation?.cancel();
          this.animation = null;
        })
        .catch(() => {
          Error('it`s not started');
        });
    };

    stopCar()
      .catch(() => {
        Error('it`s not stoped');
      });
  }
}
