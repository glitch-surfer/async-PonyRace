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
import { QueryParams } from '../../../enums/query-params';
import { changeInitialNames, isNeedToUpdateInitialNames } from '../../../utils/api/check-first-item-name';
import { dispatchUpdateWinnersEvent } from '../../../utils/dispatch-update-winner-event';

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
    isNeedToUpdateInitialNames()
      .then(async (result) => {
        if (result) return changeInitialNames();
        return Promise.resolve();
      })
      .then(async () => this.fillTrackList())
      .catch(() => Error('Oops'))
      .finally(() => { dispatchUpdateWinnersEvent(); });

    this.getElement().append(
      this.title,
      this.subtitle,
      this.trackList,
      this.pagination.getElement(),
    );

    this.addPaginationHandler();
    this.addCarWatchingHandler();
    document.addEventListener('updateTrack', () => { this.fillTrackList().catch(() => Error('Oops')); });
    document.addEventListener('startRace', () => { this.startRaceHandler(); });
    document.addEventListener('resetRace', () => { this.resetRaceHandler(); });
    document.addEventListener('finishedCar', (event: Event) => { this.finishedCarHandler(event); });
  }

  public async fillTrackList(): Promise<void> {
    const cars = await getCars();
    const winners = await getWinners(QueryParams.WINS, QueryParams.DESC);
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
    this.title.textContent = setCount(Titles.GARAGE, this.carsInGarage);
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
        this.pagination.enablePrevBtn();
        this.renderTrack(this.pagination.currentPage);
        this.subtitle.textContent = this.pagination.setPage();

        if (this.pagination.currentPage === Math.ceil(
          this.carsInGarage.length / Numbers.CARS_ON_PAGE,
        )) {
          this.pagination.disableNextBtn();
        }
      }
    };
    this.pagination.nextBtn.addEventListener('click', paginationNextHandler);

    const paginationPrevHandler = (): void => {
      if (this.pagination.currentPage > 1) {
        this.pagination.currentPage -= 1;
        this.pagination.enableNextBtn();
        this.renderTrack(this.pagination.currentPage);
        this.subtitle.textContent = this.pagination.setPage();

        if (this.pagination.currentPage === 1) {
          this.pagination.disablePrevBtn();
        }
      }
    };
    this.pagination.prevBtn.addEventListener('click', paginationPrevHandler);
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
    this.carsOnPage
      .filter((car) => car.isStarted)
      .forEach((car) => {
        const finishedCar = car;
        finishedCar.stopCarHandler();
        finishedCar.isRace = false;
      });
    this.fillTrackList().catch(() => { Error('no cars'); });
  }

  private finishedCarHandler(event: Event): void {
    const reset = document.querySelector('.controls__reset-btn');
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
      new ModalWindow(winner.name, bestTime).appendModal();
      reset?.setAttribute('disabled', '');
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
      reset?.removeAttribute('disabled');
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
