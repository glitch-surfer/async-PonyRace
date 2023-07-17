import './styles/car.scss';
import { img } from './img/svg-string';
import type { ICarResponse } from '../../../../types/types';
import { BaseComponent } from '../../../../utils/base-component';
import type { ICar } from './types/car-types';
import { carView } from './view/car-view';
import { Urls } from '../../../../enums/urls';
import { dispatchUpdateWinnersEvent } from '../../../../utils/dispatch-update-winner-event';
import { getAnimationDuration } from '../../../../utils/get-animation-duration';
import { deleteWinner } from '../../../../utils/api/delete-winner';
import { dispatchStartCarEvent } from '../../../../utils/dispatch-start-car-event';
import { dispatchStopCarEvent } from '../../../../utils/dispatch-stop-car-event';
import { dispatchFinishedCarEvent } from '../../../../utils/dispatch-finished-car-event';

export class Car extends BaseComponent implements ICar {
  public id: number;

  public name: string;

  public color: string;

  public selected: boolean = false;

  public animation: Animation | null = null;

  public isRace: boolean = false;

  public isStarted: boolean = false;

  public isDeleted: boolean = false;

  public wins: number;

  public bestTime: number;

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
    this.wins = carParams.wins;
    this.bestTime = carParams.time;

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

    this.removeBtn.addEventListener('click', () => { this.removeCarHandler(); });
    this.selectBtn.addEventListener('click', () => { this.selectCarHandler(); });
    this.startBtn.addEventListener('click', () => { this.startCarHandler(); });
    this.stopBtn.addEventListener('click', () => { this.stopCarHandler().catch(() => Error('Oops')); });
  }

  private setColor(color: string): void {
    this.car.innerHTML = img;
    (this.car.querySelector('.cls-19') as SVGElement).style.fill = color;
  }

  private setName(name: string): void {
    this.title.textContent = name;
  }

  private removeCarHandler(): void {
    fetch(`${Urls.GARAGE}/${this.id}`, {
      method: 'DELETE',
    })
      .catch(() => { Error('trouble deleting car'); });

    if (this.wins > 0) {
      deleteWinner(this.id)
        .then(() => {
          dispatchUpdateWinnersEvent();
        })
        .catch((error) => { Error(error.message); });
    }

    this.getElement().remove();
    this.isDeleted = true;
  }

  private selectCarHandler(): void {
    const selectEvent = new CustomEvent('selectCar', {
      bubbles: true,
      cancelable: true,
      detail: {
        car: this,
      },
    });
    this.getElement().dispatchEvent(selectEvent);
  }

  public startCarHandler(): void {
    const startCar = async (): Promise<void> => {
      this.disableBtns();
      this.isStarted = true;
      const startTime = Date.now();
      dispatchStartCarEvent();

      fetch(`${Urls.ENGINE}?id=${this.id}&status=started`, { method: 'PATCH' })
        .then(async (response) => response.json())
        .then((data) => {
          const animationDuration = getAnimationDuration(data);
          const engineDelay = Date.now() - startTime;
          this.animation = this.car.animate(
            [{ transform: `translateX(${(window.innerWidth * 0.9) - 60}px)` }],
            { duration: animationDuration, fill: 'forwards' },
          );

          fetch(`${Urls.ENGINE}?id=${this.id}&status=drive`, { method: 'PATCH' })
            .then((response) => {
              if (response.status === 500) {
                this.animation?.pause();
                this.car.style.animation = 'none';
                if (this.isRace) dispatchFinishedCarEvent();
              }
              if (response.status === 200 && this.isRace) {
                const formattedFinishTime = +((animationDuration + engineDelay) / 1000).toFixed(2);
                dispatchFinishedCarEvent(this, formattedFinishTime);
              }
            }).catch(() => Error('error in drive mode'));

          this.stopBtn.removeAttribute('disabled');
        }).catch(() => { Error('it`s not started'); });
    };

    startCar().catch(() => { Error('it`s not started'); });
  }

  public async stopCarHandler(): Promise<void> {
    // const stopCar = async (): Promise<void> => {
    this.stopBtn.setAttribute('disabled', '');
    this.isStarted = false;

    return fetch(`${Urls.ENGINE}?id=${this.id}&status=stopped`, { method: 'PATCH' })
      .then(() => {
        this.animation?.cancel();
        this.animation = null;
        this.car.style.animation = '';
      })
      .catch(() => {
        Error('it`s not stoped');
      })
      .finally(() => {
        this.enableBtns();
        dispatchStopCarEvent();
      });
    // };

    // stopCar().catch(() => { Error('it`s not stoped'); });
  }

  public disableBtns(): void {
    this.startBtn.setAttribute('disabled', '');
    this.selectBtn.setAttribute('disabled', '');
    this.removeBtn.setAttribute('disabled', '');
  }

  public enableBtns(): void {
    this.startBtn.removeAttribute('disabled');
    this.selectBtn.removeAttribute('disabled');
    this.removeBtn.removeAttribute('disabled');
  }

  public updateCar(): void {
    this.setColor(this.color);
    this.setName(this.name);
  }
}
