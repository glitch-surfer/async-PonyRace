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

export class Winners extends BaseComponent implements IWinners {
  private winners: Winner[] = [];

  private winnersOnPage: Winner[] = [];

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

    this.fillWinnersList().catch(() => {
      Error('no winners');
    });

    document.addEventListener('updateWinners', () => { this.fillWinnersList().catch(() => Error('Oops')); });
    this.addPaginationHandler();
  }

  public async fillWinnersList(): Promise<void> {
    const winners = await getWinners();
    this.winners = [];

    Promise.all(winners.map(async (winner) => {
      const carParams = await (await fetch(`${Urls.GARAGE}/${winner.id}`)).json();
      return { ...winner, ...carParams };
    })).then((winnersList) => {
      winnersList.forEach((winner, index) => {
        const newWinner = new Winner(winner);
        newWinner.setPosition(index + 1);
        this.winners.push(newWinner);
      });
    })
      .then(() => {
        this.renderWinners(this.pagination.currentPage);
        this.title.textContent = setCount(Titles.WINNERS, this.winners);
      })
      .catch(() => {
        this.table.textContent = 'no winners';
      });
  }

  public renderWinners(page: number): void {
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
    // todo dublication
    const paginationNextHandler = (): void => {
      if (
        this.pagination.currentPage < Math.ceil(this.winners.length / Numbers.WINNERS_ON_PAGE)
      ) {
        this.pagination.currentPage += 1;
        this.renderWinners(this.pagination.currentPage);
        this.subtitle.textContent = this.pagination.setPage();
      }
    };
    this.pagination.nextBtn.addEventListener('click', paginationNextHandler);

    const paginationPrevHandler = (): void => {
      if (this.pagination.currentPage > 1) {
        this.pagination.currentPage -= 1;
        this.renderWinners(this.pagination.currentPage);
        this.subtitle.textContent = this.pagination.setPage();
      }
    };
    this.pagination.prevBtn.addEventListener('click', paginationPrevHandler);
  }
}
