import './styles/winners.scss';
import { BaseComponent } from '../../utils/base-component';
import type { IWinners } from './types/winners-types';
import { Pagination } from '../pagination/pagination';
import { winnersView } from './view/winners-view';
import { getWinners } from '../../utils/api/get-winners';
import type { Winner } from './winner/winner';
import { Titles } from '../../enums/titles';
import { setCount } from '../../utils/set-count';
import { Numbers } from '../../enums/numbers';
import { clearElement } from '../../utils/clear-element';
import type { IPagination } from '../pagination/types/pagination-types';
import { winnersDataAdapter } from '../../utils/winners-data-adapter';
import { disableBtns, enableBtns } from '../../utils/handle-btns';
import { getItemsOnPage } from '../../utils/get-items-on-page';
import { TableController } from './table-controller/table-controller';

export class Winners extends BaseComponent implements IWinners {
  private winners: Winner[] = [];

  private winnersOnPage: Winner[] = [];

  pagination: IPagination = new Pagination();

  tableController = new TableController();

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
    this.table.addEventListener('click', (event) => { this.tableController.sortByWinsCount(event); this.fillWinnersList().catch(() => { Error('no winners'); }); });
    this.table.addEventListener('click', (event) => { this.tableController.sortByBestTime(event); this.fillWinnersList().catch(() => { Error('no winners'); }); });
  }

  private async fillWinnersList(sort: 'wins' | 'time' = this.tableController.currentSort, order: 'ASC' | 'DESC' = this.tableController.currentOrder): Promise<void> {
    const winners = await getWinners(sort, order);

    this.winners = await winnersDataAdapter(winners);

    this.renderWinners(this.pagination.currentPage);
    this.title.textContent = setCount(Titles.WINNERS, this.winners);
  }

  private renderWinners(page: number): void {
    const winnersPerPage = Numbers.WINNERS_ON_PAGE;
    const tableBody = this.table.getElementsByTagName('tbody')[0];

    clearElement(tableBody);

    this.winnersOnPage = getItemsOnPage(page, winnersPerPage, this.winners);

    this.winnersOnPage.forEach((winner) => {
      tableBody.append(winner.getElement());
    });
  }

  private addPaginationHandler(): void {
    const paginationNextHandler = (): void => {
      const maxPageCount = Math.ceil(this.winners.length / Numbers.WINNERS_ON_PAGE);
      if (
        this.pagination.currentPage < maxPageCount) {
        this.pagination.currentPage += 1;
        enableBtns([this.pagination.prevBtn]);
        this.renderWinners(this.pagination.currentPage);
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
        this.renderWinners(this.pagination.currentPage);
        this.subtitle.textContent = this.pagination.setPage();

        if (this.pagination.currentPage === 1) {
          disableBtns([this.pagination.prevBtn]);
        }
      }
    };
    this.pagination.prevBtn.addEventListener('click', paginationPrevHandler);
  }
}
