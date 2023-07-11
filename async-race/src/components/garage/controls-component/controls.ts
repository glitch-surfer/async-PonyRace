import './styles/controls.scss';
import { BaseComponent } from '../../../utils/base-component';
import type { IControls } from './types/controls-types';
import { controlsView } from './view/controls-view';
import { Urls } from '../../../enums/urls';
import type { INewCar } from '../../../types/types';
import { Numbers } from '../../../enums/numbers';
import { getRandomName } from '../../../utils/get-random-name';
import { getRandomColor } from '../../../utils/get-random-color';

export class Controls extends BaseComponent implements IControls {
  constructor(
    public createCarInput: HTMLElement = new BaseComponent(controlsView.createCarInput)
      .getElement(),
    public createCarBtn: HTMLElement = new BaseComponent(controlsView.createCarBtn)
      .getElement(),
    public upgradeCarInput: HTMLElement = new BaseComponent(controlsView.upgradeCarInput)
      .getElement(),
    public upgradeCarBtn: HTMLElement = new BaseComponent(controlsView.upgradeCarBtn)
      .getElement(),
    public raceBtn: HTMLElement = new BaseComponent(controlsView.raceBtn)
      .getElement(),
    public resetBtn: HTMLElement = new BaseComponent(controlsView.resetBtn)
      .getElement(),
    public generateCarsBtn: HTMLElement = new BaseComponent(controlsView.generateCarsBtn)
      .getElement(),
  ) {
    super(controlsView.wrapper);

    this.getElement().append(
      this.createCarInput,
      this.createCarBtn,
      this.upgradeCarInput,
      this.upgradeCarBtn,
      this.raceBtn,
      this.resetBtn,
      this.generateCarsBtn,
    );

    document.addEventListener('selectCar', (event) => { this.enableUpgradeCar(event); });
    this.upgradeCarBtn.addEventListener('click', () => { this.upgradeCarHandler(); });
    this.createCarBtn.addEventListener('click', () => { this.createCarHandler(); });
    this.generateCarsBtn.addEventListener('click', () => { this.generateNewCars(); });
    this.raceBtn.addEventListener('click', () => { this.raceHandler(); });
    this.resetBtn.addEventListener('click', () => { this.resetBtnHandler(); });
  }

  private enableUpgradeCar(event: Event): void {
    const input = this.upgradeCarInput;
    const btn = this.upgradeCarBtn;
    if (!(input instanceof HTMLInputElement)
      || !(event instanceof CustomEvent)) throw new Error('not input');

    input.removeAttribute('disabled');
    btn.removeAttribute('disabled');

    const { id, carName } = event.detail;

    input.value = carName;
    btn.setAttribute('data-id', id);
  }

  private upgradeCarHandler(): void {
    const input = this.upgradeCarInput;
    if (!(input instanceof HTMLInputElement)
      || input.value.trim() === '') return;

    const newCarName = input.value;
    const newCarColor = '#fff'; // todo
    const id = this.upgradeCarBtn.getAttribute('data-id');
    if (id === null) return;

    fetch(`${Urls.GARAGE}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ name: newCarName, color: newCarColor }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async () => {
        const updateTrackEvent = new CustomEvent('updateTrack', {
          bubbles: true,
          cancelable: true,
        });
        this.getElement().dispatchEvent(updateTrackEvent);
      })
      .catch((error) => {
        Error(error.message);
      })
      .finally(() => {
        input.value = '';
        input.setAttribute('disabled', '');
        this.upgradeCarBtn.setAttribute('disabled', '');
        this.upgradeCarBtn.removeAttribute('data-id');
      });
  }

  private createCarHandler(): void {
    const input = this.createCarInput;
    if (!(input instanceof HTMLInputElement)
      || input.value.trim() === '') return;
    const newCarName = input.value;
    const newCarColor = '#fff';
    const newCarParams: INewCar = {
      name: newCarName,
      color: newCarColor,
    };

    fetch(Urls.GARAGE, {
      method: 'POST',
      body: JSON.stringify(newCarParams),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        const updateTrackEvent = new CustomEvent('updateTrack', {
          bubbles: true,
          cancelable: true,
        });
        this.getElement().dispatchEvent(updateTrackEvent);
      })
      .catch((error) => {
        Error(error.message);
      })
      .finally(() => {
        input.value = '';
      });
  }

  private generateNewCars(): void {
    const newCars: Response[] = [];
    for (let i = 0; i < Numbers.GENERATE_CAR_COUNT; i += 1) {
      const newCarParams: INewCar = {
        name: getRandomName(),
        color: getRandomColor(),
      };

      fetch(Urls.GARAGE, {
        method: 'POST',
        body: JSON.stringify(newCarParams),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((newCar) => newCars.push(newCar))
        .catch((error) => {
          Error(error.message);
        });
    }
    Promise.all(newCars).then(() => {
      const updateTrackEvent = new CustomEvent('updateTrack', {
        bubbles: true,
        cancelable: true,
      });
      this.getElement().dispatchEvent(updateTrackEvent);
    })
      .catch((error) => {
        Error(error.message);
      });
  }

  private raceHandler(): void {
    const startRaceEvent = new CustomEvent('startRace', {
      bubbles: true,
      cancelable: true,
    });
    this.getElement().dispatchEvent(startRaceEvent);
    this.disableBtns();
  }

  public resetBtnHandler(): void {
    const resetEvent = new CustomEvent('resetRace', {
      bubbles: true,
      cancelable: true,
    });
    this.getElement().dispatchEvent(resetEvent);
    setTimeout(() => {
      this.enableBtns();
    }, 2500);
  }

  public disableBtns(): void {
    this.raceBtn.setAttribute('disabled', '');
    this.generateCarsBtn.setAttribute('disabled', '');
    this.createCarBtn.setAttribute('disabled', '');
  }

  public enableBtns(): void {
    this.generateCarsBtn.removeAttribute('disabled');
    this.createCarBtn.removeAttribute('disabled');
  }
}
