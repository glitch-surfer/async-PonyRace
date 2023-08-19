import { QueryParams } from '../../../enums/query-params';
import { Titles } from '../../../enums/titles';
import type { ITableController } from './table-controller-types';

export class TableController implements ITableController {
  currentSort: 'wins' | 'time' = QueryParams.WINS;

  currentOrder: 'ASC' | 'DESC' = QueryParams.DESC;

  sortByBestTime(event: MouseEvent): void {
    const timeCell = event.target;

    if (timeCell instanceof HTMLElement
      && timeCell.classList.contains('winners__th_time')) {
      this.currentSort = QueryParams.TIME;
      this.currentOrder = this.currentOrder === QueryParams.DESC
        ? QueryParams.ASC
        : QueryParams.DESC;

      if (this.currentOrder === QueryParams.DESC) {
        timeCell.textContent = Titles.TIME_DESC;
      } else {
        timeCell.textContent = Titles.TIME_ASC;
      }
    }
  }

  sortByWinsCount(event: MouseEvent): void {
    const winsCell = event.target;

    if (winsCell instanceof HTMLElement
      && winsCell.classList.contains('winners__th_wins')) {
      this.currentSort = QueryParams.WINS;
      this.currentOrder = this.currentOrder === QueryParams.DESC
        ? QueryParams.ASC
        : QueryParams.DESC;

      if (this.currentOrder === QueryParams.DESC) {
        winsCell.textContent = Titles.WINS_DESC;
      } else {
        winsCell.textContent = Titles.WINS_ASC;
      }
    }
  }
}
