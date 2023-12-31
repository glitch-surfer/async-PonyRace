import './styles/track.scss';
import { getCars } from '../../../utils/api/get-cars';
import { BaseComponent } from '../../../utils/base-component';
import type { Car } from './car/car';
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
import { carsInGarageDataAdapter } from '../../../utils/cars-in-garage-data-adapter';
import { disableBtns, enableBtns } from '../../../utils/handle-btns';
import { getItemsOnPage } from '../../../utils/get-items-on-page';

export class Track extends BaseComponent implements ITrack {
  public carsInGarage: Car[] = [];

  public carsOnPage: Car[] = [];

  public winner: Car | null = null;

  public finishedCarCount = 0;

  constructor(
    public title: HTMLElement = new BaseComponent(trackView.title).getElement(),
    public subtitle: HTMLElement = new BaseComponent(trackView.subtitle).getElement(),
    public trackList: HTMLElement = new BaseComponent(trackView.trackList).getElement(),
    public pagination: IPagination = new Pagination(),
  ) {
    super(trackView.wrapper);
    const checkInitials = async (): Promise<void> => {
      const result = await isNeedToUpdateInitialNames();
      if (result) await changeInitialNames();
      return this.fillTrackList();
    };
    checkInitials().catch(() => Error('Oops'));

    this.getElement().append(
      this.title,
      this.subtitle,
      this.trackList,
      this.pagination.getElement(),
    );

    this.addPaginationHandler();
    document.addEventListener('updateTrack', () => { this.fillTrackList().catch(() => new Error('Filltracklist error')); });
    document.addEventListener('finishedCar', (event: Event) => { this.setWinnerHandler(event); });
    document.addEventListener('finishedCar', () => { this.finishRaceHandler().catch(() => new Error('Finished car error')); });
  }

  public async fillTrackList(): Promise<void> {
    const cars = await getCars();
    const winners = await getWinners(QueryParams.WINS, QueryParams.DESC);

    this.carsInGarage = carsInGarageDataAdapter(cars, winners);

    this.renderTrack(this.pagination.currentPage);
    this.title.textContent = setCount(Titles.GARAGE, this.carsInGarage);
  }

  private renderTrack(page: number): void {
    const carsOnPage = Numbers.CARS_ON_PAGE;

    clearElement(this.trackList);
    this.carsOnPage = getItemsOnPage(page, carsOnPage, this.carsInGarage);

    this.carsOnPage.forEach((car) => {
      this.trackList.append(car.getElement());
    });
  }

  private addPaginationHandler(): void {
    const paginationNextHandler = (): void => {
      const maxPageCount = Math.ceil(this.carsInGarage.length / Numbers.CARS_ON_PAGE);
      if (
        this.pagination.currentPage < maxPageCount) {
        this.pagination.currentPage += 1;
        enableBtns([this.pagination.prevBtn]);
        this.renderTrack(this.pagination.currentPage);
        this.subtitle.textContent = this.pagination.setPage();

        if (this.pagination.currentPage === maxPageCount) {
          disableBtns([this.pagination.nextBtn]);
        }
      }
    };
    this.pagination.nextBtn.addEventListener('click', paginationNextHandler);

    const paginationPrevHandler = (): void => {
      if (this.pagination.currentPage > 1) {
        this.pagination.currentPage -= 1;
        enableBtns([this.pagination.nextBtn]);
        this.renderTrack(this.pagination.currentPage);
        this.subtitle.textContent = this.pagination.setPage();

        if (this.pagination.currentPage === 1) {
          disableBtns([this.pagination.prevBtn]);
        }
      }
    };
    this.pagination.prevBtn.addEventListener('click', paginationPrevHandler);
  }

  private setWinnerHandler(event: Event): void {
    if (!(event instanceof CustomEvent)
    || this.winner !== null
      || event.detail === null) return;

    const resetBtn = document.querySelector('.controls__reset-btn') as HTMLElement;
    const winner: Car = event.detail.car;
    const bestTime = event.detail.time;

    this.winner = winner;

    if (winner.bestTime === 0) {
      winner.bestTime = bestTime;
    } else {
      winner.bestTime = bestTime < winner.bestTime ? bestTime : winner.bestTime;
    }

    new ModalWindow(winner.name, bestTime).appendModal();

    disableBtns([resetBtn]);
  }

  private async finishRaceHandler(): Promise<void> {
    this.finishedCarCount += 1;

    if (this.finishedCarCount === this.carsOnPage.length && this.winner !== null) {
      const resetBtn = document.querySelector('.controls__reset-btn') as HTMLElement;

      if (this.winner.wins === 0) {
        this.winner.wins += 1;

        await createWinner({
          id: this.winner.id,
          wins: this.winner.wins,
          time: this.winner.bestTime,
        });
      } else {
        this.winner.wins += 1;

        await updateWinner({
          wins: this.winner.wins,
          time: this.winner.bestTime,
        }, this.winner.id);
      }

      enableBtns([resetBtn]);
    }
  }
}
