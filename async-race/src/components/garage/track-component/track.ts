import './styles/track.scss';
import { getCars } from '../../../utils/api/get-cars';
import { BaseComponent } from '../../../utils/base-component';
import { Car } from './car/car';
import type { ITrack } from './types/track-types';
import { clearElement } from '../../../utils/clear-element';
import { setCount } from '../../../utils/set-count';
import { Titles } from '../../../enums/titles';
import { Numbers } from '../../../enums/numbers';
import { trackView } from './view/track-view';
import { Pagination } from '../../pagination/pagination';
import { ModalWindow } from '../../modal/modal';
import { createWinner } from '../../../utils/api/create-winner';
import { updateWinner } from '../../../utils/api/update-winner';
import { Urls } from '../../../enums/urls';

export class Track extends BaseComponent implements ITrack {
  public carsInGarage: Car[] = [];

  public carsOnPage: Car[] = [];

  public winner: Car | null = null;

  private finishedCarCount = 0;

  constructor(
    public title: HTMLElement = new BaseComponent(trackView.title).getElement(),
    public subtitle: HTMLElement = new BaseComponent(trackView.subtitle).getElement(),
    public trackList: HTMLElement = new BaseComponent(trackView.trackList).getElement(),
    public pagination = new Pagination(),
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
      this.pagination.getElement(),
    );

    this.addPaginationHandler();
    document.addEventListener('updateTrack', () => { this.updateTrackHandler(); });
    document.addEventListener('startRace', () => { this.startRaceHandler(); });
    document.addEventListener('resetRace', () => { this.resetRaceHandler(); });
    this.getElement().addEventListener('finishedCar', (event: Event) => { this.finishedCarHandler(event); });
  }

  public async fillTrackList(): Promise<void> {
    const cars = await getCars();
    this.carsInGarage = [];

    Promise.all(cars.map(async (carParams) => {
      const { wins = 0, time = 0 } = await (await fetch(`${Urls.WINNERS}/${carParams.id}`)).json();
      return { ...carParams, wins, time };
    })).then((completedCars) => {
      completedCars.forEach((car) => {
        const newCar = new Car(car);
        this.carsInGarage.push(newCar);
      });
    })
      .then(() => {
        this.renderTrack(this.pagination.currentPage);
        this.title.textContent = setCount(Titles.WINNERS, this.carsInGarage);
      })
      .catch(() => {
        this.title.textContent = 'no winners';
      });
  }

  public renderTrack(page: number): void {
    const carsOnPage = Numbers.CARS_ON_PAGE;

    clearElement(this.trackList);
    this.carsOnPage = [];
    for (let i = (page * carsOnPage) - carsOnPage; i < (page * carsOnPage); i += 1) {
      if (this.carsInGarage[i] === undefined) break;
      this.trackList.append(this.carsInGarage[i].getElement());
      this.carsOnPage.push(this.carsInGarage[i]);
    }
  }

  private addPaginationHandler(): void {
    const paginationNextHandler = (): void => {
      if (
        this.pagination.currentPage < Math.ceil(this.carsInGarage.length / Numbers.CARS_ON_PAGE)
      ) {
        this.pagination.currentPage += 1;
        this.renderTrack(this.pagination.currentPage);
        this.subtitle.textContent = this.pagination.setPage();
      }
    };
    this.pagination.nextBtn.addEventListener('click', paginationNextHandler);

    const paginationPrevHandler = (): void => {
      if (this.pagination.currentPage > 1) {
        this.pagination.currentPage -= 1;
        this.renderTrack(this.pagination.currentPage);
        this.subtitle.textContent = this.pagination.setPage();
      }
    };
    this.pagination.prevBtn.addEventListener('click', paginationPrevHandler);
  }

  private updateTrackHandler(): void {
    this.fillTrackList()
      .catch(() => {
        this.trackList.textContent = 'no cars in garage';
        Error('no cars');
      });
  }

  private startRaceHandler(): void {
    this.carsOnPage.forEach((car) => {
      const readyCar = car;
      readyCar.startBtn.click();
      readyCar.isRace = true;
    });
  }

  private resetRaceHandler(): void {
    this.winner = null;
    this.finishedCarCount = 0;
    this.carsInGarage.filter((car) => car.animation !== null)
      .forEach((car) => {
        const finishedCar = car;
        finishedCar.stopBtn.click();
        finishedCar.isRace = false;
      });
  }

  private finishedCarHandler(event: Event): void {
    this.finishedCarCount += 1;
    if (event instanceof CustomEvent && this.winner === null && event.detail !== null) {
      const winner = event.detail.car;
      const bestTime = event.detail.time;
      this.winner = winner;
      if (winner.bestTime === 0) {
        winner.bestTime = bestTime;
      } else {
        winner.bestTime = bestTime < winner.bestTime ? bestTime : winner.bestTime;
      }

      new ModalWindow(this.winner!.name).appendModal();
    }
    if (this.finishedCarCount === this.carsOnPage.length && this.winner !== null) {
      if (this.winner.wins === 0) {
        this.winner.wins += 1;

        createWinner({
          id: this.winner.id,
          wins: this.winner.wins,
          time: this.winner.bestTime,
        });
        this.resetRaceHandler();
      } else {
        this.winner.wins += 1;

        updateWinner({
          wins: this.winner.wins,
          time: this.winner.bestTime,
        }, this.winner.id);
        this.resetRaceHandler();
      }
    }
  }
}
