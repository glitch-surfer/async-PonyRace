import './styles/winners.scss';
import { BaseComponent } from '../../utils/base-component';
import type { IWinners } from './types/winners-types';
import { Pagination } from '../pagination/pagination';
import { winnersView } from './view/winners-view';
import { getWinners } from '../../utils/api/get-winners';
import { Winner } from './winner/winner';
import { Titles } from '../../enums/titles';
import { setCount } from '../../utils/set-count';
import { Urls } from '../../enums/urls';
import { Numbers } from '../../enums/numbers';
import { clearElement } from '../../utils/clear-element';
import type { IPagination } from '../pagination/types/pagination-types';
import { QueryParams } from '../../enums/query-params';

export class Winners extends BaseComponent implements IWinners {
  private winners: Winner[] = [];

  private winnersOnPage: Winner[] = [];

  private currentSort: 'wins' | 'time' = QueryParams.WINS;

  private currentOrder: 'ASC' | 'DESC' = QueryParams.DESC;

  pagination: IPagination = new Pagination();

  constructor(
    public title = new BaseComponent(winnersView.title).getElement(),
    public subtitle = new BaseComponent(winnersView.subtitle).getElement(),
    public table = new BaseComponent(winnersView.table).getElement(),
  ) {
    super(winnersView.wrapper);

    this.getElement().append(
      this.title,
      this.subtitle,
      this.table,
      this.pagination.getElement(),
    );

    this.fillWinnersList().catch(() => { Error('no winners'); });

    this.addPaginationHandler();
    document.addEventListener('updateWinners', () => { this.fillWinnersList().catch(() => Error('Fillwinnerslist error')); });
    this.table.addEventListener('click', (event) => { this.sortByWinsCount(event); });
    this.table.addEventListener('click', (event) => { this.sortByBestTime(event); });
  }

  private async fillWinnersList(sort: 'wins' | 'time' = this.currentSort, order: 'ASC' | 'DESC' = this.currentOrder): Promise<void> {
    const winners = await getWinners(sort, order);
    this.winners = [];

    const mergedDataPromiseList = winners.map(async (winner) => {
      const carParams = await (await fetch(`${Urls.GARAGE}/${winner.id}`)).json();
      return { ...winner, ...carParams };
    });

    const winnersList = await Promise.all(mergedDataPromiseList);

    winnersList.reduce((acc, winner, index) => {
      const newWinner = new Winner(winner);
      newWinner.setPosition(index + 1);
      acc[index] = newWinner;
      return acc;
    }, this.winners);

    this.renderWinners(this.pagination.currentPage);
    this.title.textContent = setCount(Titles.WINNERS, this.winners);
  }

  private renderWinners(page: number): void {
    const winnersPerPage = Numbers.WINNERS_ON_PAGE;
    const tableBody = this.table.getElementsByTagName('tbody')[0];

    clearElement(tableBody);
    this.winnersOnPage = [];

    for (let i = (page * winnersPerPage) - winnersPerPage; i < (page * winnersPerPage); i += 1) {
      if (this.winners[i] === undefined) break;

      tableBody.append(this.winners[i].getElement());
      this.winnersOnPage.push(this.winners[i]);
    }
  }

  private addPaginationHandler(): void {
    const paginationNextHandler = (): void => {
      if (
        this.pagination.currentPage < Math.ceil(this.winners.length / Numbers.WINNERS_ON_PAGE)
      ) {
        this.pagination.currentPage += 1;
        this.pagination.enablePrevBtn();
        this.renderWinners(this.pagination.currentPage);
        this.subtitle.textContent = this.pagination.setPage();

        if (this.pagination.currentPage === Math.ceil(
          this.winners.length / Numbers.WINNERS_ON_PAGE,
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
        this.renderWinners(this.pagination.currentPage);
        this.subtitle.textContent = this.pagination.setPage();

        if (this.pagination.currentPage === 1) {
          this.pagination.disablePrevBtn();
        }
      }
    };
    this.pagination.prevBtn.addEventListener('click', paginationPrevHandler);
  }

  private sortByWinsCount(event: MouseEvent): void {
    const winsCell = event.target;

    if (winsCell instanceof HTMLElement
      && winsCell.classList.contains('winners__th_wins')) {
      this.currentSort = QueryParams.WINS;
      this.currentOrder = this.currentOrder === QueryParams.DESC
        ? QueryParams.ASC
        : QueryParams.DESC;

      this.fillWinnersList().catch(() => { Error('no winners'); });

      if (this.currentOrder === QueryParams.DESC) {
        winsCell.textContent = Titles.WINS_DESC;
      } else {
        winsCell.textContent = Titles.WINS_ASC;
      }
    }
  }

  private sortByBestTime(event: MouseEvent): void {
    const timeCell = event.target;

    if (timeCell instanceof HTMLElement
      && timeCell.classList.contains('winners__th_time')) {
      this.currentSort = QueryParams.TIME;
      this.currentOrder = this.currentOrder === QueryParams.DESC
        ? QueryParams.ASC
        : QueryParams.DESC;

      this.fillWinnersList().catch(() => { Error('no winners'); });

      if (this.currentOrder === QueryParams.DESC) {
        timeCell.textContent = Titles.TIME_DESC;
      } else {
        timeCell.textContent = Titles.TIME_ASC;
      }
    }
  }
}
