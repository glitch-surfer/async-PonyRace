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
import { getWinners } from '../../../utils/api/get-winners';
import type { IPagination } from '../../pagination/types/pagination-types';

export class Track extends BaseComponent implements ITrack {
  public carsInGarage: Car[] = [];

  public carsOnPage: Car[] = [];

  public winner: Car | null = null;

  private finishedCarCount = 0;

  constructor(
    public title: HTMLElement = new BaseComponent(trackView.title).getElement(),
    public subtitle: HTMLElement = new BaseComponent(trackView.subtitle).getElement(),
    public trackList: HTMLElement = new BaseComponent(trackView.trackList).getElement(),
    public pagination: IPagination = new Pagination(),
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
    this.addCarWatchingHandler();
  }

  public async fillTrackList(): Promise<void> {
    const cars = await getCars();
    const winners = await getWinners();
    this.carsInGarage = [];

    cars
      .map((carParams) => {
        const winnerParams = winners.find((winner) => winner.id === carParams.id);

        if (winnerParams === undefined) return { ...carParams, wins: 0, time: 0 };

        return { ...carParams, wins: winnerParams.wins, time: winnerParams.time };
      })
      .forEach((car) => {
        const newCar = new Car(car);
        this.carsInGarage.push(newCar);
      });
    this.renderTrack(this.pagination.currentPage);
    this.title.textContent = setCount(Titles.WINNERS, this.carsInGarage);
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
      readyCar.startCarHandler();
      readyCar.isRace = true;
    });
  }

  private resetRaceHandler(): void {
    this.winner = null;
    this.finishedCarCount = 0;
    this.carsOnPage.forEach((car) => {
      const finishedCar = car;
      finishedCar.stopCarHandler();
      finishedCar.isRace = false;
    });
    this.fillTrackList().catch(() => { Error('no cars'); });
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
      // todo: without qerySelector
      const reset = document.querySelector('.controls__reset-btn');
      reset?.setAttribute('disabled', '');
      //
    }
    if (this.finishedCarCount === this.carsOnPage.filter((car) => car.isRace).length
      && this.winner !== null) {
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
      // todo: without qerySelector
      const reset = document.querySelector('.controls__reset-btn');
      reset?.removeAttribute('disabled');
      //
    }
  }

  private addCarWatchingHandler(): void {
    const observer = new MutationObserver(() => {
      this.carsOnPage = this.carsOnPage.filter((car) => !car.isDeleted);
      this.carsInGarage = this.carsInGarage.filter((car) => !car.isDeleted);
    });
    observer.observe(this.trackList, { childList: true });
  }
}
