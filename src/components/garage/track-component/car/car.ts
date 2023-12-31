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
import { dispatchFinishedCarEvent, dispatchFinishedEvent } from '../../../../utils/dispatch-finished-car-event';
import { setTraceAnimation } from '../../../../utils/set-trace-animation';
import { CarState } from './car-state/car-state';
import { dispatchUpdateTrackEvent } from '../../../../utils/dispatch-update-track-event';
import { disableBtns, enableBtns } from '../../../../utils/handle-btns';

export class Car extends BaseComponent implements ICar {
  public id: number;

  public name: string;

  public color: string;

  public wins: number;

  public bestTime: number;

  public carState = new CarState();

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

    this.removeBtn.addEventListener('click', () => { this.removeCarHandler().catch(() => Error('Remove car error')); });
    this.selectBtn.addEventListener('click', () => { this.selectCarHandler(); });
    this.startBtn.addEventListener('click', () => { this.startCarHandler().catch(() => Error('Start car error')); });
    this.stopBtn.addEventListener('click', () => { this.stopCarHandler().catch(() => Error('Stop car error')); });

    this.traceObserver();
  }

  private setColor(color: string): void {
    this.car.innerHTML = img;
    (this.car.querySelector('.cls-19') as SVGElement).style.fill = color;
    this.car.style.filter = `drop-shadow(0 0 1rem ${color})`;
  }

  private setName(name: string): void {
    this.title.textContent = name;
  }

  private async removeCarHandler(): Promise<void> {
    await fetch(`${Urls.GARAGE}/${this.id}`, {
      method: 'DELETE',
    });
    if (this.wins > 0) {
      await deleteWinner(this.id);
      dispatchUpdateWinnersEvent();
    }

    dispatchUpdateTrackEvent();
    this.getElement().remove();
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

  public async startCarHandler(): Promise<void> {
    const startTime = Date.now();
    const animationDistance = (window.innerWidth * 0.9) - 60;

    this.disableBtns();
    this.carState.isStarted = true;

    const startResponse = await fetch(`${Urls.ENGINE}?id=${this.id}&status=started`, { method: 'PATCH' });
    const data = await startResponse.json();

    const animationDuration = getAnimationDuration(data);
    const engineDelay = Date.now() - startTime;

    this.carState.animation = this.car.animate(
      [
        { transform: `translateX(${animationDistance}px)` },
      ],
      { duration: animationDuration, fill: 'forwards' },
    );
    setTraceAnimation(this.color, animationDistance, animationDuration, this);

    enableBtns([this.stopBtn]);

    const driveResponse = await fetch(`${Urls.ENGINE}?id=${this.id}&status=drive`, { method: 'PATCH' });
    if (driveResponse.status === 200 && this.carState.isRace) {
      const formattedFinishTime = +((animationDuration + engineDelay) / 1000).toFixed(2);
      dispatchFinishedCarEvent(this, formattedFinishTime);
      return;
    }
    if (driveResponse.status === 500) {
      this.carState.animation?.pause();
      this.car.style.animation = 'none';
      this.carState.isEngineStopped = true;
    }
    dispatchFinishedEvent();
  }

  public async stopCarHandler(): Promise<void> {
    disableBtns([this.stopBtn]);
    this.carState.isEngineStopped = true;

    await fetch(`${Urls.ENGINE}?id=${this.id}&status=stopped`, { method: 'PATCH' });

    this.carState.animation?.cancel();
    this.carState.animation = null;
    this.car.style.animation = '';

    this.carState.isStarted = false;
    this.carState.isRace = false;
    this.carState.isEngineStopped = false;

    this.enableBtns();
  }

  public disableBtns(): void {
    disableBtns([this.startBtn, this.selectBtn, this.removeBtn]);
  }

  public enableBtns(): void {
    enableBtns([this.startBtn, this.selectBtn, this.removeBtn]);
  }

  public updateCar(): void {
    this.setColor(this.color);
    this.setName(this.name);
  }

  private traceObserver(): void {
    const observer = new MutationObserver((mutationList) => {
      if (mutationList[0].type === 'childList') {
        mutationList[0].target.childNodes.forEach((node) => {
          if (node instanceof HTMLElement && node.classList.contains('trace')) {
            setTimeout(() => {
              node.remove();
            }, 2000);
          }
        });
      }
    });

    observer.observe(this.getElement(), {
      childList: true,
    });
  }
}
