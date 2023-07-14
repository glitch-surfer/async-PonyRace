import './styles/car.scss';
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

export class Car extends BaseComponent implements ICar {
  public id: number;

  public name: string;

  public color: string;

  public selected: boolean = false;

  public animation: Animation | null = null;

  public isRace: boolean = false;

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
    this.stopBtn.addEventListener('click', () => { this.stopCarHandler(); });
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
      // .then(async () => {
      //   const updateTrackEvent = new CustomEvent('updateTrack', {
      //     bubbles: true,
      //     cancelable: true,
      //   });
      //   this.getElement().dispatchEvent(updateTrackEvent);
      // })
      .catch(() => {
        Error('trouble deleting car');
      });
    if (this.wins > 0) {
      deleteWinner(this.id).then(() => {
        dispatchUpdateWinnersEvent();
      }).catch((error) => { Error(error.message); });
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
      dispatchStartCarEvent();
      fetch(`${Urls.ENGINE}?id=${this.id}&status=started`, { method: 'PATCH' })
        .then(async (response) => response.json())
        .then((data) => {
          const animationDuration = getAnimationDuration(data);
          this.animation = this.car.animate(
            [{ transform: `translateX(${(window.innerWidth * 0.9) - 140}px)` }],
            {
              duration: animationDuration,
              fill: 'forwards',
            },
          );
          fetch(`${Urls.ENGINE}?id=${this.id}&status=drive`, { method: 'PATCH' })
            .then((response) => {
              if (response.status === 500) this.animation?.pause();
              if (response.status === 500 && this.isRace) {
                const event = new CustomEvent('finishedCar', {
                  bubbles: true,
                  cancelable: true,
                });
                this.getElement().dispatchEvent(event);
              }
              if (response.status === 200 && this.isRace) {
                const event = new CustomEvent('finishedCar', {
                  bubbles: true,
                  cancelable: true,
                  detail: {
                    car: this,
                    time: Math.floor(animationDuration) / 100,
                  },
                });
                this.getElement().dispatchEvent(event);
              }
            }).catch(() => 'error');
          this.stopBtn.removeAttribute('disabled');
        })
        .catch(() => { Error('it`s not started'); });
    };
    startCar().catch(() => { Error('it`s not started'); });
  }

  public stopCarHandler(): void {
    const stopCar = async (): Promise<void> => {
      this.stopBtn.setAttribute('disabled', '');

      fetch(`${Urls.ENGINE}?id=${this.id}&status=stopped`, { method: 'PATCH' })
        .then(() => {
          this.animation?.cancel();
          this.animation = null;
        })
        .catch(() => {
          Error('it`s not stoped');
        })
        .finally(() => {
          this.enableBtns();
          dispatchStopCarEvent();
        });
    };

    stopCar()
      .catch(() => {
        Error('it`s not stoped');
      });
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
